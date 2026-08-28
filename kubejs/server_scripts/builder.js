ServerEvents.recipes(event => {
    event.remove({ id: 'rftoolsbuilder:builder' })
    event.shaped('rftoolsbuilder:builder', [
        'BAB',
        'CDC',
        'EFE'
    ],{
        A: 'kubejs:larp_crystal',
        B: 'modern_industrialization:electronic_circuit',
        C: 'draconicevolution:draconium_ingot',
        D: 'industrialforegoing:machine_frame_simple',
        E: 'oritech:motor',
        F: 'minecraft:netherite_block'
    })  
})
