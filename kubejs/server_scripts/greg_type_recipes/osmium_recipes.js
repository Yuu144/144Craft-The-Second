ServerEvents.recipes(event => {
    event.remove({ type: 'minecraft:smelting', input: '#c:raw_materials/osmium' })
    event.remove({ type: 'minecraft:blasting', input: '#c:raw_materials/osmium' })
    event.remove({ type: 'minecraft:smelting', input: '#c:ores/osmium' })
    event.remove({ type: 'minecraft:blasting', input: '#c:ores/osmium' })
    event.remove({ type: 'minecraft:smelting', input: '#c:dusts/osmium' })
    event.remove({ type: 'minecraft:blasting', input: '#c:dusts/osmium' })
    event.remove({ type: 'mekanism:enriching', output: '#c:dusts/osmium' })
    event.remove({ output: '#c:dusts/osmium' })
    //event.remove({ id: 'oritech:pulverizer/compat/mekanism/dust/osmium' })
    event.remove({ id: 'oritech:pulverizer/compat/mekanism/raw/osmium' })
    event.remove({ id: 'alltheores:arcfurnace/osmium/from_raw' })
    event.remove({ id: 'alltheores:arcfurnace/osmium/from_raw_block' })
    event.remove({ id: 'alltheores:arcfurnace/osmium/from_dust' })
    event.remove({ type: 'create:crushing', output: 'create:crushed_raw_osmium' })

    event.shapeless('alltheores:osmium_dust', [
        '#alltheores:ore_hammers',
        '#c:raw_materials/osmium',
        '#c:raw_materials/osmium'
    ]).damageIngredient('#alltheores:ore_hammers')

    // Raw Osmium -> ATO Osmium Dust
    event.custom({
        type: 'create:crushing',
        ingredients: [ { tag: 'c:raw_materials/osmium' } ],
        results: [
            { id: 'alltheores:osmium_dust', count: 1 },
            { id: 'alltheores:osmium_dust', chance: 0.3, count: 1 }
        ],
        processingTime: 200
    })

    // Osmium Dust + Oritech Sulfuric Acid -> Acid-Treated Osmium
    event.custom({
        type: 'create:mixing',
        heat_requirement: 'heated',
        ingredients: [
            { tag: 'c:dusts/osmium' },
            { 
                type: 'neoforge:single',
                fluid: 'tfmg:kerosene', 
                amount: 250 
            }
        ],
        results: [
            { id: 'kubejs:treated_osmium', count: 1 }
        ]
    })

    // Step 3 (Early Oxidation): Acid-Treated Osmium + Glowstone (Oxidizer) -> Osmium Tetroxide Powder
    event.custom({
        type: 'create:mixing',
        heat_requirement: 'heated',
        ingredients: [
            { item: 'kubejs:treated_osmium' },
            { item: 'minecraft:glowstone_dust' }
        ],
        results: [
            { id: 'kubejs:osmium_tetroxide_dust', count: 1 }
        ]
    })

    // Step 4 (Early Reduction): Osmium Tetroxide Powder + 2x Coal Dust (Carbon Reduction) -> Purified Osmium Dust
    event.custom({
        type: 'create:mixing',
        heat_requirement: 'heated',
        ingredients: [
            { item: 'kubejs:osmium_tetroxide_dust' },
            { tag: 'c:dusts/coal' },
            { tag: 'c:dusts/coal' }
        ],
        results: [
            { id: 'kubejs:purified_osmium_dust', count: 1 }
        ]
    })

    // Step 3 (Late Oxidation): Acid-Treated Osmium + Water + Oxygen -> 2x Osmium Tetroxide Powder
    event.custom({
        type: 'mekanism:reaction',
        item_input: {
            count: 1,
            item: 'kubejs:treated_osmium'
        },
        fluid_input: {
            amount: 500,
            fluid: 'minecraft:water'
        },
        chemical_input: {
            amount: 100,
            chemical: 'mekanism:oxygen'
        },
        duration: 80,
        item_output: {
            count: 2, // 2x Output!
            id: 'kubejs:osmium_tetroxide_dust'
        }
    })

    // Step 4 (Late Reduction): Osmium Tetroxide Powder + Water + Hydrogen -> 2x Purified Osmium Dust
    event.custom({
        type: 'mekanism:reaction',
        item_input: {
            count: 1,
            item: 'kubejs:osmium_tetroxide_dust'
        },
        fluid_input: {
            amount: 500,
            fluid: 'minecraft:water'
        },
        chemical_input: {
            amount: 100,
            chemical: 'mekanism:hydrogen'
        },
        duration: 80,
        item_output: {
            count: 2, // 2x Output!
            id: 'kubejs:purified_osmium_dust'
        }
    })

    // Only the chemically purified dust can be smelted into the actual usable ingot.
    event.smelting('alltheores:osmium_ingot', 'kubejs:purified_osmium_dust')
    event.blasting('alltheores:osmium_ingot', 'kubejs:purified_osmium_dust')

    event.custom({
        type: 'create:splashing',
        ingredients: [ { item: 'minecraft:gravel' } ],
        results: [
            { id: 'alltheores:osmium_nugget', chance: 0.08, count: 1 }
        ],
        processingTime: 200
    })
})
