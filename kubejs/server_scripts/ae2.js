ServerEvents.recipes(event => {

    event.remove({ output: 'ae2:controller' })
    event.remove({ output: 'ae2:formation_core' })
    event.remove({ output: 'ae2:annihilation_core' })
    event.remove({ output: 'ae2:inscriber' })

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
})