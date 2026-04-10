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

    event.shaped('create:windmill_bearing', [
        ' A ',
        ' B ',
        ' C '
    ], {
        A: '#minecraft:wooden_slabs',
        B: 'create:andesite_casing',
        C: 'create:shaft'
    })

})