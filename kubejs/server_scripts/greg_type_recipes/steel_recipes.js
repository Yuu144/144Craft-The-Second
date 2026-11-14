ServerEvents.recipes(event => {
    event.remove({ output: '#c:ingots/steel' })
    event.remove({ output: '#c:dusts/steel' })
    event.remove({ type: 'alltheores:alloy_smelting', output: 'alltheores:steel_ingot' })
    event.remove({ id: 'alltheores:alloy_smelting/steel_ingot' })
    event.remove({ id: 'oritech:compat/enderio/alloy/steel' })
    event.remove({ id: 'tfmg:industrial_blasting/steel' })
    event.remove({ id: 'tfmg:industrial_blasting/steel_from_dust' })
    event.remove({ id: 'tfmg:industrial_blasting/steel_from_raw_iron' })
    event.remove({ id: 'tfmg:vat_machine_recipe/arc_furnace_steel' })
    event.remove({ output: 'oritech:coal_dust' })

    event.remove({ id: 'create:crushing/coal_coke' })
    event.custom({
        type: 'create:crushing',
        ingredients: [{ item: 'modern_industrialization:coke' }],
        results: [
            { id: 'tfmg:coal_coke_dust', count: 1 }
        ],
        processingTime: 250
    }).id('144craft2:greg_type_recipes/steel_recipes/create/crushing/tfmg/coal_coke_dust')

    // Coal Dust
    event.custom({
        type: 'create:crushing',
        ingredients: [{ item: 'minecraft:coal' }],
        results: [
            { id: 'mekanism:dust_coal', count: 1 },
            { id: 'mekanism:dust_coal', chance: 0.5, count: 1 }
        ],
        processingTime: 250
    }).id('144craft2:greg_type_recipes/steel_recipes/create/crushing/mekanism/dust_coal')

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
    }).id('144craft2:greg_type_recipes/steel_recipes/create/mixing/kubejs/pig_iron_ingot')

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
    }).id('144craft2:greg_type_recipes/steel_recipes/tfmg/industrial_blasting/tfmg/molten_steel')

    // Molten Steel Tier II
    event.custom({
        type: 'tfmg:vat_machine_recipe',
        allowed_vat_types: [
            'tfmg:firebrick_lined_vat'
        ],
        ingredients: [
            { tag: 'c:ingots/iron' },
            { tag: 'c:ingots/iron' },
            { tag: 'c:dusts/coal' },
            { tag: 'c:dusts/coal' }
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
                amount: 500,
                id: 'tfmg:molten_steel'
            },
            {
                amount: 350,
                id: 'tfmg:molten_slag'
            }
        ]
    }).id('144craft2:greg_type_recipes/steel_recipes/tfmg/vat_machine_recipe/tfmg/coal_coke_dust')

    // Unforged Steel Ingot
    event.custom({
        type: 'tfmg:casting',
        ingredients: [
            {
                type: 'neoforge:single',
                amount: 250,
                fluid: 'tfmg:molten_steel'
            }
        ],
        processing_time: 200,
        results: [
            { id: 'kubejs:unforged_steel_ingot' }
        ]
    }).id('144craft2:greg_type_recipes/steel_recipes/tfmg/casting/kubejs/unforged_steel_ingot')

    // Steel Ingot (Output changed to AllTheOres Steel Ingot)
    event.custom({
        type: 'create:pressing',
        ingredients: [{ item: 'kubejs:unforged_steel_ingot' }],
        results: [{ id: 'alltheores:steel_ingot', count: 1 }]
    }).id('144craft2:greg_type_recipes/steel_recipes/create/pressing/alltheores/steel_ingot')

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
    }).id('144craft2:greg_type_recipes/steel_recipes/mekanism/reaction/mekanism/dust_steel')

    event.smelting('alltheores:steel_ingot', 'mekanism:dust_steel').id('144craft2:greg_type_recipes/steel_recipes/minecraft/smelting/alltheores/steel_ingot')
    event.blasting('alltheores:steel_ingot', 'mekanism:dust_steel').id('144craft2:greg_type_recipes/steel_recipes/minecraft/blasting/alltheores/steel_ingot')

    event.remove({ id: 'modern_industrialization:steam_age/steel/machine_casing_asbl' })
    event.shaped('modern_industrialization:steel_machine_casing', [
        'AAA',
        'ABA',
        'AAA'
    ], {
        A: 'alltheores:steel_plate',
        B: 'mekanism:steel_casing'
    }).id('144craft2:greg_type_recipes/steel_recipes/minecraft/shaped/modern_industrialization/steel_machine_casing')
})
