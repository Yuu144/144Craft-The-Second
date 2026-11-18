StartupEvents.registry('item', event => {
    const materials = ['brass', 'constantan', 'diamond', 'electrum', 'enderium', 'invar', 'iron', 'lead', 'lumium', 'netherite', 'nickel', 'osmium', 'platinum', 'signalum', 'uranium', 'zinc']

    materials.forEach(material => {
        const name = material[0].toUpperCase() + material.slice(1)
        event.create(material + '_curved_plate').displayName(name + ' Curved Plate')
    })
})
