ServerEvents.recipes(event => {
    event.remove({ output: '#c:ingots/steel' })
    event.remove({ output: '#c:dusts/steel' })
    event.remove({ output: '#c:dusts/coal' })
    event.remove({ type: 'alltheores:alloy_smelting', output: 'alltheores:steel_ingot' })
    event.remove({ id: 'alltheores:alloy_smelting/steel_ingot' })
    event.remove({ id: 'oritech:compat/enderio/alloy/steel' })
    event.remove({ id: 'tfmg:industrial_blasting/steel' })
    event.remove({ id: 'tfmg:industrial_blasting/steel_from_dust' })
    event.remove({ id: 'tfmg:industrial_blasting/steel_from_raw_iron' })
    event.remove({ id: 'tfmg:vat_machine_recipe/arc_furnace_steel' })
        
    // Explicitly remove all recipes for alternative coal dusts to prevent bypasses
    event.remove({ output: 'enderio:powdered_coal' })
    event.remove({ output: 'oritech:coal_dust' })

    // Coal Dust
    event.custom({
        type: 'create:crushing',
        ingredients: [{ item: 'minecraft:coal' }],
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
            { tag: 'c:dusts/coal' }
        ],
        results: [{ id: 'kubejs:pig_iron_ingot', count: 1 }]
    })

    // Molten Steel
    event.custom({
        type: 'tfmg:industrial_blasting',
        hot_air_usage: 20,
        ingredients: [
            {
                item: 'kubejs:pig_iron_ingot'
            },
            {
                tag: 'tfmg:flux'
            }
        ],
        processing_time: 30,
        results: [
            {
                amount: 250,
                id: 'tfmg:molten_steel'
            },
            {
                amount: 250,
                id: 'tfmg:molten_slag'
            },
            {
                amount: 200,
                id: 'tfmg:furnace_gas'
            }
        ]
    })

    // Molten Steel Tier II
    event.custom({
        type: 'tfmg:vat_machine_recipe',
        allowed_vat_types: [
            'tfmg:firebrick_lined_vat'
        ],
        ingredients: [
            {
                item: 'kubejs:pig_iron_ingot'
            },
            {
                tag: 'tfmg:flux'
            }
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
                chance: 0.9,
                id: 'tfmg:coal_coke_dust'
            },
            {
                amount: 350,
                id: 'tfmg:molten_steel'
            },
            {
                amount: 350,
                id: 'tfmg:molten_slag'
            }
        ]
    })

    // Unforged Steel Ingot
    event.custom({
        type: 'create:compacting',
        ingredients: [
            { 
                type: 'neoforge:single',
                fluid: 'tfmg:molten_steel',
                amount: 250 
            }
        ],
        results: [{ id: 'kubejs:unforged_steel_ingot', count: 1 }]
    })

    // Steel Ingot (Output changed to AllTheOres Steel Ingot)
    event.custom({
        type: 'create:pressing',
        ingredients: [{ item: 'kubejs:unforged_steel_ingot' }],
        results: [{ id: 'alltheores:steel_ingot', count: 1 }]
    })

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

    event.smelting('alltheores:steel_ingot', 'mekanism:dust_steel')
    event.blasting('alltheores:steel_ingot', 'mekanism:dust_steel')
})
