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
            "item": "kubejs:larp_crystal"
        },
        {
            "item": "kubejs:larp_crystal"
        }
        ],
            "results": [
        {
            "count": 1,
            "id": "kubejs:144_ium"
        }
        ],
            "time": 15000

    })

})