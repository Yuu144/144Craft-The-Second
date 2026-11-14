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
    //event.remove({ output: 'mekanism:heavy_water' })

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
    }).id('144craft2:mekanism_recipes/minecraft/shaped/mekanism/metallurgic_infuser')

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
    }).id('144craft2:mekanism_recipes/minecraft/shaped/mekanismgenerators/heat_generator')

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
    }).id('144craft2:mekanism_recipes/minecraft/shaped/mekanismgenerators/wind_generator')

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
    }).id('144craft2:mekanism_recipes/minecraft/shaped/mekanismgenerators/bio_generator')

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
    }).id('144craft2:mekanism_recipes/minecraft/shaped/mekanismgenerators/gas_burning_generator')

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

    }).id('144craft2:mekanism_recipes/create/sequenced_assembly/mekanism/electrolytic_core')

    event.shaped('bfr:fusion_reactor_controller', [
        'ABA',
        'CDC',
        'CCC'
    ], {
        A: 'mekanism:ultimate_control_circuit',
        B: 'tfmg:circuit_board',
        C: 'bfr:fusion_reactor_frame',
        D: 'mekanism:ultimate_chemical_tank'
    }).id('144craft2:mekanism_recipes/minecraft/shaped/bfr/fusion_reactor_controller')

    event.shaped('mekanism:digital_miner', [
        'ABA',
        'CDC',
        'EFE'
    ], {
        A: 'mekanism:elite_control_circuit',
        B: 'kubejs:larp_crystal',
        C: 'modern_industrialization:titanium_drill_head',
        D: 'mekanism:robit',
        E: 'cataclysm:lava_power_cell',
        F: 'allthecompressed:steel_block_1x'
    }).id('144craft2:mekanism_recipes/minecraft/shaped/mekanism/digital_miner')

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
    }).id('144craft2:mekanism_recipes/minecraft/shaped/mekanism/crusher')

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
    }).id('144craft2:mekanism_recipes/create/compacting/mekanism/steel_casing')

    event.shaped('mekanismgenerators:fission_fuel_assembly', [
        'ABA',
        'ACA',
        'ABA'
    ], {
        A: '#forge:ingots/lead',
        B: '#forge:ingots/steel',
        C: 'bigreactors:blutonium_block'
    }).id('144craft2:mekanism_recipes/minecraft/shaped/mekanismgenerators/fission_fuel_assembly')

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
                "type": "create:pressing", // NORTHSTAR-FIX: War davor northstar:engraving. Alternative suchen
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
    }).id('144craft2:mekanism_recipes/create/sequenced_assembly/mekanism/supercharged_coil')

    // Heavy Water -> Deuterium / Oxygen
    event.remove({ id: 'mekanismgenerators:rotary/deuterium' })
    event.remove({ id: 'mekanismgenerators:separator/heavy_water' })
    event.custom({
        "type": "mekanism:separating",
        "energy_multiplier": 2,
        "input": { "amount": 2, "fluid": "modern_industrialization:high_pressure_heavy_water" },
        "left_chemical_output": { "amount": 2, "id": "mekanismgenerators:deuterium" },
        "right_chemical_output": { "amount": 1, "id": "mekanism:oxygen" }
    }).id('144craft2:mekanism_recipes/mekanism/separating/mekanismgenerators/deuterium')

    event.remove({ output: 'mekanism:pressurized_reaction_chamber' })
    event.shaped('mekanism:pressurized_reaction_chamber', [
        'ABA',
        'CDC',
        'EFE'
    ], {
        A: 'mekanism:steel_casing',
        B: 'mekanism:advanced_control_circuit',
        C: 'modern_industrialization:tungsten_large_plate',
        D: 'modern_industrialization:turbo_machine_casing',
        E: 'modern_industrialization:blastproof_alloy_plate',
        F: 'modern_industrialization:digital_circuit'
    }).id('144craft2:mekanism_recipes/minecraft/shaped/mekanism/pressurized_reaction_chamber')

    event.remove({ id: 'mekanism:upgrade/speed' })
    event.remove({ id: 'mekanism:upgrade/energy' })
    event.remove({ id: 'mekanism:upgrade/filter' })
    event.remove({ id: 'mekanism:upgrade/muffling' })
    event.remove({ id: 'mekanism:upgrade/chemical' })
    event.remove({ id: 'mekanism:upgrade/anchor' })
    event.remove({ mod: 'tfmg', output: 'tfmg:lithium_ingot' })

    event.custom({
        type: 'tfmg:casting',
        ingredients: [
            {
                type: 'neoforge:single',
                amount: 250,
                fluid: 'mekanism:lithium'
            }
        ],
        processing_time: 200,
        results: [
            { id: 'tfmg:lithium_ingot' }
        ]
    }).id('144craft2:mekanism_recipes/tfmg/casting/tfmg/lithium_ingot')

    event.shaped('tfmg:lithium_ingot', [
        'AAA',
        'AAA',
        'AAA'
    ], {
        A: 'tfmg:lithium_nugget'
    }).id('144craft2:mekanism_recipes/minecraft/shaped/tfmg/lithium_ingot')

    event.shaped('mekanism:upgrade_speed', [
        'CBC',
        'BAB',
        'CBC'
    ], {
        B: 'alltheores:aluminum_plate',
        A: 'tfmg:lithium_charge',
        C: 'mekanism:alloy_infused'
    }).id('144craft2:mekanism_recipes/minecraft/shaped/mekanism/upgrade_speed')

    event.shaped('mekanism:upgrade_energy', [
        'CBC',
        'BAB',
        'CBC'
    ], {
        A: 'tfmg:lithium_nugget',
        B: 'alltheores:gold_plate',
        C: 'mekanism:alloy_infused'
    }).id('144craft2:mekanism_recipes/minecraft/shaped/mekanism/upgrade_energy')

})