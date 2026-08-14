ServerEvents.recipes(event => {
    
    event.remove({ output: 'dndesires:hydraulic_press' })
    event.remove({ output: 'create:copper_casing' })
    event.remove({ output: 'create:railway_casing' })

    // Aus irgendeinem Grund sonst gone. Probably wegen Northstar
    event.custom({
        "type": "create:crushing",
        "ingredients": [
            {
            "item": "create:limestone"
            }
        ],
        "results": [
            {
            "id": "tfmg:limesand"
            }
        ]
    })

    event.shaped('dndesires:hydraulic_press', [
        ' A ',
        ' B ',
        ' C '
    ], {
        A: 'create_sa:hydraulic_engine',
        B: 'create:mechanical_press',
        C: 'allthecompressed:copper_block_1x'
    })

    event.shaped('create:windmill_bearing', [
        ' A ',
        ' B ',
        ' C '
    ], {
        A: '#minecraft:wooden_slabs',
        B: 'create:andesite_casing',
        C: 'create:shaft'
    })

    event.custom({
        'type': 'create:sequenced_assembly',
        'ingredient': {
            'item': 'create:andesite_casing'
        },
        'loops': 1,
        'results': [
            {
                'id': 'create:copper_casing'
            }
        ],
        'sequence': [
            {
                'type': 'create:deploying',
                'ingredients': [
                    {
                        'item': 'create:andesite_casing'
                    },
                    {
                        'item': 'minecraft:copper_ingot'
                    }
                ],
                'results': [
                    {
                        'id': 'create:andesite_casing'
                    }
                ]
            },
            {
                'type': 'create:deploying',
                'ingredients': [
                    {
                        'item': 'create:andesite_casing'
                    },
                    {
                        'item': 'minecraft:copper_ingot'
                    }
                ],
                'results': [
                    {
                        'id': 'create:andesite_casing'
                    }
                ]
            },
            {
                'type': 'create:pressing',
                'ingredients': [
                    {
                        'item': 'create:andesite_casing'
                    }
                ],
                'results': [
                    {
                        'id': 'create:andesite_casing'
                    }
                ]
            }
        ],
        'transitional_item': {
            'id': 'create:andesite_casing'
        }

    })

    event.custom({
        'type': 'create:sequenced_assembly',
        'ingredient': {
            'item': 'create:brass_casing'
        },
        'loops': 1,
        'results': [
            {
                'id': 'create:railway_casing'
            }
        ],
        'sequence': [
            {
                'type': 'create:deploying',
                'ingredients': [
                    {
                        'item': 'create:brass_casing'
                    },
                    {
                        'item': 'create:sturdy_sheet'
                    }
                ],
                'results': [
                    {
                        'id': 'create:andesite_casing'
                    }
                ]
            },
            {
                'type': 'create:deploying',
                'ingredients': [
                    {
                        'item': 'create:brass_casing'
                    },
                    {
                        'item': 'create:sturdy_sheet'
                    }
                ],
                'results': [
                    {
                        'id': 'create:andesite_casing'
                    }
                ]
            },
            {
                'type': 'create:pressing',
                'ingredients': [
                    {
                        'item': 'create:brass_casing'
                    }
                ],
                'results': [
                    {
                        'id': 'create:brass_casing'
                    }
                ]
            }
        ],
        'transitional_item': {
            'id': 'create:brass_casing'
        }

    })

    event.custom({
        type: 'create:splashing',
        ingredients: [ { item: 'minecraft:sand' } ],
        results: [
            { id: 'alltheores:zinc_nugget', chance: 0.08, count: 1 },
            { id: 'alltheores:nickel_nugget', chance: 0.08, count: 1 }
        ],
        processingTime: 200
    })
})