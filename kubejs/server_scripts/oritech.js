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

})