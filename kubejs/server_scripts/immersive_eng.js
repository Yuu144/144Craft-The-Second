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
        E: '#c:gears/enderium',
        F: 'mekanism:ultimate_control_circuit'
    })

    event.remove({ output: 'industrialforegoing:machine_frame_simple' })
    event.custom({
        type: 'industrialforegoing:dissolution_chamber',
        input: [
            {
                tag: 'c:plastics'
            },
            {
                tag: 'industrialforegoing:machine_frame/pity'
            },
            {
                tag: 'c:plastics'
            },
            {
                tag: 'c:ingots/electrum'
            },
            {
                tag: 'c:ingots/electrum'
            },
            {
                tag: 'c:ingots/iron'
            },
            {
                tag: 'c:gears/constantan'
            },
            {
                tag: 'c:ingots/iron'
            }
        ],
        inputFluid: {
            amount: 250,
            fluid: 'industrialforegoing:latex'
        },
        output: {
            count: 1,
            id: 'industrialforegoing:machine_frame_simple'
        },
        processingTime: 300
    })

    event.remove({ output: 'industrialforegoing:machine_frame_advanced' })
    event.custom({
        type: 'industrialforegoing:dissolution_chamber',
        input: [
            {
                tag: 'c:plastics'
            },
            {
                tag: 'industrialforegoing:machine_frame/simple'
            },
            {
                tag: 'c:plastics'
            },
            {
                item: 'oritech:reinforced_carbon_sheet'
            },
            {
                item: 'oritech:reinforced_carbon_sheet'
            },
            {
                item: 'mekanism:steel_casing'
            },
            {
                tag: 'c:gears/enderium'
            },
            {
                item: 'oritech:machine_core_4'
            }
        ],
        inputFluid: {
            amount: 500,
            fluid: 'industrialforegoing:pink_slime'
        },
        output: {
            count: 1,
            id: 'industrialforegoing:machine_frame_advanced'
        },
        processingTime: 300
    })
})