ServerEvents.recipes(event => {

    event.remove({ output: 'ae2:controller' })
    event.remove({ output: 'ae2:formation_core' })
    event.remove({ output: 'ae2:annihilation_core' })
    event.remove({ output: 'ae2:inscriber' })
    event.remove({ output: 'ae2:condenser' })
    event.remove({ output: 'extendedae:void_cell' })
    event.remove({ output: 'advanced_ae:reaction_chamber' })

    event.custom({
        type: 'create:compacting',
        ingredients: [
            { item: 'ae2:charged_certus_quartz_crystal' },
            { item: 'ae2:fluix_dust' },
            { item: 'ae2:logic_processor' }
        ],
        results: [
            { id: 'ae2:formation_core', count: 2 }
        ]
    }).heated().id('144craft2:ae2/fcore')

    event.custom({
        type: 'create:compacting',
        ingredients: [
            { item: 'minecraft:quartz' },
            { item: 'ae2:fluix_dust' },
            { item: 'ae2:calculation_processor' }
        ],
        results: [
            { id: 'ae2:annihilation_core', count: 2 }
        ]
    }).heated().id('144craft2:ae2/acore')

    event.custom({
        "type": "create:mechanical_crafting",
        "accept_mirrored": false,
        "category": "misc",
        "key": {
            "A": {
            "item": 'ae2:smooth_sky_stone_block'
            },
            "B": {
            "item": 'ae2:charged_certus_quartz_crystal'
            },
            "C": {
            "item": 'ae2:fluix_crystal'
            },
            "D": {
            "item": 'ae2:logic_processor'
            },
            "E": {
            "item": 'ae2:engineering_processor'
            },
            "F": {
            "item": 'ae2:calculation_processor'
            }
        },
        "pattern": [
            "AABAA",
            "ACFCA",
            "BDCDB",
            "ACECA",
            "AABAA"
        ],
        "result": {
            "count": 1,
            "id": 'ae2:controller'
        },
        "show_notification": false
    }).id("144craft2:ae2/controller")

    event.shaped('ae2:inscriber', [
        'ABA',
        'C A',
        'ABA'
    ],{
        A:'minecraft:iron_ingot',
        B:'create:mechanical_press',
        C:'minecraft:copper_ingot'
    })

    event.custom({
    
        "type": "oritech:particle_collision",
            "fluidInput": {
            "amount": 0,
            "fluid": "minecraft:empty"
        },
            "fluidOutputs": [],
            "ingredients": [
        {
            "tag": "allthecompressed:5x"
        },
        {
            "tag": "allthecompressed:5x"
        }
        ],
            "results": [
        {
            "count": 1,
            "id": "ae2:singularity"
        }
        ],
            "time": 40000

    })

    event.custom({

        type: 'create:pressing',
        ingredients: [
            { tag: 'allthecompressed:2x' }
        ],
        results: [
            { id: 'ae2:matter_ball', count: 8 }
        ]

    })

    event.shaped('extendedae:void_cell', [
        'ABA',
        'CDC',
        'EEE'
    ],{
        A:'ae2:quartz_glass',
        B:'trashcans:ultimate_trash_can',
        C:'ae2:void_card',
        D:'ae2:cell_component_16k',
        E:'minecraft:amethyst_shard'
    })

    event.shaped('advanced_ae:reaction_chamber', [
        'ABA',
        'ACA',
        'DED'
    ],{
        A:'ae2:fluix_dust',
        B:'create:precision_mechanism',
        C:'ae2:vibration_chamber',
        D:'minecraft:glowstone',
        E:'minecraft:bucket'
    })

})