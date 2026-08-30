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
    //event.remove({ mod: 'modern_industrialization', output: '#c:gears' })
    event.remove({ mod: 'industrialforegoing', output: '#c:gears' })

    allTheOresGearMaterials.forEach(material => {
        event.remove({ id: `alltheores:crafting/${material}/gear` })
    })
})
