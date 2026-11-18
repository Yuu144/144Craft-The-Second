StartupEvents.registry('item', event => {
    const materials = ['brass', 'constantan', 'diamond', 'electrum', 'enderium', 'iridium', 'lead', 'lumium', 'netherite', 'nickel', 'osmium', 'platinum', 'signalum', 'silver', 'uranium', 'zinc']

    materials.forEach(material => {
        const name = material[0].toUpperCase() + material.slice(1)
        event.create(material + '_ring').displayName(name + ' Ring')
    })
})
