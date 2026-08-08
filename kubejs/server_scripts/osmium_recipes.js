ServerEvents.recipes(event => {
    event.remove({ type: 'minecraft:smelting', input: '#c:raw_materials/osmium' })
    event.remove({ type: 'minecraft:blasting', input: '#c:raw_materials/osmium' })
    event.remove({ type: 'minecraft:smelting', input: '#c:ores/osmium' })
    event.remove({ type: 'minecraft:blasting', input: '#c:ores/osmium' })
    event.remove({ type: 'minecraft:smelting', input: '#c:dusts/osmium' })
    event.remove({ type: 'minecraft:blasting', input: '#c:dusts/osmium' })

    event.custom({
        type: 'create:crushing',
        ingredients: [ { tag: 'c:raw_materials/osmium' } ],
        results: [
            { id: 'mekanism:dust_osmium', count: 1 },
            { id: 'mekanism:dust_osmium', chance: 0.3, count: 1 }
        ],
        processingTime: 200
    })

    event.custom({
        type: 'create:mixing',
        heat_requirement: 'heated',
        ingredients: [
            { tag: 'c:dusts/osmium' },
            { fluid: 'oritech:sulfuric_acid', amount: 250 }
        ],
        results: [
            { id: 'kubejs:acid_treated_osmium', count: 1 }
        ]
    })

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
            count: 1,
            id: 'kubejs:osmium_tetroxide_dust'
        }
    })

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
            count: 1,
            id: 'kubejs:purified_osmium_dust'
        }
    })

    event.smelting('alltheores:osmium_ingot', 'kubejs:purified_osmium_dust')
    event.blasting('alltheores:osmium_ingot', 'kubejs:purified_osmium_dust')
})
