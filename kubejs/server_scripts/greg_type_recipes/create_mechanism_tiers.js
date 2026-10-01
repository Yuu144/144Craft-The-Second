ServerEvents.recipes(hscraft => {

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

})
