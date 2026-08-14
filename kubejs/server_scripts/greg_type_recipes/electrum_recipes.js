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
    event.remove({ output: 'oritech:electrum_ingot' })
    event.remove({ output: 'createaddition:electrum_sheet' })

    // Use a representative 50/50 gold-silver blend.  Requiring dusts keeps
    // direct ingot mixing and the stock alloy recipes from bypassing the
    // pack's ore-processing progression.
    event.custom({
        type: 'create:mixing',
        heat_requirement: 'heated',
        ingredients: [
            { tag: 'c:dusts/gold' },
            { tag: 'c:dusts/gold' },
            { tag: 'c:dusts/silver' },
            { tag: 'c:dusts/silver' },
            { tag: 'tfmg:flux' }
        ],
        results: [
            { id: 'alltheores:electrum_dust', count: 4 }
        ]
    })

    // Remelt the blended powder with slag.  This represents fluxing and
    // skimming impurities before the alloy is ready to cast.
    event.custom({
        type: 'create:mixing',
        heat_requirement: 'heated',
        ingredients: [
            { item: 'alltheores:electrum_dust' },
            { item: 'alltheores:electrum_dust' },
            { item: 'alltheores:electrum_dust' },
            { item: 'alltheores:electrum_dust' },
            { tag: 'tfmg:flux' },
            {
                type: 'neoforge:single',
                fluid: 'tfmg:molten_slag',
                amount: 250
            }
        ],
        results: [
            {
                amount: 1000,
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
