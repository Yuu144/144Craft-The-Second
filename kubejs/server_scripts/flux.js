ServerEvents.recipes(event => {
    // Flux Core
    event.remove({ output: 'fluxnetworks:flux_core' })
    event.custom({
        type: 'modern_industrialization:assembler',
        eu: 32,
        duration: 200,
        item_inputs: [
            { item: 'fluxnetworks:flux_dust', amount: 4 },
            { item: 'mekanism:ingot_refined_obsidian', amount: 4 },
            { item: 'minecraft:ender_eye', amount: 1 }
        ],
        item_outputs: [{ item: 'fluxnetworks:flux_core', amount: 6 }]
    }).id('144craft2:flux/assembler/flux_core')
})
