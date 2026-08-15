ServerEvents.recipes(event => {

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
        A: 'minecraft:copper_ingot',
        B: 'oritech:motor',
        C: '#c:ingots/electrum',
        D: 'tfmg:circuit_board'
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
})