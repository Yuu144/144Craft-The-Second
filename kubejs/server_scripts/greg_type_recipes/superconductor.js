ServerEvents.recipes(event => {
    event.remove({ id: 'modern_industrialization:alloy/mixer/superconductor/tiny_dust' })
    event.remove({ id: 'modern_industrialization:alloy/mixer/superconductor/dust' })
    event.remove({ id: 'modern_industrialization:materials/vacuum_freezer/liquid_air' })
    event.remove({ id: 'modern_industrialization:materials/superconductor/vacuum_freezer/hot_ingot' })

    event.custom({
        "type": "modern_industrialization:mixer",
        "duration": 100,
        "eu": 2,
        "item_inputs": [
            {
                "amount": 3,
                "tag": "c:dusts/iridium"
            },
            {
                "amount": 6,
                "tag": "c:dusts/annealed_copper"
            },
            {
                "amount": 6,
                "tag": "c:dusts/yttrium"
            },
            {
                "amount": 4,
                "tag": "c:dusts/neodymium"
            }
        ],
        "item_outputs": [
            {
                "amount": 9,
                "item": "modern_industrialization:superconductor_dust"
            }
        ]
    })

    event.custom({
        "type": "modern_industrialization:mixer",
        "duration": 100,
        "eu": 2,
        "item_inputs": [
            {
                "amount": 3,
                "tag": "c:tiny_dusts/iridium"
            },
            {
                "amount": 6,
                "tag": "c:tiny_dusts/annealed_copper"
            },
            {
                "amount": 6,
                "tag": "c:tiny_dusts/yttrium"
            },
            {
                "amount": 4,
                "tag": "c:tiny_dusts/neodymium"
            }
        ],
        "item_outputs": [
            {
                "amount": 9,
                "item": "modern_industrialization:superconductor_tiny_dust"
            }
        ]
    })
})
