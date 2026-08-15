ServerEvents.recipes(event => {
    event.remove({ not: { output: "alltheores:electrum_ingot" }, output: '#c:ingots/electrum' })
    event.remove({ not: { output: "alltheores:electrum_dust" }, output: '#c:dusts/electrum' })
    event.remove({ id: 'alltheores:crafting/electrum/alloy_blending_from_dust' })
    event.remove({ id: 'alltheores:alloy_smelting/electrum_ingot' })
    event.remove({ id: 'alltheores:alloysmelter/electrum/ingot' })
    event.remove({ id: 'alltheores:arcfurnace/electrum/ingot' })
    event.remove({ id: 'alltheores:sag_milling/electrum/ingot' })
    event.remove({ id: 'electroenergetics:crafting/electrum_wire' })
    event.remove({ type: 'minecraft:smelting', input: '#c:dusts/electrum' })
    event.remove({ type: 'minecraft:blasting', input: '#c:dusts/electrum' })
    event.remove({ output: 'alltheores:electrum_dust' })
    event.remove({ output: 'createaddition:electrum_sheet' })

    event.custom({
        type: 'tfmg:vat_machine_recipe',
        allowed_vat_types: [
            'tfmg:firebrick_lined_vat'
        ],
        ingredients: [
            { tag: 'c:dusts/gold' },
            { tag: 'c:dusts/gold' },
            { tag: 'c:dusts/silver' },
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
                amount: 500,
                id: 'alltheores:molten_electrum'
            }
        ]
    })

    // Cast one ingot from the molten alloy.
    event.custom({
        type: 'create:compacting',
        ingredients: [
            {
                type: 'neoforge:single',
                fluid: 'alltheores:molten_electrum',
                amount: 1000
            }
        ],
        results: [
            { id: 'alltheores:electrum_ingot', count: 4 }
        ]
    })

    // Electrum Plate from Ingot
    event.custom({
        type: 'create:pressing',
        ingredients: [
            { tag: 'c:ingots/electrum' }
        ],
        results: [
            { id: 'alltheores:electrum_plate', count: 1 }
        ]
    })
})
