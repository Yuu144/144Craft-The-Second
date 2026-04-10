ServerEvents.recipes(event => {

    event.remove({ output: 'hostilenetworks:sim_chamber' })
    event.remove({ output: 'hostilenetworks:loot_fabricator' })

    event.shaped('hostilenetworks:sim_chamber', [
        'AEA',
        'BDB',
        'ACA'
    ], {
        A: 'minecraft:obsidian',
        B: 'minecraft:lapis_lazuli',
        C: 'minecraft:ender_pearl',
        D: 'industrialforegoing:machine_frame_advanced',
        E: '#c:glass_panes'
    })

    event.shaped('hostilenetworks:loot_fabricator', [
        'AEA',
        'BDB',
        'ACA'
    ], {
        A: 'minecraft:obsidian',
        B: 'minecraft:diamond',
        C: 'minecraft:gold_ingot',
        D: 'industrialforegoing:machine_frame_advanced',
        E: 'minecraft:netherite_ingot'
    })

})