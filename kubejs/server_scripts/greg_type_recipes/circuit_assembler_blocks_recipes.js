ServerEvents.recipes(event => {
    event.shaped('kubejs:circuit_assembler_frame', [
        'BAB',
        'ACA',
        'BAB'
    ], {
        A: 'modern_industrialization:stainless_steel_bolt',
        B: 'modern_industrialization:stainless_steel_large_plate',
        C: 'modern_industrialization:stainless_steel_machine_casing_pipe'
    }).id('144craft2:greg_type_recipes/circuit_assembler_blocks_recipes/minecraft/shaped/kubejs/circuit_assembler_frame')

    event.shaped('kubejs:circuit_assembler_casing', [
        ' A ',
        'ABA',
        ' A '
    ], {
        A: 'modern_industrialization:carbon_large_plate',
        B: 'mekanism:steel_casing'
    }).id('144craft2:greg_type_recipes/circuit_assembler_blocks_recipes/minecraft/shaped/kubejs/circuit_assembler_casing')
})