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
            }
        ],
        'transitional_item': {
            'id': 'create:incomplete_precision_mechanism'
        }

    })

    //Wooden Mechanism
    hscraft.shaped('createmechanisms:wooden_mechanism', [
        'BAB',
        'ACA',
        'BAB'
    ],{
        A: 'create:andesite_alloy',
        B: '#minecraft:planks',
        C: 'create:cogwheel'
    })  

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

    })

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
                'id': 'northstar:sodium_catalyst'
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
                        'item': 'northstar:sodium_catalyst'
                    }
                ],
                'results': [
                    {
                        'id': 'createmechanisms:wooden_mechanism'
                    }
                ]
            }
        ],
        'transitional_item': {
            'id': 'createmechanisms:void_mechanism'
        }

    })

    //Hydraulic Engine
    hscraft.custom({
        'type': 'create:sequenced_assembly',
        'ingredient': {
            'item': 'createmechanisms:fluid_mechanism'
        },
        'loops': 2,
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
                        'type': 'neofroge:single',
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
            }
        ],
        'transitional_item': {
            'id': 'createmechanisms:void_mechanism'
        }

    })
    //Hydraulic Engine (alt)
    hscraft.custom({
        'type': 'create:sequenced_assembly',
        'ingredient': {
            'item': 'createmechanisms:fluid_mechanism'
        },
        'loops': 2,
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
                        'type': 'neofroge:single',
                        'amount': 500,
                        'fluid': 'modern_industrialization:synthetic_oil'
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

    })

})
