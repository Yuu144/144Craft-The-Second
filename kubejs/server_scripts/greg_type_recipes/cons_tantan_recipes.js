ServerEvents.recipes(event => {

    event.remove({ id: 'alltheores:crafting/constantan/plate' })
    event.remove({ id: 'tfmg:mixing/constantan' })
    event.remove({ output: '#c:ingots/constantan' })
    event.remove({ output: '#c:dusts/constantan' })
    event.remove({ id: 'alltheores:sag_milling/constantan/ingot' })
    event.remove({ id: 'alltheores:alloy_smelting/constantan_ingot' })
    event.remove({ id: 'create:crushing/crimsite' })
    event.remove({ id: 'create:crushing/crimsite_recycling' })

    // Manganese recipe
    event.custom({
        type: 'create:crushing',
        ingredients: [ { item: 'create:crimsite' } ],
        results: [
            { id: 'kubejs:manganese', count: 1 },
            { id: 'create:crushed_raw_iron', chance: 0.3, count: 1 },
            { id: 'minecraft:iron_nugget', chance: 0.3, count: 1 }
        ],
        processingTime: 200
    })

    //Molten Cons Tan Tan
    event.custom({
        type: 'create:mixing',
        heat_requirement: 'heated',
        ingredients: [
            { item: 'kubejs:manganese' },
            { 
                type: 'neoforge:single',
                fluid: 'alltheores:molten_copper', 
                amount: 250 
            },
                        { 
                type: 'neoforge:single',
                fluid: 'alltheores:molten_nickel', 
                amount: 250 
            }
        ],
        results: [
            {  
                amount: 250,  
                id: 'alltheores:molten_constantan' 
            }
        ]
    })

    //Cons Tan Tan Ingot
    event.custom({
        type: 'tfmg:casting',
        ingredients: [
            {
                type: 'neoforge:single',
                amount: 250,
                fluid: 'alltheores:molten_constantan'
            }
        ],
        processing_time: 200,
        results: [
            { id: 'alltheores:constantan_ingot' }
        ]
    })

    //Molten Copper T1
    event.custom({
        type: 'tfmg:industrial_blasting',
        hot_air_usage: 15,
        ingredients: [
            {
                item: 'minecraft:copper_ingot'
            },
            {
                tag: 'tfmg:flux'
            }
        ],
        processing_time: 30,
        results: [
            {
                amount: 250,
                id: 'alltheores:molten_copper'
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

    //Molten Nickel T1
    event.custom({
        type: 'tfmg:industrial_blasting',
        hot_air_usage: 20,
        ingredients: [
            {
                item: 'alltheores:nickel_ingot'
            },
            {
                tag: 'tfmg:flux'
            }
        ],
        processing_time: 30,
        results: [
            {
                amount: 250,
                id: 'alltheores:molten_nickel'
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

    //Molten Copper T2
    event.custom({
        type: 'tfmg:vat_machine_recipe',
        allowed_vat_types: [
            'tfmg:firebrick_lined_vat'
        ],
        ingredients: [
            { item: 'minecraft:copper_ingot' },
            { item: 'minecraft:copper_ingot' }
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
                id: 'alltheores:molten_copper'
            },
            {
                amount: 350,
                id: 'tfmg:molten_slag'
            }
        ]
    })

    //Molten Nickel T2
    event.custom({
        type: 'tfmg:vat_machine_recipe',
        allowed_vat_types: [
            'tfmg:firebrick_lined_vat'
        ],
        ingredients: [
            { item: 'alltheores:nickel_ingot' },
            { item: 'alltheores:nickel_ingot' }
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
                id: 'alltheores:molten_nickel'
            },
            {
                amount: 350,
                id: 'tfmg:molten_slag'
            }
        ]
    })
})
