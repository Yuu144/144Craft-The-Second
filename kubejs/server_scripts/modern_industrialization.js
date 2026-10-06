ServerEvents.recipes(event => {
    event.remove({ id: 'modern_industrialization:electric_age/component/implosion_compressor/singularity' })
    event.remove({ id: 'create:kjs/mekanism_dust_coal_mekanism_dust_coal' })

    event.custom({
        "type": "create:crushing",
        "ingredients": [
            {
            "item": "minecraft:coal"
            }
        ],
        "processing_time": 150,
        "results": [
            {
            "id": "mekanism:dust_coal"
            },
            {
            "chance": 0.5,
            "id": "mekanism:dust_coal"
            },
            {
            "chance": 0.5,
            "id": "modern_industrialization:carbon_dust"
            },
        ]
    })
})
