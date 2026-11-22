ServerEvents.recipes(event => {
    // Quantum Upgrade
    event.remove({ output: 'modern_industrialization:quantum_upgrade' })
    event.custom({
        type: 'modern_industrialization:assembler',
        duration: 1000,
        eu: 32,
        item_inputs: [
            { item: 'modern_industrialization:highly_advanced_upgrade', amount: 32 },
            { item: 'modern_industrialization:quantum_circuit', amount: 8 },
            { item: 'modern_industrialization:quantum_circuit_board', amount: 1 },
            { item: 'mekanism:pellet_antimatter', amount: 1 },
            { item: 'mekanism:pellet_plutonium', amount: 12 },
            { item: 'mekanism:pellet_polonium', amount: 8 }
        ],
        fluid_inputs: [{ fluid: 'modern_industrialization:uu_matter', amount: 50 }],
        item_outputs: [{ item: 'modern_industrialization:quantum_upgrade', amount: 1 }]
    }).id('144craft2:quantum_upgrade')
})
