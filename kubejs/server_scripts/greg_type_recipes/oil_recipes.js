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
})