ServerEvents.recipes(event => {
    // --- REMOVE DIRECT SMELTING/BLASTING OF RAW OSMIUM & ORES ---
    event.remove({ type: 'minecraft:smelting', input: '#c:raw_materials/osmium' })
    event.remove({ type: 'minecraft:blasting', input: '#c:raw_materials/osmium' })
    event.remove({ type: 'minecraft:smelting', input: '#c:ores/osmium' })
    event.remove({ type: 'minecraft:blasting', input: '#c:ores/osmium' })

    // --- REMOVE SMELTING/BLASTING OF REGULAR DUSTS ---
    event.remove({ type: 'minecraft:smelting', input: '#c:dusts/osmium' })
    event.remove({ type: 'minecraft:blasting', input: '#c:dusts/osmium' })

    // --- REMOVE MEKANISM ENRICHMENT CHAMBER OSMIUM RECIPES ---
    // Disables turning Raw Osmium / Osmium Ore into dust inside the Enrichment Chamber.
    event.remove({ type: 'mekanism:enriching', output: '#c:dusts/osmium' })

    // --- REMOVE ALLTHEORES ARC FURNACE OSMIUM RECIPES ---
    event.remove({ id: 'alltheores:arcfurnace/osmium/from_raw' })
    event.remove({ id: 'alltheores:arcfurnace/osmium/from_raw_block' })
    event.remove({ id: 'alltheores:arcfurnace/osmium/from_dust' })

    // --- MANUAL ORE HAMMER CRUSHING (Early Game) ---
    // 2x Raw Osmium + Hammer -> 1x ATO Osmium Dust (Hammer takes damage)
    event.shapeless('alltheores:osmium_dust', [
        '#alltheores:ore_hammers',
        '#c:raw_materials/osmium',
        '#c:raw_materials/osmium'
    ]).damageIngredient('#alltheores:ore_hammers')

    // --- STEP 1: Crushing (Create) ---
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

    // --- STEP 2: Dissolution (Create Heated Mixer) ---
    // Osmium Dust + Oritech Sulfuric Acid -> Acid-Treated Osmium
    event.custom({
        type: 'create:mixing',
        heat_requirement: 'heated',
        ingredients: [
            { tag: 'c:dusts/osmium' },
            { 
                type: 'neoforge:single',
                fluid: 'oritech:still_sulfuric_acid', 
                amount: 250 
            }
        ],
        results: [
            { id: 'kubejs:acid_treated_osmium', count: 1 }
        ]
    })


    // ==========================================================
    // = TIER 1: EARLY-GAME CREATE METHOD (Low Yield, 1x Output) =
    // ==========================================================

    // Step 3 (Early Oxidation): Acid-Treated Osmium + Glowstone (Oxidizer) -> Osmium Tetroxide Powder
    event.custom({
        type: 'create:mixing',
        heat_requirement: 'heated',
        ingredients: [
            { item: 'kubejs:acid_treated_osmium' },
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


    // ==========================================================
    // = TIER 2: LATE-GAME MEKANISM METHOD (High Yield, 2x Output) =
    // ==========================================================

    // Step 3 (Late Oxidation): Acid-Treated Osmium + Water + Oxygen -> 2x Osmium Tetroxide Powder
    event.custom({
        type: 'mekanism:reaction',
        item_input: {
            count: 1,
            item: 'kubejs:acid_treated_osmium'
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


    // --- STEP 5: Smelting/Blasting (Purified Dust -> Ingot) ---
    // Only the chemically purified dust can be smelted into the actual usable ingot.
    event.smelting('alltheores:osmium_ingot', 'kubejs:purified_osmium_dust')
    event.blasting('alltheores:osmium_ingot', 'kubejs:purified_osmium_dust')
})
