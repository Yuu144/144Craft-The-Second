ServerEvents.recipes(event => {
    // Analog Circuit Board
    event.remove({ id: 'modern_industrialization:electric_age/circuit/craft/lv_circuit_board_asbl' })

    const incomplete = 'alltheores:copper_plate'
    const deploy = item => ({
        type: 'create:deploying',
        ingredients: [{ item: incomplete }, item],
        results: [{ id: incomplete }]
    })

    event.custom({
        type: 'create:sequenced_assembly',
        ingredient: { tag: 'c:plates/copper' },
        transitional_item: { id: incomplete },
        loops: 1,
        sequence: [
            deploy({ item: 'modern_industrialization:rubber_sheet' }),
            deploy({ item: 'modern_industrialization:rubber_sheet' }),
            deploy({ item: 'modern_industrialization:copper_wire' }),
            deploy({ tag: 'c:dusts/redstone' }),
            {
                type: 'create:pressing',
                ingredients: [{ item: incomplete }],
                results: [{ id: incomplete }]
            }
        ],
        results: [{ id: 'modern_industrialization:analog_circuit_board' }]
    }).id('144craft2:analog_circuit_board/create/sequenced_assembly')
})
