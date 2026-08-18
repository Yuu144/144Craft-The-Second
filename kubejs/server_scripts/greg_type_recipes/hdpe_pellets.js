ServerEvents.recipes(event => {
    event.remove({ output: 'mekanism:hdpe_pellet' })
    event.custom({
        type: "modern_industrialization:vacuum_freezer",
        eu: 16,
        duration: 5,
        fluid_inputs: [
            {
                fluid: "modern_industrialization:polyethylene",
                amount: 90
            }
        ],
        item_outputs: {
            item: "mekanism:hdpe_pellet",
        }
    })
})