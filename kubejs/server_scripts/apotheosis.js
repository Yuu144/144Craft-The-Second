ServerEvents.recipes(event => {

    event.remove({ output: 'apothic_enchanting:draconic_endshelf' })

    event.shaped('apothic_enchanting:draconic_endshelf', [
        'CAC',
        'DBD',
        'CDC'
    ],{
        A: 'minecraft:dragon_head',
        B: 'apothic_enchanting:endshelf',
        C: 'draconicevolution:draconium_ingot',
        D: 'minecraft:ender_pearl'
    })
})