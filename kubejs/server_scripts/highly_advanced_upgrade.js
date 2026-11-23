ServerEvents.recipes(event => {
    // Highly Advanced Upgrade
    event.remove({ output: 'modern_industrialization:highly_advanced_upgrade' })
    event.custom({
        type: 'modern_industrialization:assembler',
        duration: 400,
        eu: 32,
        item_inputs: [
            { item: 'modern_industrialization:large_advanced_motor', amount: 8 },
            { item: 'modern_industrialization:large_advanced_pump', amount: 4 },
            { item: 'modern_industrialization:turbo_upgrade', amount: 4 },
            { item: 'modern_industrialization:processing_unit_board', amount: 1 },
            { item: 'ad_astra:ostrum_plate', amount: 8 }
        ],
        fluid_inputs: [{ fluid: 'modern_industrialization:polyvinyl_chloride', amount: 2500 }],
        item_outputs: [{ item: 'modern_industrialization:highly_advanced_upgrade', amount: 4 }]
    }).id('144craft2:highly_advanced_upgrade')
})
