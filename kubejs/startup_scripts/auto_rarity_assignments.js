// Applies the exported RarityCore auto-rarity table to Minecraft item rarities.
// The source file is kept inside the modpack so the assignments work on clients and servers.
(function () {
  var autoRarity

  try {
    // JsonIO is KubeJS's supported JSON file reader. Direct java.nio access is
    // blocked by KubeJS's class filter.
    autoRarity = JsonIO.read('kubejs/data/auto_rarity.json')
  } catch (error) {
    console.error(`Could not load kubejs/data/auto_rarity.json: ${error}`)
  }

  if (autoRarity) {

    var autoRarityNames = {
      1: 'COMMON',
      2: 'UNCOMMON',
      3: 'RARE',
      4: 'EPIC',
      5: 'legendary',
      6: 'mythical'
    }

    ItemEvents.modification(event => {
      autoRarity.forEach((itemId, value) => {
        // The exported table can contain items from mods not installed in this pack.
        if (!Item.exists(itemId)) {
          return
        }

        var level = Math.min(Math.max(Number(value), 1), 6)
        event.modify(itemId, item => {
          item.rarity = autoRarityNames[level]
        })
      })
    })
  }
})()
