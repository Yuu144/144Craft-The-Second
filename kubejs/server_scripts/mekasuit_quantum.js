ServerEvents.recipes(event => {
    // MekaSuit
    const pieces = ['helmet', 'bodyarmor', 'pants', 'boots']
    pieces.forEach(piece => {
        event.replaceInput(
            { id: 'mekanism:mekasuit_' + piece },
            'mekanism:basic_induction_cell',
            'modern_industrialization:quantum_upgrade'
        )
    })
})
