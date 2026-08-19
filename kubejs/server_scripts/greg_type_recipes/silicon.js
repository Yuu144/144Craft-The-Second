ServerEvents.tags('item', event => {
    //event.add('c:silicon', 'tfmg:silicon_ingot')
    event.add('c:ingots/silicon', 'ae2:silicon')
})

ServerEvents.recipes(event => {
    event.remove({ id: 'tfmg:industrial_blasting/silicon' })
    event.remove({ id: 'tfmg:casting/silicon' })
    event.custom({
        type: 'tfmg:vat_machine_recipe',
        allowed_vat_types: [
            'tfmg:firebrick_lined_vat'
        ],
        ingredients: [
            { tag: 'c:dusts/certus_quartz' },
            { tag: 'c:dusts/certus_quartz' },
            { tag: 'c:dusts/coal' },
            { tag: 'c:dusts/coal' }
        ],
        machines: [
            'tfmg:graphite_electrode',
            'tfmg:graphite_electrode',
            'tfmg:graphite_electrode'
        ],
        min_size: 9,
        processing_time: 20,
        results: [
            {
                amount: 500,
                id: 'tfmg:liquid_silicon'
            }
        ]
    })

    event.custom({
        type: 'tfmg:casting',
        ingredients: [
            {
                type: 'neoforge:single',
                amount: 250,
                fluid: 'tfmg:liquid_silicon'
            }
        ],
        processing_time: 200,
        results: [
            { id: 'ae2:silicon' }
        ]
    })

    event.custom({
        "type": "create:mixing",
        "ingredients": [
            {
                "tag": "c:ingots/aluminum"
            },
            {
                "tag": "c:silicon"
            }
        ],
        "results": [
            {
                "id": "tfmg:p_semiconductor"
            }
        ]
    })

    event.custom({
        "type": "create:mixing",
        "ingredients": [
            {
                "tag": "c:dusts/sulfur"
            },
            {
                "tag": "c:silicon"
            }
        ],
        "results": [
            {
                "id": "tfmg:n_semiconductor"
            }
        ]
    })

    event.custom({
        "type": "create:mixing",
        "heat_requirement": "heated",
        "ingredients": [
            {
                "tag": "c:ingots/nickel"
            },
            {
                "tag": "c:ingots/nickel"
            },
            {
                "tag": "c:silicon"
            },
            {
                "tag": "c:ingots/steel"
            },
            {
                "tag": "c:ingots/steel"
            }
        ],
        "processing_time": 300,
        "results": [
            {
                "count": 2,
                "id": "tfmg:magnetic_alloy_ingot"
            }
        ]
    })

    event.custom({
        "type": "minecraft:crafting_shaped",
        "category": "misc",
        "key": {
            "A": {
                "item": "tfmg:industrial_aluminum_casing"
            },
            "C": {
                "item": "tfmg:circuit_board"
            },
            "G": {
                "item": "minecraft:black_stained_glass_pane"
            },
            "K": {
                "tag": "c:silicon"
            },
            "W": {
                "tag": "c:wires/copper"
            }
        },
        "pattern": [
            "WGW",
            "KAK",
            "WCW"
        ],
        "result": {
            "count": 4,
            "id": "tfmg:segmented_display"
        }
    })
})

