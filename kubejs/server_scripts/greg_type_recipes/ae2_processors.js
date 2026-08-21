ServerEvents.recipes(event => {
    event.remove({ id: 'ae2:network/cells/item_storage_components_cell_64k_part' })
    event.remove({ id: 'ae2:network/cells/item_storage_components_cell_256k_part' })
    event.remove({ id: 'extendedae:crystal_assembler' })
    
    event.shaped('ae2:cell_component_64k', [
        'ABA',
        'DCD',
        'ADA'
    ], {
        A: 'minecraft:glowstone_dust',
        B: 'extendedae:concurrent_processor',
        C: 'ae2:quartz_glass',
        D: 'ae2:cell_component_16k'
    })

    event.shaped('ae2:cell_component_256k', [
        'ABA',
        'DCD',
        'ADA'
    ], {
        A: 'ae2:sky_dust',
        B: 'extendedae:concurrent_processor',
        C: 'ae2:quartz_glass',
        D: 'ae2:cell_component_64k'
    })

    event.shaped('extendedae:crystal_assembler', [
        'AFA',
        'BCB',
        'EDE'
    ], {
        A: 'extendedae:concurrent_processor',
        B: 'ae2:logic_processor',
        C: 'extendedae:machine_frame',
        D: 'ae2:sky_stone_tank',
        E: '#ae2:glass_cable',
        F: 'ae2:crafting_terminal'
    })

    event.remove({ id: 'extendedae:inscriber/concurrent_process' })
    event.custom({
        type: "modern_industrialization:circuit_assembler",
        duration: 50,
        eu: 256,
        item_inputs: [
            {
                amount: 2,
                item: "extendedae:concurrent_processor_print"
            },
            {
                amount: 2,
                item: "ae2:printed_silicon"
            },
            {
                amount: 2,
                item: "oritech:plastic_sheet"
            },
            {
                amount: 2,
                item: "tfmg:etched_circuit_board"
            }
        ],
        fluid_inputs: [
            {
                fluid: "modern_industrialization:molten_redstone",
                amount: 500
            }
        ],
        item_outputs: [
            {
                amount: 2,
                item: "extendedae:concurrent_processor"
            }
        ]
    })
})