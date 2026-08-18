ServerEvents.recipes(event => {
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