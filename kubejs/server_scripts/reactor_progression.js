ServerEvents.recipes(event => {
    // Reinforced Reactor Controller
    event.remove({ id: 'bigreactors:reactor/reinforced/controller_ingots_uranium' })
    event.shaped('bigreactors:reinforced_reactorcontroller', [
        'CTC',
        'YDY',
        'HRH'
    ], {
        C: 'bigreactors:reinforced_reactorcasing',
        T: 'modern_industrialization:titanium_large_plate',
        Y: '#c:ingots/uranium',
        D: '#c:storage_blocks/diamond',
        H: 'mekanism:hdpe_sheet',
        R: '#c:dusts/redstone'
    }).id('144craft2:bigreactors/reinforced/controller_ingots_uranium')

    // Reinforced Reactor Casing
    event.remove({ id: 'bigreactors:reactor/reinforced/casing' })
    event.shaped('bigreactors:reinforced_reactorcasing', [
        'ITI',
        'GCG',
        'IHI'
    ], {
        I: '#c:ingots/steel',
        G: '#c:ingots/graphite',
        C: '#c:storage_blocks/iron',
        T: 'modern_industrialization:titanium_plate',
        H: 'mekanism:hdpe_sheet'
    }).id('144craft2:bigreactors/reinforced/casing')
})
