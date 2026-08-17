ServerEvents.tags('item', event => {
    event.add('c:silicon', 'tfmg:silicon_ingot')
    event.add('c:ingots/silicon', 'ae2:silicon')
})

ServerEvents.recipes(event => { 
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
})

