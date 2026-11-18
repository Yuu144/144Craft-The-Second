ServerEvents.recipes(hscraft => {

    //Precision Mechanism
    hscraft.remove({ id: 'create:sequenced_assembly/precision_mechanism' })
    hscraft.remove({ id: 'create_sa:hydraulic_engine_recipe' })

    hscraft.custom({
        'type': 'create:sequenced_assembly',
        'ingredient': {
            'item': 'createmechanisms:wooden_mechanism'
        },
        'loops': 5,
        'results': [
            {
                'id': 'create:precision_mechanism'
            }
        ],
        'sequence': [
            {
                'type': 'create:deploying',
                'ingredients': [
                    {
                        'item': 'createmechanisms:wooden_mechanism'
                    },
                    {
                        'item': 'alltheores:gold_plate'
                    }
                ],
                'results': [
                    {
                        'id': 'createmechanisms:wooden_mechanism'
                    }
                ]
            },
            {
                'type': 'create:deploying',
                'ingredients': [
                    {
                        'item': 'create:incomplete_precision_mechanism'
                    },
                    {
                        'item': 'create:rose_quartz'
                    }
                ],
                'results': [
                    {
                        'id': 'createmechanisms:wooden_mechanism'
                    }
                ]
            },
            {
                'type': 'create:deploying',
                'ingredients': [
                    {
                        'item': 'create:incomplete_precision_mechanism'
                    },
                    {
                        'item': 'create:cogwheel'
                    }
                ],
                'results': [
                    {
                        'id': 'createmechanisms:wooden_mechanism'
                    }
                ]
            },
            {
                'type': 'create:deploying',
                'ingredients': [
                    { 'item': 'create:incomplete_precision_mechanism' },
                    { 'item': 'alltheores:bronze_plate' }
                ],
                'results': [
                    { 'id': 'createmechanisms:wooden_mechanism' }
                ]
            }
        ],
        'transitional_item': {
            'id': 'create:incomplete_precision_mechanism'
        }

    }).id('144craft2:greg_type_recipes/create_mechanism_tiers/create/sequenced_assembly/create/precision_mechanism')

    //Wooden Mechanism
    hscraft.shaped('createmechanisms:wooden_mechanism', [
        'BAB',
        'ACA',
        'BAB'
    ],{
        A: 'create:andesite_alloy',
        B: '#minecraft:planks',
        C: 'create:cogwheel'
    }).id('144craft2:greg_type_recipes/create_mechanism_tiers/minecraft/shaped/createmechanisms/wooden_mechanism')  

    //Computing Mechanism
    hscraft.custom({
        'type': 'create:sequenced_assembly',
        'ingredient': {
            'item': 'create:precision_mechanism'
        },
        'loops': 3,
        'results': [
            {
                'id': 'createmechanisms:computing_mechanism'
            }
        ],
        'sequence': [
            {
                'type': 'create:deploying',
                'ingredients': [
                    {
                        'item': 'create:precision_mechanism'
                    },
                    {
                        'item': 'modern_industrialization:annealed_copper_hot_ingot'
                    }
                ],
                'results': [
                    {
                        'id': 'create:precision_mechanism'
                    }
                ]
            },
            {
                'type': 'create:deploying',
                'ingredients': [
                    {
                        'item': 'create:precision_mechanism'
                    },
                    {
                        'item': 'ae2:silicon'
                    }
                ],
                'results': [
                    {
                        'id': 'create:precision_mechanism'
                    }
                ]
            },
            {
                'type': 'create:deploying',
                'ingredients': [
                    {
                        'item': 'create:precision_mechanism'
                    },
                    {
                        'item': 'alltheores:aluminum_plate'
                    }
                ],
                'results': [
                    {
                        'id': 'create:precision_mechanism'
                    }
                ]
            }
        ],
        'transitional_item': {
            'id': 'createmechanisms:void_mechanism'
        }

    }).id('144craft2:greg_type_recipes/create_mechanism_tiers/create/sequenced_assembly/createmechanisms/computing_mechanism')

    //Fluid Mechanism
    hscraft.custom({
        'type': 'create:sequenced_assembly',
        'ingredient': {
            'item': 'createmechanisms:wooden_mechanism'
        },
        'loops': 2,
        'results': [
            {
                'chance': 90,
                'id': 'createmechanisms:fluid_mechanism'
            },
            {
                'chance': 2,
                'id': 'alltheores:salt_block'
            },
            {
                'chance': 5,
                'id': 'create:andesite_alloy'
            },
            {
                'chance': 3,
                'id': 'alltheores:salt'
            }
        ],
        'sequence': [
            {
                'type': 'create:deploying',
                'ingredients': [
                    {
                        'item': 'createmechanisms:wooden_mechanism'
                    },
                    {
                        'item': 'create:fluid_tank'
                    }
                ],
                'results': [
                    {
                        'id': 'createmechanisms:wooden_mechanism'
                    }
                ]
            },
            {
                'type': 'create:deploying',
                'ingredients': [
                    {
                        'item': 'createmechanisms:wooden_mechanism'
                    },
                    {
                        'item': 'minecraft:bucket'
                    }
                ],
                'results': [
                    {
                        'id': 'createmechanisms:wooden_mechanism'
                    }
                ]
            },
            {
                'type': 'create:deploying',
                'ingredients': [
                    {
                        'item': 'createmechanisms:wooden_mechanism'
                    },
                    {
                        'item': 'alltheores:salt_block' 
                    }
                ],
                'results': [
                    {
                        'id': 'createmechanisms:wooden_mechanism'
                    }
                ]
            },
            {
                'type': 'create:deploying',
                'ingredients': [
                    { 'item': 'createmechanisms:wooden_mechanism' },
                    { 'item': 'alltheores:bronze_gear' }
                ],
                'results': [
                    { 'id': 'createmechanisms:wooden_mechanism' }
                ]
            },
            {
                'type': 'create:deploying',
                'ingredients': [
                    { 'item': 'createmechanisms:wooden_mechanism' },
                    { 'item': 'modern_industrialization:bronze_curved_plate' }
                ],
                'results': [
                    { 'id': 'createmechanisms:wooden_mechanism' }
                ]
            }
        ],
        'transitional_item': {
            'id': 'createmechanisms:void_mechanism'
        }

    }).id('144craft2:greg_type_recipes/create_mechanism_tiers/create/sequenced_assembly/createmechanisms/fluid_mechanism')

    //Hydraulic Engine
    hscraft.custom({
        'type': 'create:sequenced_assembly',
        'ingredient': {
            'item': 'createmechanisms:fluid_mechanism'
        },
        'loops': 3,
        'results': [
            {
                'chance': 80,
                'id': 'create_sa:hydraulic_engine'
            },
            {
                'chance': 8,
                'id': 'alltheores:copper_plate'
            },
            {
                'chance': 2,
                'id': 'createmechanisms:fluid_mechanism'
            },
            {
                'chance': 4,
                'id': 'alltheores:dirty_copper_dust'
            },
            {
                'chance': 6,
                'id': 'create:cogwheel'
            }
        ],
        'sequence': [
            
            {
                'type': 'create:filling',
                'ingredients': [
                    {
                        'item': 'createmechanisms:fluid_mechanism'
                    },
                    {
                        'type': 'neoforge:single',
                        'amount': 250,
                        'fluid': 'modern_industrialization:plant_oil'
                    }
                ],
                'results': [
                    {
                        'id': 'createmechanisms:fluid_mechanism'
                    }
                ]
            },
            {
                'type': 'create:pressing',
                'ingredients': [
                    {
                        'item': 'createmechanisms:fluid_mechanism'
                    }
                ],
                'results': [
                    {
                        'id': 'createmechanisms:fluid_mechanism'
                    }
                ]
            },
            {
                'type': 'create:pressing',
                'ingredients': [
                    {
                        'item': 'createmechanisms:fluid_mechanism'
                    }
                ],
                'results': [
                    {
                        'id': 'createmechanisms:fluid_mechanism'
                    }
                ]
            }
        ],
        'transitional_item': {
            'id': 'createmechanisms:void_mechanism'
        }

    }).id('144craft2:greg_type_recipes/create_mechanism_tiers/create/sequenced_assembly/create_sa/hydraulic_engine/from/createmechanisms/fluid_mechanism/using/modern_industrialization/plant_oil')
    //Hydraulic Engine (alt)
    hscraft.custom({
        'type': 'create:sequenced_assembly',
        'ingredient': {
            'item': 'createmechanisms:fluid_mechanism'
        },
        'loops': 3,
        'results': [
            {
                'chance': 80,
                'id': 'create_sa:hydraulic_engine'
            },
            {
                'chance': 8,
                'id': 'alltheores:copper_plate'
            },
            {
                'chance': 2,
                'id': 'createmechanisms:fluid_mechanism'
            },
            {
                'chance': 4,
                'id': 'alltheores:dirty_copper_dust'
            },
            {
                'chance': 6,
                'id': 'create:cogwheel'
            }
        ],
        'sequence': [
            
            {
                'type': 'create:filling',
                'ingredients': [
                    {
                        'item': 'createmechanisms:fluid_mechanism'
                    },
                    {
                        'type': 'neoforge:single',
                        'amount': 500,
                        'fluid': 'modern_industrialization:raw_synthetic_oil'
                    }
                ],
                'results': [
                    {
                        'id': 'createmechanisms:fluid_mechanism'
                    }
                ]
            },
            {
                'type': 'create:pressing',
                'ingredients': [
                    {
                        'item': 'createmechanisms:fluid_mechanism'
                    }
                ],
                'results': [
                    {
                        'id': 'createmechanisms:fluid_mechanism'
                    }
                ]
            },
            {
                'type': 'create:pressing',
                'ingredients': [
                    {
                        'item': 'createmechanisms:fluid_mechanism'
                    }
                ],
                'results': [
                    {
                        'id': 'createmechanisms:fluid_mechanism'
                    }
                ]
            }
        ],
        'transitional_item': {
            'id': 'createmechanisms:void_mechanism'
        }

    }).id('144craft2:greg_type_recipes/create_mechanism_tiers/create/sequenced_assembly/create_sa/hydraulic_engine/from/createmechanisms/fluid_mechanism/using/modern_industrialization/raw_synthetic_oil')

    hscraft.custom({
        "type": "create:mechanical_crafting",
        "accept_mirrored": true,
        "category": "misc",
        "key": {
            "A": {
            "item": 'modern_industrialization:bronze_curved_plate'
            },
            "B": {
            "item": 'alltheores:brass_gear'
            },
            "C": {
            "item": 'create:precision_mechanism'
            },
            "D": {
            "item": 'cataclysm:ancient_metal_ingot'
            },
            "E": {
            "item": 'alltheores:steel_ingot'
            }
        },
        "pattern": [
            " AAA ",
            "ADEDA",
            "BECEB",
            "ADEDA",
            " AAA "
        ],
        "result": {
            "count": 1,
            "id": 'createmechanisms:physics_mechanism'
        },
        "show_notification": false
    }).id("144craft2:ae2/physics_mechanism")

    hscraft.custom({
        'type': 'create:sequenced_assembly',
        'ingredient': {
            'item': 'create:precision_mechanism'
        },
        'loops': 3,
        'results': [
            {
                'chance': 90,
                'id': 'createmechanisms:rubber_mechanism'
            },
            {
                'chance': 8,
                'id': 'industrialforegoing:dryrubber'
            },
            {
                'chance': 2,
                'id': 'create:andesite_alloy'
            }
        ],
        'sequence': [
            
            {
                'type': 'create:filling',
                'ingredients': [
                    {
                        'item': 'create:precision_mechanism'
                    },
                    {
                        'type': 'neoforge:single',
                        'amount': 250,
                        'fluid': 'industrialforegoing:latex'
                    }
                ],
                'results': [
                    {
                        'id': 'create:precision_mechanism'
                    }
                ]
            },
            {
                'type': 'create:deploying',
                'ingredients': [
                    { 'item': 'create:precision_mechanism' },
                    { 'item': 'industrialforegoing:plastic' }
                ],
                'results': [
                    { 'id': 'create:precision_mechanism' }
                ]
            },
            {
                'type': 'create:pressing',
                'ingredients': [
                    {
                        'item': 'create:precision_mechanism'
                    }
                ],
                'results': [
                    {
                        'id': 'create:precision_mechanism'
                    }
                ]
            }
        ],
        'transitional_item': {
            'id': 'createmechanisms:void_mechanism'
        }

    }).id('144craft2:greg_type_recipes/create_mechanism_tiers/create/sequenced_assembly/rubber_mechanism')
})
