ServerEvents.recipes(event => {
    event.remove({ id: 'mekanism:reaction/substrate/ethene_oxygen' })
    event.custom({
        "type": "mekanism:reaction",
        "chemical_input": { "amount": 10, "chemical": "mekanism:oxygen" },
        "duration": 60,
        "energy_required": 1000,
        "fluid_input": { "amount": 50, "fluid": "modern_industrialization:polyethylene" },
        "item_input": { "count": 1, "item": "mekanism:substrate" },
        "item_output": { "count": 1, "id": "mekanism:hdpe_pellet" }
    })
})