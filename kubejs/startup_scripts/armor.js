// KubeJS 7 / Minecraft 1.21 uses the item attribute-modifier component.
// The old armorProtection, armorToughness and armorKnockbackResistance fields
// are not available in this version.
function setArmorAttributes(item, slot, protection, toughness, knockbackResistance) {
    var modifiers = item.item().getDefaultAttributeModifiers()
        .withModifierAdded(
            'minecraft:generic.armor',
            {
                operation: 0,
                amount: protection,
                id: 'armor'
            },
            slot
        )
        .withModifierAdded(
            'minecraft:generic.armor_toughness',
            {
                operation: 0,
                amount: toughness,
                id: 'armor_toughness'
            },
            slot
        )
        .withModifierAdded(
            'minecraft:generic.knockback_resistance',
            {
                operation: 0,
                amount: knockbackResistance,
                id: 'knockback_resistance'
            },
            slot
        )

    // Keep the modifiers visible in the item's tooltip.
    item.setAttributeModifiersWithTooltip(modifiers.modifiers())
}

ItemEvents.modification(event => {
    event.modify('cataclysm_spellbooks:ignis_helmet', item => {
        setArmorAttributes(item, 'head', 5, 3, 0.1)
    })

    event.modify('cataclysm_spellbooks:ignis_chestplate', item => {
        setArmorAttributes(item, 'chest', 10, 3, 0.1)
    })

    event.modify('cataclysm_spellbooks:ignis_chestplate_elytra', item => {
        setArmorAttributes(item, 'chest', 10, 3, 0.1)
    })

    event.modify('cataclysm_spellbooks:ignis_leggings', item => {
        setArmorAttributes(item, 'legs', 8, 3, 0.1)
    })

    event.modify('cataclysm_spellbooks:ignis_boots', item => {
        setArmorAttributes(item, 'feet', 5, 3, 0.1)
    })

    event.modify('forbidden_arcanus:tyr_helmet', item => {
        setArmorAttributes(item, 'head', 5, 3, 0.1)
    })

    event.modify('forbidden_arcanus:tyr_chestplate', item => {
        setArmorAttributes(item, 'chest', 11, 3, 0.1)
    })

    event.modify('forbidden_arcanus:tyr_leggings', item => {
        setArmorAttributes(item, 'legs', 8, 3, 0.1)
    })

    event.modify('forbidden_arcanus:tyr_boots', item => {
        setArmorAttributes(item, 'feet', 5, 3, 0.1)
    })
})
