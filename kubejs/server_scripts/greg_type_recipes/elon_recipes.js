ServerEvents.recipes(event => {
    
    event.remove({ id: 'aeinfinitybooster:infinity_card' })
    event.remove({ id: 'aeinfinitybooster:dimension_card' })
    //EST-Larp Alloy
    event.custom({
        type: "modern_industrialization:tesla",
        duration: 200,
        eu: 8000,
        item_inputs: [
            {
                amount: 8,
                item: "modern_industrialization:superconductor_ingot"
            },
            {
                amount: 8,
                item: "modern_industrialization:titanium_ingot"
            },
            {
                amount: 2,
                item: "kubejs:larp_crystal"
            }
        ],
        item_outputs: [
            {
                amount: 1,
                item: "kubejs:energized_superconducting_titanium_larp_alloy"
            }
        ]
    })

    //Infinity Range Booster
        event.custom({
        type: "modern_industrialization:tesla",
        duration: 100,
        eu: 6000,
        item_inputs: [
            {
                amount: 4,
                item: "ae2:wireless_booster"
            },
            {
                amount: 16,
                item: "alltheores:enderium_ingot"
            },
            {
                amount: 1,
                item: "minecraft:nether_star"
            },
            {
                amount: 2,
                item: "ae2:quantum_entangled_singularity"
            }
        ],
        item_outputs: [
            {
                amount: 1,
                item: "aeinfinitybooster:infinity_card"
            }
        ]
    })

        //Dimension Card
        event.custom({
        type: "modern_industrialization:tesla",
        duration: 100,
        eu: 6000,
        item_inputs: [
            {
                amount: 4,
                item: "aeinfinitybooster:infinity_card"
            },
            {
                amount: 8,
                item: "alltheores:enderium_ingot"
            },
            {
                amount: 1,
                item: "minecraft:nether_star"
            },
            {
                amount: 1,
                item: "extended_industrialization:tesla_interdimensional_upgrade"
            }
        ],
        item_outputs: [
            {
                amount: 1,
                item: "aeinfinitybooster:dimension_card"
            }
        ]
    })
})
