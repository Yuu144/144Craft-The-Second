ItemEvents.modification(event => {
    event.modify('cataclysm_spellbooks:ignis_helmet', item => {
        item.armorProtection = 5
        item.armorToughness = 3
        item.armorKnockbackResistance = 0.1
    })

    event.modify('cataclysm_spellbooks:ignis_chestplate', item => {
        item.armorProtection = 10
        item.armorToughness = 3
        item.armorKnockbackResistance = 0.1
    })

    event.modify('cataclysm_spellbooks:ignis_chestplate_elytra', item => {
        item.armorProtection = 10
        item.armorToughness = 3
        item.armorKnockbackResistance = 0.1
    })

    event.modify('cataclysm_spellbooks:ignis_leggings', item => {
        item.armorProtection = 8
        item.armorToughness = 3
        item.armorKnockbackResistance = 0.1
    })

    event.modify('cataclysm_spellbooks:ignis_boots', item => {
        item.armorProtection = 5
        item.armorToughness = 3
        item.armorKnockbackResistance = 0.1
    })

    event.modify('forbidden_arcanus:tyr_helmet', item => {
        item.armorProtection = 5
        item.armorToughness = 3
        item.armorKnockbackResistance = 0.1
    })

    event.modify('forbidden_arcanus:tyr_chestplate', item => {
        item.armorProtection = 11
        item.armorToughness = 3
        item.armorKnockbackResistance = 0.1
    })

    event.modify('forbidden_arcanus:tyr_leggings', item => {
        item.armorProtection = 8
        item.armorToughness = 3
        item.armorKnockbackResistance = 0.1
    })

    event.modify('forbidden_arcanus:tyr_boots', item => {
        item.armorProtection = 5
        item.armorToughness = 3
        item.armorKnockbackResistance = 0.1
    })
})