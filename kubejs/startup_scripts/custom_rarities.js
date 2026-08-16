// Custom rarity values used by Tooltip Overhaul and RarityCore-style tiers.
StartupEvents.registry('item', event => {
  event.createRarity('legendary', 0xFFCC00)
  event.createRarity('mythical', 0xFF6666)
})
