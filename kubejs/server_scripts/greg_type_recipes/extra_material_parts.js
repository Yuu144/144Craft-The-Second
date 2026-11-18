var extraBoltMaterials = ['brass', 'constantan', 'diamond', 'electrum', 'enderium', 'iridium', 'lead', 'lumium', 'netherite', 'nickel', 'osmium', 'platinum', 'signalum', 'silver', 'uranium', 'zinc']
var extraLargePlateMaterials = ['brass', 'bronze', 'constantan', 'copper', 'electrum', 'enderium', 'gold', 'iridium', 'lead', 'lumium', 'netherite', 'nickel', 'osmium', 'platinum', 'signalum', 'silver', 'tin', 'uranium', 'zinc']

ServerEvents.recipes(event => {
    extraBoltMaterials.forEach(material => {
        event.custom({
            type: 'modern_industrialization:cutting_machine',
            duration: 200,
            eu: 2,
            item_inputs: [{ amount: 1, tag: 'c:rods/' + material }],
            fluid_inputs: [{ amount: 1, fluid: 'modern_industrialization:lubricant' }],
            item_outputs: [{ amount: 2, item: 'kubejs:' + material + '_bolt' }]
        }).id('144craft2:extra_material_parts/cutting_machine/' + material + '_bolt')
    })

    extraLargePlateMaterials.forEach(material => {
        const plate = '#c:plates/' + material
        const output = 'kubejs:' + material + '_large_plate'
        event.shaped(output, ['PP', 'PP'], { P: plate })
            .id('144craft2:extra_material_parts/crafting/' + material + '_large_plate')
        event.custom({
            type: 'modern_industrialization:packer',
            duration: 200,
            eu: 2,
            item_inputs: [{ amount: 4, tag: 'c:plates/' + material }],
            item_outputs: [{ amount: 1, item: output }]
        }).id('144craft2:extra_material_parts/packer/' + material + '_large_plate')
    })
})

ServerEvents.tags('item', event => {
    extraBoltMaterials.forEach(material => event.add('c:bolts/' + material, 'kubejs:' + material + '_bolt'))
    extraLargePlateMaterials.forEach(material => event.add('c:large_plates/' + material, 'kubejs:' + material + '_large_plate'))
})
