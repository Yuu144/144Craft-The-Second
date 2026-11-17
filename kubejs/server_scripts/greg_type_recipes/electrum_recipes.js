ServerEvents.recipes(event => {
    event.remove({ output: 'alltheores:electrum_ingot' })
    event.remove({ id: 'alltheores:crafting/electrum/alloy_blending_from_dust' })
    event.remove({ id: 'oritech:compat/mekanism/infusing/electrum_dust' })
    event.remove({ id: 'alltheores:alloy_smelting/electrum_ingot' })
    event.remove({ id: 'alltheores:alloy_smelting/electrum_ingot' })
    event.remove({ id: 'modern_industrialization:alloy/mixer/electrum/dust' })
    event.remove({ id: 'modern_industrialization:alloy/mixer/electrum/tiny_dust' })

    // Electrum
    event.custom({
        type: 'extended_industrialization:alloy_smelter',
        duration: 200,
        eu: 32,
        item_inputs: [
            { tag: 'c:ingots/gold', amount: 3 },
            { tag: 'c:ingots/silver', amount: 1 }
        ],
        item_outputs: [
            { item: 'alltheores:electrum_ingot', amount: 3 }
        ]
    }).id('144craft2:greg_type_recipes/electrum_recipes/alloy_smelter/electrum_ingot')

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
                amount: 180,
                id: 'alltheores:molten_electrum'
            }
        ]
    }).id('144craft2:greg_type_recipes/electrum_recipes/tfmg/vat_machine_recipe/tfmg/coal_coke_dust')

    // Cast one ingot from the molten alloy.
    event.custom({
        type: 'tfmg:casting',
        ingredients: [
            {
                type: 'neoforge:single',
                amount: 90,
                fluid: 'alltheores:molten_electrum'
            }
        ],
        processing_time: 200,
        results: [
            { id: 'alltheores:electrum_ingot' }
        ]
    }).id('144craft2:greg_type_recipes/electrum_recipes/tfmg/casting/alltheores/electrum_ingot')
})
