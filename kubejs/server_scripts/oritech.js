ServerEvents.recipes(event => {
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
            "id": "oritech:black_hole_block"
        }
        ],
            "time": 100000

    })

    // Foundry Alloying Machine Recipe
    event.remove({ output: 'oritech:foundry_block' })
    event.shaped('oritech:foundry_block', [
        'AAA',
        'ABA',
        'CDC'
    ],{
        A: 'oritech:adamant_ingot',
        B: 'oritech:motor',
        C: '#c:ingots/electrum',
        D: 'modern_industrialization:analog_circuit'
    })

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
    })

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
    })

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
    })

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
    })

    // Processing Unit
    event.replaceInput({ id: 'oritech:assembler/processingunit' }, 'minecraft:redstone', 'modern_industrialization:diode')
})