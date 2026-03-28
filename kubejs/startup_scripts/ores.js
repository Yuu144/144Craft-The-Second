StartupEvents.registry('item', event => {
  event.create('ruby')
    .displayName('Ruby')
    .maxStackSize(64)

  event.create('sapphire')
    .displayName('Sapphire')
    .maxStackSize(64)
})

StartupEvents.registry('block', event => {
  event.create('144_ium_ore')
    .displayName('144-Ium Ore')
    .stoneSoundType()
    .hardness(3.0)
    .resistance(3.0)
    .requiresTool(true)
    .tagBlock('minecraft:mineable/pickaxe')
    .item(item => {
      item.displayName('144-Ium Ore')
    })

  event.create('13_ium_ore')
    .displayName('13-Ium Ore')
    .stoneSoundType()
    .hardness(3.0)
    .resistance(3.0)
    .requiresTool(true)
    .tagBlock('minecraft:mineable/pickaxe')
    .item(item => {
      item.displayName('13-Ium Ore')
    })
})
