ServerEvents.recipes(event => {
    
    event.remove({ output: 'dndesires:hydraulic_press' })

    event.shaped('dndesires:hydraulic_press', [
        ' A ',
        ' B ',
        ' C '
    ], {
        A: 'create_sa:hydraulic_engine',
        B: 'create:mechanical_press',
        C: 'allthecompressed:copper_block_1x'
    })

})