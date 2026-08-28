ServerEvents.recipes(event => {
    event.replaceInput(
        { id: 'northstar:mechanical_crafting/rocket_controls' },
        'modern_industrialization:titanium_plate',
        'modern_industrialization:tungsten_large_plate'
    )

    event.replaceInput(
        { id: 'northstar:sequenced_assembly/circuit' },
        'alltheores:iron_plate',
        'modern_industrialization:electronic_circuit_board'
    )

    event.replaceInput(
        { id: 'northstar:mechanical_crafting/interplanetary_navigator' },
        'modern_industrialization:titanium_plate',
        'modern_industrialization:tungsten_large_plate'
    )

    event.replaceInput(
        { id: 'northstar:mechanical_crafting/interplanetary_navigator' },
        'modern_industrialization:titanium_ingot',
        'modern_industrialization:neodymium_dust'
    )
})