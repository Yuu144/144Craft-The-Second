ServerEvents.recipes(event => {
    event.remove({ id: 'modern_industrialization:electric_age/machine/fusion_reactor_asbl' })
    event.shaped('modern_industrialization:fusion_reactor', [
        'AAA',
        'BCB',
        'AAA'
    ], {
        A: 'bigreactors:ridiculite_block',
        B: 'modern_industrialization:quantum_circuit',
        C: 'modern_industrialization:quantum_machine_hull'
    })

    event.remove({ id: 'modern_industrialization:electric_age/hull/highly_advanced_machine_hull_asbl' })
    event.shaped('modern_industrialization:highly_advanced_machine_hull', [
        ' A ',
        'BCB',
        'DED'
    ], {
        A: 'modern_industrialization:processing_unit',
        B: 'modern_industrialization:cadmium_battery',
        C: 'modern_industrialization:highly_advanced_machine_casing',
        D: 'modern_industrialization:annealed_copper_cable',
        E: 'mekanism:ultimate_control_circuit'
    })
})
