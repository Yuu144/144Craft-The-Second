ServerEvents.recipes(event => {
    // Circuit Assembler
    event.shaped('modern_industrialization:circuit_assembler', [
        'PCP',
        'RAR',
        'GCG'
    ], {
        P: 'modern_industrialization:steel_large_plate',
        C: 'mekanism:basic_control_circuit',
        R: 'modern_industrialization:robot_arm',
        A: 'modern_industrialization:assembler',
        G: 'alltheores:steel_gear'
    }).id('144craft2:circuit_assembler_controller')

    event.shaped('kubejs:circuit_assembler_frame', [
        ' A ',
        'B B',
        ' A '
    ], {
        A: 'modern_industrialization:steel_large_plate',
        B: 'modern_industrialization:steel_bolt'
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