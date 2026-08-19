ServerEvents.recipes(event => {
    event.remove({ id: 'modern_industrialization:oil/crude_oil' })
    event.remove({ id: 'modern_industrialization:oil/shale_oil' })
    event.remove({ id: 'modern_industrialization:petrochem/distillation/crude_oil_full' })
    event.remove({ id: 'modern_industrialization:petrochem/distillation/crude_oil_0' })
    event.remove({ id: 'modern_industrialization:petrochem/distillation/crude_oil_1' })
    event.remove({ id: 'modern_industrialization:petrochem/distillation/crude_oil_2' })

    event.custom({
        type: "modern_industrialization:distillery",
        duration: 200,
        eu: 12,
        fluid_inputs: [
            {
                amount: 1000,
                fluid: "tfmg:heavy_oil"
            }
        ],
        fluid_outputs: [
            {
                amount: 500,
                fluid: "modern_industrialization:sulfuric_light_fuel"
            }
        ]
    })

    event.custom({
        type: "modern_industrialization:distillery",
        duration: 200,
        eu: 12,
        fluid_inputs: [
            {
                amount: 1000,
                fluid: "tfmg:heavy_oil"
            }
        ],
        fluid_outputs: [
            {
                amount: 200,
                fluid: "modern_industrialization:sulfuric_heavy_fuel"
            }
        ]
    })

    event.custom({
        type: "modern_industrialization:distillery",
        duration: 200,
        eu: 12,
        fluid_inputs: [
            {
                amount: 1000,
                fluid: "tfmg:heavy_oil"
            }
        ],
        fluid_outputs: [
            {
                amount: 300,
                fluid: "modern_industrialization:sulfuric_naphtha"
            }
        ]
    })

    event.custom({
        type: "modern_industrialization:distillation_tower",
        duration: 200,
        eu: 36,
        fluid_inputs: [
            {
                amount: 1000,
                fluid: "tfmg:heavy_oil"
            }
        ],
        fluid_outputs: [
            {
                amount: 500,
                fluid: "modern_industrialization:sulfuric_light_fuel"
            },
            {
                amount: 200,
                fluid: "modern_industrialization:sulfuric_heavy_fuel"
            },
            {
                amount: 300,
                fluid: "modern_industrialization:sulfuric_naphtha"
            }
        ]
    })

    event.remove({ id: 'tfmg:hot_blast/hot_air' })
    event.custom({
        type: "tfmg:hot_blast",
        ingredients: [
            {
                type: "neoforge:single",
                amount: 25,
                fluid: "tfmg:air"
            },
            {
                type: "neoforge:single",
                amount: 5,
                fluid: "modern_industrialization:creosote"
            }
        ],
        processing_time: 200,
        results: [
            {
                amount: 25,
                id: "tfmg:hot_air"
            },
            {
                amount: 25,
                id: "tfmg:carbon_dioxide"
            }
        ]
    })

    event.remove({ id: 'tfmg:filling/hardened_planks' })
    event.custom({
        type: "create:filling",
        ingredients: [
            {
                tag: "minecraft:planks"
            },
            {
                type: "neoforge:single",
                amount: 250,
                fluid: "modern_industrialization:creosote"
            }
        ],
        results: [
            {
                id: "tfmg:hardened_planks"
            }
        ]
    })
})