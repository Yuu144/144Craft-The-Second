ServerEvents.recipes(event => {
    event.remove({ output: 'alltheores:electrum_ingot' })
    event.remove({ id: 'alltheores:crafting/electrum/alloy_blending_from_dust' })
    event.remove({ id: 'oritech:compat/mekanism/infusing/electrum_dust' })
    event.remove({ id: 'alltheores:alloy_smelting/electrum_ingot' })
    event.remove({ id: 'alltheores:alloy_smelting/electrum_ingot' })
    event.remove({ id: 'modern_industrialization:alloy/mixer/electrum/dust' })
    event.remove({ id: 'modern_industrialization:alloy/mixer/electrum/tiny_dust' })

    event.custom({
        type: 'tfmg:vat_machine_recipe',
        allowed_vat_types: [
            'tfmg:firebrick_lined_vat'
        ],
        ingredients: [
            { tag: 'c:dusts/gold' },
            { tag: 'c:dusts/silver' },
            { tag: 'tfmg:flux' }
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
                chance: 0.5,
                id: 'tfmg:coal_coke_dust'
            },
            {
                amount: 250,
                id: 'alltheores:molten_electrum'
            }
        ]
    })

    // Cast one ingot from the molten alloy.
    event.custom({
        type: 'tfmg:casting',
        ingredients: [
            {
                type: 'neoforge:single',
                amount: 250,
                fluid: 'alltheores:molten_electrum'
            }
        ],
        processing_time: 200,
        results: [
            { id: 'alltheores:electrum_ingot' }
        ]
    })
})
