ServerEvents.recipes(event => {
    event.remove({ output: 'mekanism:alloy_infused' })
    event.custom({
        type: "mekanism:metallurgic_infusing",
        chemical_input: {
            amount: 10,
            tag: "mekanism:redstone"
        },
        item_input: {
            count: 1,
            tag: "c:ingots/bronze"
        },
        output: {
            count: 1,
            id: "mekanism:alloy_infused"
        },
        per_tick_usage: false
    })


    event.remove({ output: 'mekanism:advanced_control_circuit' })
    event.custom({
        type: "modern_industrialization:assembler",
        duration: 50,
        eu: 16,
        item_inputs: [
            {
                amount: 1,
                item: "mekanism:basic_control_circuit"
            },
            {
                amount: 2,
                item: "tfmg:transistor_item"
            },
            {
                amount: 1,
                item: "minecraft:copper_ingot"
            }
        ],
        fluid_inputs: [
            {
                fluid: "modern_industrialization:molten_redstone",
                amount: 500
            }
        ],
        item_outputs: [
            {
                amount: 1,
                item: "mekanism:advanced_control_circuit"
            }
        ]
    })
})