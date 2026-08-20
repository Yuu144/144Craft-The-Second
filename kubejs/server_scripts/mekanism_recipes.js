ServerEvents.recipes(event => {

    event.remove({ output: 'mekanism:metallurgic_infuser' })
    event.remove({ output: 'mekanismgenerators:bio_generator' })
    event.remove({ output: 'mekanismgenerators:gas_burning_generator' })
    event.remove({ output: 'mekanism:electrolytic_core' })
    event.remove({ output: 'bfr:fusion_reactor_controller' })
    event.remove({ output: 'mekanism:digital_miner' })
    event.remove({ output: 'mekanism:steel_casing' })
    event.remove({ output: 'mekanismgenerators:fission_fuel_assembly' })
    event.remove({ output: 'mekanism:supercharged_coil' })
    event.remove({ output: 'mekanism:crusher' })
    event.remove({ output: 'mekanismgenerators:wind_generator' })
    event.remove({ output: 'mekanismgenerators:heat_generator' })
    event.remove({ output: 'mekanism:heavy_water' })

    event.shaped('mekanism:metallurgic_infuser', [
        'AEA',
        'BDB',
        'ACA'
    ], {
        A: '#c:ingots/steel',
        B: 'modern_industrialization:carbon_dust',
        C: 'alltheores:osmium_ingot',
        D: 'create_sa:hydraulic_engine',
        E: 'tfmg:steel_casing'
    })

    event.shaped('mekanismgenerators:heat_generator', [
        'AFA',
        'BDB',
        'CEC'
    ], {
        A: '#c:ingots/iron',
        B: '#minecraft:planks',
        C: '#c:ingots/copper',
        D: '#c:ingots/osmium',
        E: '#c:ingots/steel',
        F: 'mekanism:alloy_infused'
    })

    event.shaped('mekanismgenerators:wind_generator', [
        ' A ',
        'EBE',
        'CDC'
    ], {
        A: '#c:ingots/osmium',
        B: 'mekanism:alloy_infused',
        C: 'mekanism:energy_tablet',
        D: 'mekanism:basic_control_circuit',
        E: 'tfmg:steel_casing'
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
        E: 'tfmg:steel_casing'
    })

    event.shaped('mekanismgenerators:gas_burning_generator', [
        'ABA',
        'CDC',
        'EBE'
    ], {
        A: 'alltheores:osmium_ingot',
        B: 'mekanism:alloy_infused',
        C: 'mekanismgenerators:bio_generator',
        D: 'mekanism:electrolytic_core',
        E: 'mekanism:steel_casing'
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
        'EBE'
    ], {
        A: 'minecraft:redstone',
        B: 'mekanism:basic_control_circuit',
        C: 'create:crushing_wheel',
        D: 'tfmg:steel_casing',
        E: '#c:plates/electrum'
    })

    event.custom({
        type: 'create:compacting',
        heatRequirement: 'heated',
        ingredients: [
            { tag: 'c:plates/steel' },
            { tag: 'c:plates/steel' },
            { tag: 'c:plates/steel' },
            { tag: 'c:plates/steel' },
            { tag: 'c:plates/steel' },
            { tag: 'c:plates/steel' },
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
    })

    event.shaped('mekanismgenerators:fission_fuel_assembly', [
        'ABA',
        'ACA',
        'ABA'
    ], {
        A: '#forge:ingots/lead',
        B: '#forge:ingots/steel',
        C: 'bigreactors:blutonium_block'
    })

    event.custom({

        "type": "create:sequenced_assembly",
        "ingredient": {
            "item": "mekanism:laser"
        },
        "loops": 2,
        "results": [
            {
                "chance": 60.0,
                "id": "mekanism:supercharged_coil"
            },
            {
                "chance": 10.0,
                "id": "tfmg:coal_coke_dust"
            },
            {
                "chance": 10.0,
                "id": "mekanism:dust_coal"
            },
            {
                "chance": 10.0,
                "id": "mekanism:dust_sulfur"
            },
            {
                "chance": 5.0,
                "id": "ae2:singularity"
            },
            {
                "chance": 5.0,
                "id": "advanced_ae:quantum_infused_dust"
            }
        ],
        "sequence": [
            {
                "type": "create:deploying",
                "ingredients": [
                    {
                        "item": "mekanism:supercharged_coil"
                    },
                    {
                        "item": "minecraft:copper_block"
                    }
                ],
                "results": [
                    {
                        "id": "mekanism:supercharged_coil"
                    }
                ]
            },
            {
                "type": "create:deploying",
                "ingredients": [
                    {
                        "item": "mekanism:supercharged_coil"
                    },
                    {
                        "item": "mekanism:pellet_polonium"
                    }
                ],
                "results": [
                    {
                        "id": "mekanism:supercharged_coil"
                    }
                ]
            },
            {
                "type": "create:pressing",
                "ingredients": [
                    {
                        "item": "mekanism:supercharged_coil"
                    }
                ],
                "results": [
                    {
                        "id": "mekanism:supercharged_coil"
                    }
                ]
            },
            {
                "type": "northstar:engraving",
                "ingredients": [
                    {
                        "item": "mekanism:supercharged_coil"
                    }
                ],
                "processing_time": 200,
                "results": [
                    {
                        "id": "mekanism:supercharged_coil"
                    }
                ]
            }
        ],
        "transitional_item": {
            "id": "mekanism:supercharged_coil"
        }

    })

    event.replaceInput(
        { id: 'mekanismgenerators:/decondensentrating/rotary/deuterium' },
        '#c:deuterium',
        'mekanismgenerators:deuterium'
    )
})