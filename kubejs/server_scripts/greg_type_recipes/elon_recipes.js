ServerEvents.recipes(event => {
    event.custom({
        type: "modern_industrialization:tesla",
        duration: 50,
        eu: 12800,
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
})
