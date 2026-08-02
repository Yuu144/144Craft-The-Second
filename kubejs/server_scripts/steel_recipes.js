ServerEvents.recipes(event => {
    event.remove({ output: '#c:ingots/steel' })
    event.remove({ output: '#c:dusts/steel' })
    event.remove({ output: '#c:dusts/coal' })
    event.remove({ output: 'alltheores:alloy_smelting/steel_ingot' })
    event.remove({ type: 'alltheores:alloy_smelting', output: 'alltheores:steel_ingot' }) // Wollte einfach nicht verschwinden mit event.remove({ output: '#c:ingots/steel' })

    // === Early Game Steel Production ===
    // Coal Dust
    event.custom({
        type: 'create:crushing',
        ingredients: [ { item: 'minecraft:coal' } ],
        results: [
            { id: 'mekanism:dust_coal', count: 1 },
            { id: 'mekanism:dust_coal', chance: 0.5, count: 1 }
        ],
        processingTime: 250
    })

    // Pig Iron Ingot
    event.custom({
        type: 'create:mixing',
        heat_requirement: 'heated',
        ingredients: [
            { tag: 'c:ingots/iron' },
            { tag: 'c:ingots/iron' },
            { tag: 'c:dusts/coal' },
            { tag: 'c:dusts/coal' },
            { item: 'minecraft:calcite' }
        ],
        results: [ { id: 'kubejs:pig_iron_ingot', count: 1 } ]
    })

    // Unforged Steel Ingot
    event.custom({
        type: 'create:mixing',
        heat_requirement: 'superheated',
        ingredients: [ { item: 'kubejs:pig_iron_ingot' } ],
        results: [ { id: 'kubejs:unforged_steel_ingot', count: 1 } ]
    })

    // Steel Ingot
    event.custom({
        type: 'create:pressing',
        ingredients: [ { item: 'kubejs:unforged_steel_ingot' } ],
        results: [ { id: 'mekanism:ingot_steel', count: 1 } ]
    })

    // === Late Game Steel Production ===
    event.custom({
        type: 'mekanism:reaction',
        item_input: {
            count: 1,
            item: 'mekanism:enriched_iron'
        },
        fluid_input: {
            amount: 1000,
            fluid: 'minecraft:water'
        },
        chemical_input: {
            amount: 100,
            chemical: 'mekanism:oxygen'
        },
        duration: 80,
        item_output: {
            count: 2,
            id: 'mekanism:dust_steel'
        }
    })

    event.smelting('mekanism:ingot_steel', 'mekanism:dust_steel')
    event.blasting('mekanism:ingot_steel', 'mekanism:dust_steel')
})