ServerEvents.recipes(event => {
    
    event.remove({ output: 'fluxnetworks:flux_core' })

    event.custom({
        "type": "dndesires:hydraulic_compacting",
        "ingredients": [
            {
                "item": "fluxnetworks:flux_dust",
            },
            {
                "item": "fluxnetworks:flux_dust",
            },
            {
                "item": "fluxnetworks:flux_dust",
            },
            {
                "item": "fluxnetworks:flux_dust",
            },
            {
                "item": "mekanism:ingot_refined_obsidian",
            },
            {
                "item": "mekanism:ingot_refined_obsidian",
            },
            {
                "item": "mekanism:ingot_refined_obsidian",
            },
            {
                "item": "mekanism:ingot_refined_obsidian",
            },
            {
                "item": "minecraft:ender_eye",
            }
        ],
        "results": [
            {
                "count": 6,
                "id": "fluxnetworks:flux_core"
            }
        ]
    })
})