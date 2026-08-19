ServerEvents.recipes(event => {
    event.remove({ id: 'oritech:atomicforge/compat/mekanism/basic_control_circuit' })
    event.remove({ id: 'oritech:atomicforge/compat/mekanism/advanced_control_circuit' })
    event.remove({ id: 'oritech:atomicforge/compat/mekanism/elite_control_circuit' })
    event.remove({ id: 'oritech:atomicforge/compat/mekanism/ultimate_control_circuit' })

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

    event.custom({
        type: "oritech:foundry",
        ingredients: [
            {
                tag: "c:ingots/bronze"
            },
            {
                tag: "c:dusts/redstone"
            }
        ],
        results: [
            {
                count: 1,
                id: "mekanism:alloy_infused"
            }
        ],
        time: 80
    })

    event.remove({ output: 'mekanism:basic_control_circuit' })
    event.custom({
        type: "modern_industrialization:circuit_assembler",
        duration: 50,
        eu: 16,
        item_inputs: [
            {
                amount: 2,
                item: "tfmg:capacitor_item"
            },
            {
                amount: 1,
                tag: "c:ingots/osmium"
            }
        ],
        fluid_inputs: [
            {
                fluid: "modern_industrialization:molten_redstone",
                amount: 250
            }
        ],
        item_outputs: [
            {
                amount: 1,
                item: "mekanism:basic_control_circuit"
            }
        ]
    })

    event.remove({ output: 'mekanism:advanced_control_circuit' })
    event.custom({
        type: "modern_industrialization:circuit_assembler",
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
                tag: "c:ingots/bronze"
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

    event.remove({ output: 'mekanism:elite_control_circuit' })
    event.custom({
        type: "modern_industrialization:circuit_assembler",
        duration: 50,
        eu: 16,
        item_inputs: [
            {
                amount: 1,
                item: "mekanism:advanced_control_circuit"
            },
            {
                amount: 2,
                item: "modern_industrialization:diode"
            },
            {
                amount: 3,
                tag: "c:ingots/electrum"
            },
            {
                amount: 3,
                tag: "c:ingots/signalum"
            },
            {
                amount: 2,
                item: "modern_industrialization:op_amp"
            },
            {
                amount: 1,
                item: "modern_industrialization:electronic_circuit_board"
            }
        ],
        fluid_inputs: [
            {
                fluid: "modern_industrialization:hydrochloric_acid",
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
