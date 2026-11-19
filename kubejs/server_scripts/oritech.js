ServerEvents.recipes(event => {
    // Bio Generator
    event.remove({ output: 'oritech:bio_generator_block' })
    event.shaped('oritech:bio_generator_block', [
        'PFP',
        'GCG',
        'MBM'
    ], {
        P: 'modern_industrialization:steel_large_plate',
        F: 'mekanism:advanced_control_circuit',
        G: '#c:gears/steel',
        C: 'oritech:flux_gate',
        M: 'oritech:magnetic_coil',
        B: 'mekanismgenerators:bio_generator'
    }).id('144craft2:oritech/bio_generator')

    // Fuel Generator
    event.remove({ output: 'oritech:fuel_generator_block' })
    event.shaped('oritech:fuel_generator_block', [
        'PSP',
        'GLG',
        'BSH'
    ], {
        P: 'modern_industrialization:steel_large_plate',
        S: 'mekanism:hdpe_sheet',
        G: '#c:gears/steel',
        L: 'oritech:enderic_lens',
        B: 'oritech:basic_generator_block',
        H: 'modern_industrialization:hv_diesel_generator'
    }).id('144craft2:oritech/fuel_generator')

    // Reinforced Carbon Sheet
    event.remove({ id: 'oritech:refinery/carbonsheet' })
    event.custom({
        type: 'modern_industrialization:mixer',
        eu: 32,
        duration: 240,
        item_inputs: [
            { item: 'oritech:carbon_fibre_strands', amount: 4 },
            { tag: 'kubejs:deathworm_chitin', amount: 2 }
        ],
        fluid_inputs: [
            { tag: 'c:naphtha', amount: 2000 }
        ],
        item_outputs: [
            { item: 'oritech:reinforced_carbon_sheet', amount: 4 }
        ]
    }).id('144craft2:oritech/reinforced_carbon_sheet')

    // Centrifuge
    event.remove({ id: 'oritech:crafting/centrifugealt' })

    event.remove({ id: 'oritech:foundry/alloy/compat/mekanism/infused_alloy' })

    event.custom({
        "type": "oritech:particle_collision",
            "fluidInput": {
            "amount": 0,
            "fluid": "minecraft:empty"
        },
            "fluidOutputs": [],
            "ingredients": [
        {
            "tag": "allthecompressed:9x"
        },
        {
            "tag": "allthecompressed:9x"
        }
        ],
            "results": [
        {
            "count": 1,
            "id": "modern_industrialization:singularity"
        }
        ],
            "time": 100000

    }).id('144craft2:oritech/oritech/particle_collision/modern_industrialization/singularity')

    // Foundry Alloying Machine Recipe
    event.remove({ output: 'oritech:foundry_block' })
    event.shaped('oritech:foundry_block', [
        'EFE',
        'ABA',
        'CDC'
    ],{
        A: 'oritech:adamant_ingot',
        B: 'oritech:motor',
        C: '#c:ingots/electrum',
        D: 'modern_industrialization:analog_circuit',
        E: 'modern_industrialization:steel_machine_casing',
        F: 'mekanism:advanced_control_circuit'
    }).id('144craft2:oritech/minecraft/shaped/oritech/foundry_block')

    event.remove({ output: 'oritech:lava_generator_block' })
    event.shaped('oritech:lava_generator_block', [
        'AAA',
        'ABA',
        'CDC'
    ],{
        A: '#c:ingots/electrum',
        B: 'oritech:carbon_fibre_strands',
        C: '#oritech:plating',
        D: 'oritech:basic_generator_block'
    }).id('144craft2:oritech/minecraft/shaped/oritech/lava_generator_block')

    event.remove({ output: 'oritech:basic_generator_block' })
    event.shaped('oritech:basic_generator_block', [
        'AAA',
        'ABA',
        'CDC'
    ],{
        A: '#c:ingots/nickel',
        B: 'oritech:carbon_fibre_strands',
        C: 'oritech:magnetic_coil',
        D: 'minecraft:furnace'
    }).id('144craft2:oritech/minecraft/shaped/oritech/basic_generator_block')

    // Motor
    event.remove({ output: 'oritech:motor' })
    event.shaped('oritech:motor', [
        'ACA',
        'BDB',
        'BCB'
    ],{
        A: '#c:ingots/nickel',
        B: '#c:ingots/steel',
        C: 'oritech:magnetic_coil',
        D: 'mekanism:steel_casing'
    }).id('144craft2:oritech/minecraft/shaped/oritech/motor')

    // Advanced Battery
    event.remove({ id: ' oritech:motor/advbattery' })
    event.shaped(' oritech:advanced_battery', [
        ' A ',
        'BCB',
        'BCB'
    ],{
        A: '#c:plates/electrum',
        B: '#c:plates/steel',
        C: 'oritech:energite_ingot'
    }).id('144craft2:oritech/minecraft/shaped/oritech/advanced_battery')
    
    // Processing Unit
    event.replaceInput({ id: 'oritech:assembler/processingunit' }, 'minecraft:redstone', 'modern_industrialization:diode')
    
    // Oritech Cores
    event.replaceInput({ id: 'oritech:crafting/core1' }, 'minecraft:crafting_table', 'createmechanisms:wooden_mechanism')

    event.remove({ output: 'oritech:machine_core_2' })
    event.shaped('oritech:machine_core_2', ['PXP', 'GCG', 'PGP'], {
        P: '#c:plates/iron',
        G: '#c:gears/iron',
        X: 'oritech:machine_core_1',
        C: 'create:precision_mechanism'
    }).id('144craft2:oritech/basic_machine_core')

    event.remove({ output: 'oritech:machine_core_3' })
    event.shaped('oritech:machine_core_3', ['SXS', 'FCF', 'SFS'], {
        S: 'oritech:reinforced_carbon_sheet',
        F: '#c:carbon_fibre',
        X: 'oritech:machine_core_2',
        C: 'createmechanisms:advanced_precision_mechanism'
    }).id('144craft2:oritech/improved_machine_core')

    const cores = [
        { tier: 4, material: '#oritech:plating', center: 'oritech:enderic_compound' },
        { tier: 5, material: 'oritech:adamant_ingot', center: 'oritech:advanced_computing_engine' },
        { tier: 6, material: 'oritech:duratium_ingot', center: 'oritech:dubios_container' },
        { tier: 7, material: 'oritech:prometheum_ingot', center: 'oritech:superconductor' }
    ]
    cores.forEach(core => {
        const output = `oritech:machine_core_${core.tier}`
        event.remove({ output: output })
        event.shaped(output, ['SPS', 'SCS', 'SSS'], {
            S: core.material,
            P: `oritech:machine_core_${core.tier - 1}`,
            C: core.center
        }).id(`144craft2:oritech/machine_core_${core.tier}`)
    })
})