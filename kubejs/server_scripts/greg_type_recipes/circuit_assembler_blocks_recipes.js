ServerEvents.recipes(event => {
    event.shaped('kubejs:circuit_assembler_frame', [
        ' A ',
        'BCB',
        ' A '
    ], {
        A: 'modern_industrialization:steel_large_plate',
        B: 'modern_industrialization:steel_bolt',
        C: 'modern_industrialization:steel_machine_casing_pipe'
    }).id('144craft2:greg_type_recipes/circuit_assembler_blocks_recipes/minecraft/shaped/kubejs/circuit_assembler_frame')

    event.shaped('kubejs:circuit_assembler_casing', [
        ' A ',
        'CBC',
        ' A '
    ], {
        A: 'modern_industrialization:carbon_large_plate',
        B: 'mekanism:steel_casing',
        C: 'oritech:reinforced_carbon_sheet'
    }).id('144craft2:greg_type_recipes/circuit_assembler_blocks_recipes/minecraft/shaped/kubejs/circuit_assembler_casing')
})
