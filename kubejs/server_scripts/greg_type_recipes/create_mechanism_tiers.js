ServerEvents.recipes(hscraft => {

    //Precision Mechanism
    hscraft.remove({ id: 'create:sequenced_assembly/precision_mechanism' })

    hscraft.custom({
        'type': 'create:sequenced_assembly',
        'ingredient': {
            'item': 'createmechanisms:wooden_mechanism'
        },
        'loops': 3,
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
})
