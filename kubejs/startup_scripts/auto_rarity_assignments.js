// Applies the exported RarityCore auto-rarity table to Minecraft item rarities.
// The source file is kept inside the modpack so the assignments work on clients and servers.
const Files = Java.loadClass('java.nio.file.Files')
const Paths = Java.loadClass('java.nio.file.Paths')

const autoRarityPath = Paths.get('kubejs/data/auto_rarity.json')
if (!Files.exists(autoRarityPath)) {
  console.error(`Auto-rarity source not found: ${autoRarityPath}`)
} else {
  const autoRarity = JSON.parse(String(Files.readString(autoRarityPath)))

  const rarityNames = {
    1: 'COMMON',
    2: 'UNCOMMON',
    3: 'RARE',
    4: 'EPIC',
    5: 'legendary',
    6: 'mythical'
  }

  ItemEvents.modification(event => {
    Object.entries(autoRarity).forEach(([itemId, value]) => {
      const level = Math.min(Math.max(Number(value), 1), 6)
      event.modify(itemId, item => {
        item.rarity = rarityNames[level]
      })
    })
  })
}
