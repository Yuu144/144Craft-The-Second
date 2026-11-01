ServerEvents.recipes(event => {
    event.remove({ id: 'modern_industrialization:electric_age/component/implosion_compressor/singularity' })

    event.remove({ id: 'modern_industrialization:materials/coal/forge_hammer/ore_to_dust_with_tool' })
    event.custom({
        type: 'modern_industrialization:forge_hammer',
        damage: 50,
        ingredient: { tag: 'c:ores/coal' },
        result: { count: 4, id: 'minecraft:coal' }
    }).id('modern_industrialization:materials/coal/forge_hammer/ore_to_dust_with_tool')

    event.remove({ id: 'modern_industrialization:materials/coal/forge_hammer/crushed_dust_to_dust_with_tool' })
    event.custom({
        type: 'modern_industrialization:forge_hammer',
        count: 3,
        damage: 30,
        ingredient: { item: 'modern_industrialization:coal_crushed_dust' },
        result: { count: 4, id: 'minecraft:coal' }
    }).id('modern_industrialization:materials/coal/forge_hammer/crushed_dust_to_dust_with_tool')

    event.remove({ id: 'modern_industrialization:materials/coal/macerator/gem' })
    event.custom({
        type: 'modern_industrialization:macerator',
        duration: 100,
        eu: 2,
        item_inputs: [{ amount: 1, item: 'minecraft:coal' }],
        item_outputs: [{ amount: 4, item: 'minecraft:coal' }]
    }).id('modern_industrialization:materials/coal/macerator/gem')

    event.remove({ id: 'modern_industrialization:materials/coal/macerator/crushed_dust' })
    event.custom({
        type: 'modern_industrialization:macerator',
        duration: 50,
        eu: 2,
        item_inputs: [{ amount: 1, item: 'modern_industrialization:coal_crushed_dust' }],
        item_outputs: [{ amount: 4, item: 'minecraft:coal' }]
    }).id('modern_industrialization:materials/coal/macerator/crushed_dust')
})
