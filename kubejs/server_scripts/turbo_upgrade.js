ServerEvents.recipes(event => {
    // Turbo Upgrade
    event.remove({ output: 'modern_industrialization:turbo_upgrade' })
    event.custom({
        type: 'modern_industrialization:assembler',
        duration: 400,
        eu: 16,
        item_inputs: [
            { item: 'modern_industrialization:advanced_motor', amount: 16 },
            { item: 'modern_industrialization:advanced_pump', amount: 2 },
            { item: 'modern_industrialization:advanced_upgrade', amount: 4 },
            { item: 'modern_industrialization:digital_circuit_board', amount: 1 },
            { item: 'ad_astra:desh_plate', amount: 8 }
        ],
        fluid_inputs: [{ fluid: 'modern_industrialization:polyvinyl_chloride', amount: 1000 }],
        item_outputs: [{ item: 'modern_industrialization:turbo_upgrade', amount: 4 }]
    }).id('144craft2:turbo_upgrade')
})
