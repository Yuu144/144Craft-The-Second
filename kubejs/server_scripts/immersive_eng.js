ServerEvents.recipes(event => {
    // *INDUSTRIAL FOREGOING (ICH HASSE DICH PAUL), (GET A JOB), (BITCH ASS)

    event.remove({ output: 'industrialforegoing:machine_frame_pity' })
    event.remove({ output: 'industrialforegoing:dissolution_chamber' })
    event.remove({ output: 'industrialforegoing:ore_laser_base' })
    event.remove({ output: 'industrialforegoing:laser_drill' })

    event.shaped('industrialforegoing:machine_frame_pity', [
        'AEA',
        'BCB',
        'ADA'
    ], {
        A: '#minecraft:logs',
        B: 'minecraft:copper_block',
        C: 'create:railway_casing',
        D: 'minecraft:iron_block',
        E: 'createmechanisms:wooden_mechanism'
    }).id('144craft2:immersive_eng/minecraft/shaped/industrialforegoing/machine_frame_pity')

    event.shaped('industrialforegoing:dissolution_chamber', [
        'ABA',
        'CDC',
        'EFE'
    ], {
        A: '#c:plastics',
        B: 'create:precision_mechanism',
        C: 'alltheores:electrum_plate',
        D: 'industrialforegoing:machine_frame_pity',
        E: 'create:brass_ingot',
        F: '#c:gears/diamond'
    }).id('144craft2:immersive_eng/minecraft/shaped/industrialforegoing/dissolution_chamber')

    event.shaped('industrialforegoing:ore_laser_base', [
        'ABA',
        'CDC',
        'EFE'
    ], {
        A: '#c:plastics',
        B: 'modern_industrialization:titanium_drill_head',
        C: 'modern_industrialization:digital_circuit_board',
        D: 'industrialforegoing:machine_frame_advanced',
        E: 'alltheores:netherite_gear',
        F: 'minecraft:redstone'
    }).id('144craft2:immersive_eng/minecraft/shaped/industrialforegoing/ore_laser_base')

    event.shaped('industrialforegoing:laser_drill', [
        'ABA',
        'CDC',
        'EFE'
    ], {
        A: '#c:plastics',
        B: 'kubejs:larp_crystal',
        C: 'bigreactors:blutonium_ingot',
        D: 'industrialforegoing:machine_frame_simple',
        E: '#c:gears/enderium',
        F: 'mekanism:elite_control_circuit'
    }).id('144craft2:immersive_eng/minecraft/shaped/industrialforegoing/laser_drill')

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
    }).id('144craft2:immersive_eng/industrialforegoing/dissolution_chamber/industrialforegoing/machine_frame_simple')

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
    }).id('144craft2:immersive_eng/industrialforegoing/dissolution_chamber/industrialforegoing/machine_frame_advanced')

    event.remove({ output: 'industrialforegoing:speed_addon_tier_1' })
    event.custom({
        type: 'industrialforegoing:dissolution_chamber',
        input: [
            {
                item: 'minecraft:redstone_block'
            },
            {
                item: 'createmechanisms:physics_mechanism'
            },
            {
                item: 'minecraft:copper_block'
            },
            {
                item: 'alltheores:constantan_gear'
            },
            {
                item: 'alltheores:electrum_gear'
            },
            {
                item: 'modern_industrialization:steel_large_plate'
            },
            {
                item: 'addictives:caffeine'
            },
            {
                item: 'modern_industrialization:steel_upgrade'
            }
        ],
        inputFluid: {
            amount: 1000,
            fluid: 'industrialforegoing:latex'
        },
        output: {
            count: 1,
            id: 'industrialforegoing:speed_addon_tier_1'
        },
        processingTime: 200
    }).id('144craft2:immersive_eng/industrialforegoing/dissolution_chamber/industrialforegoing/speed_addon_tier_1')

    event.remove({ output: 'industrialforegoing:speed_addon_tier_2' })
    event.custom({
        type: 'industrialforegoing:dissolution_chamber',
        input: [
            {
                item: 'minecraft:redstone_block'
            },
            {
                item: 'industrialforegoing:speed_addon_tier_1'
            },
            {
                item: 'minecraft:copper_block'
            },
            {
                item: 'modern_industrialization:invar_large_plate'
            },
            {
                item: 'modern_industrialization:invar_large_plate'
            },
            {
                item: 'alltheores:electrum_gear'
            },
            {
                item: 'addictives:caffeine'
            },
            {
                item: 'alltheores:constantan_gear'
            }
        ],
        inputFluid: {
            amount: 1000,
            fluid: 'industrialforegoing:latex'
        },
        output: {
            count: 1,
            id: 'industrialforegoing:speed_addon_tier_2'
        },
        processingTime: 200
    }).id('144craft2:immersive_eng/industrialforegoing/dissolution_chamber/industrialforegoing/speed_addon_tier_2')

    event.remove({ output: 'industrialforegoing:processing_addon_tier_1' })
    event.custom({
        type: 'industrialforegoing:dissolution_chamber',
        input: [
            {
                item: 'minecraft:redstone_block'
            },
            {
                item: 'createmechanisms:physics_mechanism'
            },
            {
                item: 'minecraft:copper_block'
            },
            {
                item: 'alltheores:electrum_gear'
            },
            {
                item: 'alltheores:constantan_gear'
            },
            {
                item: 'modern_industrialization:aluminum_large_plate'
            },
            {
                item: 'addictives:unstable_mix'
            },
            {
                item: 'modern_industrialization:steel_upgrade'
            }
        ],
        inputFluid: {
            amount: 1000,
            fluid: 'industrialforegoing:latex'
        },
        output: {
            count: 1,
            id: 'industrialforegoing:processing_addon_tier_1'
        },
        processingTime: 200
    }).id('144craft2:immersive_eng/industrialforegoing/dissolution_chamber/industrialforegoing/processing_addon_tier_1')

    event.remove({ output: 'industrialforegoing:processing_addon_tier_2' })
    event.custom({
        type: 'industrialforegoing:dissolution_chamber',
        input: [
            {
                item: 'minecraft:redstone_block'
            },
            {
                item: 'industrialforegoing:processing_addon_tier_1'
            },
            {
                item: 'minecraft:copper_block'
            },
            {
                item: 'modern_industrialization:invar_large_plate'
            },
            {
                item: 'modern_industrialization:invar_large_plate'
            },
            {
                item: 'alltheores:electrum_gear'
            },
            {
                item: 'addictives:unstable_mix'
            },
            {
                item: 'alltheores:constantan_gear'
            }
        ],
        inputFluid: {
            amount: 1000,
            fluid: 'industrialforegoing:latex'
        },
        output: {
            count: 1,
            id: 'industrialforegoing:processing_addon_tier_2'
        },
        processingTime: 200
    }).id('144craft2:immersive_eng/industrialforegoing/dissolution_chamber/industrialforegoing/processing_addon_tier_2')
})