// Read-only snapshot of the loaded server registries and recipe manager.
// Automatic after world load / datapack reload; manual: /packdata export.
// Server recipes are not the same as JEI-only plugin categories or item visibility.
;(function () {
    var Registries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
    var Recipe = Java.loadClass('net.minecraft.world.item.crafting.Recipe')
    var KubePaths = Java.loadClass('dev.latvian.mods.kubejs.KubeJSPaths')
    var RegistryOps = Java.loadClass('net.minecraft.resources.RegistryOps')
    var JsonOps = Java.loadClass('com.mojang.serialization.JsonOps')
    var Component = Java.loadClass('net.minecraft.network.chat.Component')
    var pending = true
    var job = null
    var status = 'Waiting for a loaded world.'
    var root = 'local/144craft-runtime'

    function closeJob() {
        job = null
    }

    function start(server) {
        closeJob()
        var name = 'snapshot-' + Date.now()
        var folder = root + '/' + name
        ;['items', 'fluids', 'recipes'].forEach(function (kind) {
            KubePaths.dir(KubePaths.GAMEDIR.resolve(folder + '/' + kind))
        })
        job = {
            server: server, folder: folder, name: name, phase: 0,
            ops: RegistryOps.create(JsonOps.INSTANCE, server.registryAccess()),
            counts: { items: 0, fluids: 0, recipes: 0, errors: 0 },
            errors: [], rows: [], part: 0, iterator: null
        }
        nextPhase()
        status = 'Exporting ' + name
        console.info('[PACK_DATA] ' + status)
    }

    function nextPhase() {
        flush()
        job.part = 0
        if (job.phase === 0) {
            job.iterator = job.server.getRecipeManager().getRecipes().iterator()
        } else if (job.phase === 1) {
            job.iterator = Registries.ITEM.keySet().iterator()
        } else if (job.phase === 2) {
            job.iterator = Registries.FLUID.keySet().iterator()
        }
    }

    function flush() {
        if (!job || !job.rows.length) return
        var part = ('000000' + job.part++).slice(-6)
        JsonIO.write(job.folder + '/' + ['recipes', 'items', 'fluids'][job.phase] + '/' + part + '.json', job.rows)
        job.rows = []
    }

    function tags(stream) {
        var result = []
        try {
            var iterator = stream.iterator()
            while (iterator.hasNext()) {
                var tag = iterator.next()
                var id
                try { id = tag.location() } catch (ignored) { id = tag }
                result.push(String(id))
            }
        } finally {
            // KubeJS exposes ItemStack.getTags() as a collection, while holder
            // tags can remain a Java Stream. Only the latter needs closing.
            if (typeof stream.close === 'function') stream.close()
        }
        return result.sort()
    }

    function exportEntry() {
        var entry = job.iterator.next()
        var row
        if (job.phase > 0) {
            var id = String(entry)
            row = { id: id, mod: id.split(':')[0], tags: [] }
            if (job.phase === 1) {
                // ItemStack avoids reflecting concrete mod Item subclasses, some
                // of which declare client-only methods even on dedicated servers.
                var stack = Item.of(id)
                row.tags = tags(stack.getTags())
                row.name = String(stack.getHoverName().getString())
                row.translation_key = String(stack.getDescriptionId())
                row.max_stack_size = Number(stack.getMaxStackSize())
                job.counts.items++
            } else {
                row.tags = tags(Registries.FLUID.getHolder(entry).get().tags())
                row.name = id.split(':')[1].replace(/_/g, ' ')
                job.counts.fluids++
            }
        } else {
            var recipeId = String(entry.id())
            try {
                var data = Recipe.CODEC.encodeStart(job.ops, entry.value()).getOrThrow()
                row = { id: recipeId, data: JSON.parse(String(data)) }
                job.counts.recipes++
            } catch (error) {
                job.counts.errors++
                job.errors.push({ id: recipeId, error: String(error) })
                return
            }
        }
        job.rows.push(row)
    }

    function finish() {
        var metadata = {
            schema: 1, snapshot: job.name, exported_at: new Date().toISOString(),
            source: 'Loaded server recipe manager after KubeJS and datapack processing',
            scope: 'Registered items/fluids and server recipes; not JEI visibility or JEI-only categories',
            counts: job.counts, errors: job.errors,
            files: { items: 'items', fluids: 'fluids', recipes: 'recipes' }
        }
        JsonIO.write(job.folder + '/manifest.json', metadata)
        // Publish only after every batch and the manifest have been written.
        JsonIO.write(root + '/latest.json', { schema: 1, snapshot: job.name })
        status = 'Exported ' + job.counts.items + ' items, ' + job.counts.fluids +
            ' fluids, ' + job.counts.recipes + ' recipes; ' + job.counts.errors +
            ' serialization errors. Folder: local/144craft-runtime/' + job.name
        console.info('[PACK_DATA] ' + status)
        closeJob()
    }

    ServerEvents.loaded(function () { pending = true })
    ServerEvents.afterRecipes(function () { pending = true })
    ServerEvents.unloaded(function () { closeJob(); pending = true })
    ServerEvents.tick(function (event) {
        try {
            if (pending) { pending = false; start(event.server) }
            if (!job) return
            // Bounded batches: avoid traversing the whole pack in one tick.
            var startTime = Date.now()
            for (var i = 0; i < 128 && Date.now() - startTime < 8; i++) {
                if (!job.iterator.hasNext()) {
                    flush()
                    job.phase++
                    nextPhase()
                    if (job.phase > 2) { finish(); return }
                } else exportEntry()
            }
            flush()
        } catch (error) {
            status = 'Export failed: ' + error
            console.error('[PACK_DATA] ' + status)
            closeJob()
        }
    })

    ServerEvents.commandRegistry(function (event) {
        var Commands = event.commands
        event.register(Commands.literal('packdata')
            .requires(function (source) { return source.hasPermission(2) })
            .then(Commands.literal('export').executes(function (ctx) {
                pending = true
                ctx.source.sendSystemMessage(Component.literal('Pack data export queued. Use /packdata status for progress.'))
                return 1
            }))
            .then(Commands.literal('status').executes(function (ctx) {
                var message = status
                if (job) message += ' | ' + JSON.stringify(job.counts)
                ctx.source.sendSystemMessage(Component.literal(message))
                return 1
            })))
    })
})()
