ServerEvents.recipes(event => {
    // Control Rod Assembly
    event.remove({ id: 'mekanismgenerators:fission_reactor/control_rod_assembly' })
    event.shaped('mekanismgenerators:control_rod_assembly', [
        'LCL',
        'GMG',
        'LAL'
    ], {
        L: 'alltheores:lead_plate',
        C: '#c:circuits/elite',
        G: 'alltheores:steel_gear',
        M: 'modern_industrialization:large_motor',
        A: 'bigreactors:blutonium_block'
    }).id('144craft2:fission_control_rod')

    // Fission Reactor Casing
    event.remove({ id: 'mekanismgenerators:fission_reactor/casing' })
    event.shaped('4x mekanismgenerators:fission_reactor_casing', [
        'OLO',
        'LCL',
        'OLO'
    ], {
        O: 'ad_astra:ostrum_plate',
        L: '#c:ingots/lead',
        C: 'mekanism:steel_casing'
    }).id('144craft2:fission_reactor_casing')
})
