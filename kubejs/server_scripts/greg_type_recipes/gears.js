const allTheOresGearMaterials = [
    'aluminum',
    'brass',
    'bronze',
    'constantan',
    'copper',
    'diamond',
    'electrum',
    'enderium',
    'gold',
    'invar',
    'iridium',
    'iron',
    'lead',
    'lumium',
    'netherite',
    'nickel',
    'osmium',
    'platinum',
    'signalum',
    'silver',
    'steel',
    'tin',
    'uranium',
    'zinc'
]

ServerEvents.recipes(event => {
    event.remove({ mod: 'modern_industrialization', output: '#c:gears' })
    
    const gearCraftingTypes = [
        'minecraft:crafting_shaped',
        'minecraft:crafting_shapeless'
    ]

    gearCraftingTypes.forEach(type => {
        allTheOresGearMaterials.forEach(material => {
            event.replaceInput(
                {
                    mod: 'alltheores',
                    type: type,
                    output: '#c:gears',
                    input: `#c:ingots/${material}`
                },
                `#c:ingots/${material}`,
                `#c:plates/${material}`
            )
        })
    })
})
