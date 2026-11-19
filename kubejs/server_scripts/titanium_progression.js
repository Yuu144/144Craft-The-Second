ServerEvents.recipes(event => {
    // Titanium
    event.remove({ id: 'modern_industrialization:materials/blast_furnace/titanium_from_raw' })
    event.custom({
        type: 'modern_industrialization:blast_furnace', eu: 128, duration: 400,
        item_inputs: [{ item: 'ad_astra:desh_ingot', amount: 3 }],
        fluid_inputs: [{ fluid: 'modern_industrialization:manganese_sulfuric_solution', amount: 3000 }],
        item_outputs: [{ item: 'modern_industrialization:titanium_hot_ingot', amount: 4 }],
        fluid_outputs: [{ fluid: 'modern_industrialization:manganese_sulfuric_solution', amount: 2500 }]
    }).id('144craft2:titanium/from_desh')

    // Stainless Steel Drill
    event.remove({ id: 'modern_industrialization:quarry/stainless_steel' })
    event.custom({
        type: 'modern_industrialization:quarry', eu: 32, duration: 600,
        item_inputs: [{ item: 'modern_industrialization:stainless_steel_drill', amount: 1, probability: 0.04 }],
        item_outputs: [
            { item: 'modern_industrialization:tungsten_ore', amount: 1, probability: 0.2 },
            { item: 'modern_industrialization:monazite_ore', amount: 1, probability: 0.25 },
            { item: 'modern_industrialization:platinum_ore', amount: 1, probability: 0.12 }
        ]
    }).id('144craft2:quarry/stainless_steel')
})
