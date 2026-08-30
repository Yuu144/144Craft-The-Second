const allTheOresGearMaterials = [
    'aluminum',
    'bronze',
    'copper',
    'gold',
    'invar',
    'iron',
    'steel',
    'tin'
]

ServerEvents.recipes(event => {
    //event.remove({ mod: 'modern_industrialization', output: '#c:gears' })
    event.remove({ mod: 'industrialforegoing', output: '#c:gears' })

    allTheOresGearMaterials.forEach(material => {
        event.remove({ id: `alltheores:crafting/${material}/gear` })
    })
})
