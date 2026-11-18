StartupEvents.registry('item', event => {
    const bolts = ['brass', 'constantan', 'diamond', 'electrum', 'enderium', 'iridium', 'lead', 'lumium', 'netherite', 'nickel', 'osmium', 'platinum', 'signalum', 'silver', 'uranium', 'zinc']
    const largePlates = ['brass', 'bronze', 'constantan', 'copper', 'electrum', 'enderium', 'gold', 'iridium', 'lead', 'lumium', 'netherite', 'nickel', 'osmium', 'platinum', 'signalum', 'silver', 'tin', 'uranium', 'zinc']

    bolts.forEach(material => {
        const name = material[0].toUpperCase() + material.slice(1)
        event.create(material + '_bolt').displayName(name + ' Bolt')
    })

    largePlates.forEach(material => {
        const name = material[0].toUpperCase() + material.slice(1)
        event.create(material + '_large_plate').displayName(name + ' Large Plate')
    })
})
