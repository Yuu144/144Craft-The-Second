const gearAllTheOresMaterials = ['aluminum', 'brass', 'bronze', 'constantan', 'copper', 'diamond', 'electrum', 'enderium', 'gold', 'invar', 'iridium', 'iron', 'lead', 'lumium', 'netherite', 'nickel', 'osmium', 'platinum', 'signalum', 'silver', 'steel', 'tin', 'uranium', 'zinc']
const gearMiMaterials = ['aluminum', 'bronze', 'copper', 'gold', 'invar', 'iron', 'stainless_steel', 'steel', 'tin', 'titanium']
const gearCustomRingMaterials = ['brass', 'constantan', 'diamond', 'electrum', 'enderium', 'iridium', 'lead', 'lumium', 'netherite', 'nickel', 'osmium', 'platinum', 'signalum', 'silver', 'uranium', 'zinc']

ServerEvents.recipes(event => {
    // Gears
    event.remove({ mod: 'industrialforegoing', output: '#c:gears' })

    gearCustomRingMaterials.forEach(material => {
        if (!Item.exists('kubejs:' + material + '_ring') || !Item.exists('kubejs:' + material + '_bolt')) return
        event.shaped('2x kubejs:' + material + '_ring', ['BRB', 'R R', 'BRB'], {
            B: 'kubejs:' + material + '_bolt',
            R: '#c:rods/' + material
        }).id('144craft2:gears/ring/' + material)
    })

    gearAllTheOresMaterials.forEach(material => {
        const native = gearMiMaterials.includes(material)
        addGear(event, 'alltheores', material,
            native ? 'alltheores:' + material + '_plate' : '#c:plates/' + material,
            (native ? 'modern_industrialization:' : 'kubejs:') + material + '_ring')
    })

    gearMiMaterials.forEach(material => {
        addGear(event, 'modern_industrialization', material,
            'modern_industrialization:' + material + '_plate',
            'modern_industrialization:' + material + '_ring')
    })
})

function addGear(event, mod, material, plate, ring) {
    if (!Item.exists(ring)) return
    const output = mod + ':' + material + '_gear'
    event.remove({ output: output })
    event.shaped(output, [' P ', 'PRP', ' P '], { P: plate, R: ring })
        .id('144craft2:gears/' + mod + '/' + material)
}
