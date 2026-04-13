ServerEvents.recipes(event => {

    event.remove({ output: 'industrialforegoing:machine_frame_pity' })
    event.remove({ output: 'industrialforegoing:dissolution_chamber' })
    event.remove({ output: 'industrialforegoing:ore_laser_base' })
    event.remove({ output: 'industrialforegoing:laser_drill' })

    event.shaped('industrialforegoing:machine_frame_pity', [
        'ABA',
        'BCB',
        'ABA'
    ], {
        A: '#minecraft:logs',
        B: 'minecraft:iron_ingot',
        C: 'create:railway_casing'
    })

    event.shaped('industrialforegoing:dissolution_chamber', [
        'ABA',
        'CDC',
        'EFE'
    ], {
        A: '#c:plastics',
        B: 'create:precision_mechanism',
        C: 'minecraft:bucket',
        D: 'industrialforegoing:machine_frame_pity',
        E: 'create:brass_ingot',
        F: '#c:gears/diamond'
    })

    event.shaped('industrialforegoing:ore_laser_base', [
        'ABA',
        'CDC',
        'EFE'
    ], {
        A: '#c:plastics',
        B: 'create:mechanical_drill',
        C: 'draconicevolution:awakened_draconium_block',
        D: 'industrialforegoing:machine_frame_advanced',
        E: 'alltheores:netherite_gear',
        F: 'minecraft:redstone'
    })

    event.shaped('industrialforegoing:laser_drill', [
        'ABA',
        'CDC',
        'EFE'
    ], {
        A: '#c:plastics',
        B: '#c:gears/diamond',
        C: 'bigreactors:ludicrite_ingot',
        D: 'industrialforegoing:machine_frame_simple',
        E: '#c:gears/gold',
        F: 'minecraft:redstone'
    })

})