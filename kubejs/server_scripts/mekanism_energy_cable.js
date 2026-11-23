ServerEvents.recipes(event => {
    // Basic Universal Cable
    event.remove({ id: 'mekanism:transmitter/universal_cable/basic' })
    event.shaped('8x mekanism:basic_universal_cable', [
        ' B ',
        'SWS',
        ' P '
    ], {
        S: 'alltheores:steel_plate',
        B: 'modern_industrialization:bronze_curved_plate',
        W: 'modern_industrialization:copper_wire',
        P: 'modern_industrialization:rubber_sheet'
    }).id('144craft2:mekanism/basic_universal_cable')
})
