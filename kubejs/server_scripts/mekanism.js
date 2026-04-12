ServerEvents.recipes(event => {

    event.remove({ output: 'mekanism:metallurgic_infuser' })
    event.remove({ output: 'mekanismgenerators:bio_generator' })
    event.remove({ output: 'mekanismgenerators:gas_burning_generator' })
    event.remove({ output: 'mekanism:electrolytic_core' })
    event.remove({ output: 'bfr:fusion_reactor_controller' })
    event.remove({ output: 'mekanism:digital_miner' })
    event.remove({ output: 'mekanism:steel_casing' })

    event.shaped('mekanism:metallurgic_infuser', [
        'ACA',
        'BDB',
        'ACA'
    ], {
        A: 'minecraft:iron_ingot',
        B: 'minecraft:redstone',
        C: 'alltheores:osmium_ingot',
        D: 'create_sa:hydraulic_engine'
    })

    event.shaped('mekanismgenerators:bio_generator', [
        'ABA',
        'CDC',
        'EBE'
    ], {
        A: 'minecraft:redstone',
        B: 'mekanism:alloy_infused',
        C: '#c:fuels/bio',
        D: 'mekanism:basic_control_circuit',
        E: 'alltheores:steel_ingot'
    })

    event.shaped('mekanismgenerators:gas_burning_generator', [
        'ABA',
        'CDC',
        'ABA'
    ], {
        A: 'alltheores:osmium_ingot',
        B: 'mekanism:alloy_infused',
        C: 'mekanismgenerators:bio_generator',
        D: 'mekanism:electrolytic_core'
    })

    event.custom({
        "type": "create:sequenced_assembly",
        "ingredient": {
            "item": "mekanism:alloy_reinforced"
        },
        "loops": 1,
        "results": [
            {
                "id": "mekanism:electrolytic_core"
            }
        ],
        "sequence": [
            {
                "type": "create:deploying",
                "ingredients": [
                    {
                        "item": "mekanism:alloy_reinforced"
                    },
                    {
                        "tag": "c:dusts/osmium"
                    }
                ],
                "results": [
                    {
                        "id": "mekanism:alloy_reinforced"
                    }
                ]
            },
            {
                "type": "create:deploying",
                "ingredients": [
                    {
                        "item": "mekanism:alloy_reinforced"
                    },
                    {
                        "tag": "c:dusts/iron"
                    }
                ],
                "results": [
                    {
                        "id": "mekanism:alloy_reinforced"
                    }
                ]
            },
            {
                "type": "create:deploying",
                "ingredients": [
                    {
                        "item": "mekanism:alloy_reinforced"
                    },
                    {
                        "tag": "c:dusts/gold"
                    }
                ],
                "results": [
                    {
                        "id": "mekanism:alloy_reinforced"
                    }
                ]
            }
        ],
        "transitional_item": {
            "id": "mekanism:alloy_reinforced"
        }

    })

    event.shaped('bfr:fusion_reactor_controller', [
        'ABA',
        'CDC',
        'CCC'
    ], {
        A: 'mekanism:ultimate_control_circuit',
        B: 'tfmg:circuit_board',
        C: 'bfr:fusion_reactor_frame',
        D: 'mekanism:ultimate_chemical_tank'
    })

    event.shaped('mekanism:digital_miner', [
        'ABA',
        'CDC',
        'EFE'
    ], {
        A: 'mekanism:alloy_atomic',
        B: 'northstar:lunar_sapphire_crystal',
        C: 'mekanism:logistical_sorter',
        D: 'mekanism:robit',
        E: 'mekanism:teleportation_core',
        F: 'create:precision_mechanism'
    })

    event.shaped('mekanism:crusher', [
        'ABA',
        'CDC',
        'ABA'
    ], {
        A: 'minecraft:redstone',
        B: 'mekanism:basic_control_circuit',
        C: 'create:crushing_wheel',
        D: 'mekanism:steel_casing'
    })

    event.custom({
        type: 'create:compacting',
        ingredients: [
            { item: 'alltheores:steel_ingot' },
            { item: 'alltheores:steel_ingot' },
            { item: 'alltheores:steel_ingot' },
            { item: 'alltheores:steel_ingot' },
            { item: 'alltheores:osmium_ingot' },
            { item: 'alltheores:osmium_ingot' },
            { item: 'alltheores:osmium_ingot' },
            { item: 'alltheores:osmium_ingot' },
            { item: 'minecraft:sand' },
            { item: 'minecraft:sand' },
            { item: 'minecraft:sand' },
            { item: 'minecraft:sand' }
        ],
        results: [
            { id: 'mekanism:steel_casing', count: 1 }
        ]
    }).heated()


})