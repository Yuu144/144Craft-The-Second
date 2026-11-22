ServerEvents.recipes(event => {
    // 1K Storage Component
    event.remove({ id: 'ae2:network/cells/item_storage_components_cell_1k_part' })
    event.shaped('ae2:cell_component_1k', [
        'WCW',
        'FLF',
        ' C '
    ], {
        W: 'modern_industrialization:copper_wire',
        C: 'ae2:printed_calculation_processor',
        F: 'ae2:quartz_fiber',
        L: 'ae2:logic_processor'
    }).id('144craft2:greg_type_recipes/ae2_processors/minecraft/shaped/ae2/cell_component_1k')

    // 4K Storage Component
    event.remove({ id: 'ae2:network/cells/item_storage_components_cell_4k_part' })
    event.shaped('ae2:cell_component_4k', [
        'PBP',
        'LGL',
        ' L '
    ], {
        P: 'modern_industrialization:capacitor',
        B: 'ae2:calculation_processor',
        L: 'ae2:cell_component_1k',
        G: 'ae2:quartz_glass'
    }).id('144craft2:greg_type_recipes/ae2_processors/minecraft/shaped/ae2/cell_component_4k')

    // 16K Storage Component
    event.remove({ id: 'ae2:network/cells/item_storage_components_cell_16k_part' })
    event.shaped('ae2:cell_component_16k', [
        'BEB',
        'LGL',
        ' L '
    ], {
        B: 'modern_industrialization:analog_circuit_board',
        E: 'ae2:engineering_processor',
        L: 'ae2:cell_component_4k',
        G: 'ae2:quartz_glass'
    }).id('144craft2:greg_type_recipes/ae2_processors/minecraft/shaped/ae2/cell_component_16k')

    // 64K Storage Component
    event.remove({ id: 'ae2:network/cells/item_storage_components_cell_64k_part' })
    event.shaped('ae2:cell_component_64k', [
        'BCB',
        'LHL',
        'PLP'
    ], {
        B: 'modern_industrialization:electronic_circuit_board',
        C: 'extendedae:concurrent_processor',
        L: 'ae2:cell_component_16k',
        H: 'mekanism:hdpe_sheet',
        P: 'oritech:plastic_sheet'
    }).id('144craft2:greg_type_recipes/ae2_processors/minecraft/shaped/ae2/cell_component_64k')

    // 256K Storage Component
    event.remove({ id: 'ae2:network/cells/item_storage_components_cell_256k_part' })
    event.shaped('ae2:cell_component_256k', [
        'BCB',
        'LGL',
        'RLR'
    ], {
        B: 'modern_industrialization:digital_circuit_board',
        C: 'extendedae:concurrent_processor',
        L: 'ae2:cell_component_64k',
        G: 'ae2:quartz_vibrant_glass',
        R: 'mekanism:hdpe_rod'
    }).id('144craft2:greg_type_recipes/ae2_processors/minecraft/shaped/ae2/cell_component_256k')

    // 1M Storage Component
    event.remove({ id: 'megacells:cells/cell_component_1m' })
    event.shaped('megacells:cell_component_1m', [
        'DAD',
        'LGL',
        ' G '
    ], {
        D: 'modern_industrialization:digital_circuit',
        A: 'megacells:accumulation_processor',
        L: 'ae2:cell_component_256k',
        G: 'ae2:quartz_vibrant_glass'
    }).id('144craft2:greg_type_recipes/ae2_processors/minecraft/shaped/megacells/cell_component_1m')

    // 4M Storage Component
    event.remove({ id: 'megacells:cells/cell_component_4m' })
    event.shaped('megacells:cell_component_4m', [
        'BAB',
        'LTL',
        'P P'
    ], {
        B: 'modern_industrialization:digital_circuit_board',
        A: 'megacells:accumulation_processor',
        L: 'megacells:cell_component_1m',
        T: 'kubejs:energized_superconducting_titanium_larp_alloy',
        P: 'oritech:plastic_sheet'
    }).id('144craft2:greg_type_recipes/ae2_processors/minecraft/shaped/megacells/cell_component_4m')

    // 16M Storage Component
    event.remove({ id: 'megacells:cells/cell_component_16m' })
    event.shaped('megacells:cell_component_16m', [
        'PAP',
        'LQL',
        ' G '
    ], {
        P: 'modern_industrialization:capacitor',
        A: 'megacells:accumulation_processor',
        L: 'megacells:cell_component_4m',
        Q: 'modern_industrialization:quantum_circuit_board',
        G: 'ae2:quartz_vibrant_glass'
    }).id('144craft2:greg_type_recipes/ae2_processors/minecraft/shaped/megacells/cell_component_16m')

    // 64M Storage Component
    event.remove({ id: 'megacells:cells/cell_component_64m' })
    event.shaped('megacells:cell_component_64m', [
        'AGA',
        'LQL',
        ' G '
    ], {
        A: 'megacells:accumulation_processor',
        G: 'ae2:quartz_vibrant_glass',
        L: 'megacells:cell_component_16m',
        Q: 'modern_industrialization:quantum_circuit'
    }).id('144craft2:greg_type_recipes/ae2_processors/minecraft/shaped/megacells/cell_component_64m')

    // 256M Storage Component
    event.remove({ id: 'megacells:cells/cell_component_256m' })
    event.shaped('megacells:cell_component_256m', [
        'AQA',
        'LIL',
        ' T '
    ], {
        A: 'megacells:accumulation_processor',
        Q: 'modern_industrialization:quantum_circuit',
        L: 'megacells:cell_component_64m',
        I: 'oritech:super_ai_chip',
        T: 'kubejs:energized_superconducting_titanium_larp_alloy'
    }).id('144craft2:greg_type_recipes/ae2_processors/minecraft/shaped/megacells/cell_component_256m')

    event.remove({ id: 'extendedae:crystal_assembler' })
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
    }).id('144craft2:greg_type_recipes/ae2_processors/minecraft/shaped/extendedae/crystal_assembler')

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
    }).id('144craft2:greg_type_recipes/ae2_processors/modern_industrialization/circuit_assembler/extendedae/concurrent_processor')

    event.remove({ id: 'megacells:inscriber/accumulation_processor' })
    event.remove({ id: 'extendedae:assembler/accumulation_processor' })
    event.custom({
        type: "modern_industrialization:circuit_assembler",
        duration: 50,
        eu: 256,
        item_inputs: [
            {
                amount: 4,
                item: "megacells:printed_accumulation_processor"
            },
            {
                amount: 4,
                item: "ae2:printed_silicon"
            },
            {
                amount: 4,
                item: "ae2:fluix_dust"
            }
        ],
        fluid_inputs: [
            {
                fluid: "modern_industrialization:platinum_sulfuric_solution",
                amount: 4000
            }
        ],
        item_outputs: [
            {
                amount: 4,
                item: "megacells:accumulation_processor"
            }
        ]
    }).id('144craft2:greg_type_recipes/ae2_processors/modern_industrialization/circuit_assembler/megacells/accumulation_processor')
})
