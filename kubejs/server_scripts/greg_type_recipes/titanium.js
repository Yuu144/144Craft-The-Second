ServerEvents.tags('item', event => {
    event.remove('minecraft:beacon_payment_items', 'northstar:titanium_ingot')
})

ServerEvents.recipes(event => {
    event.remove({ id: 'northstar:blasting/titanium_ingot_from_raw' })
    event.remove({ id: 'northstar:blasting/mars_deep_titanium_ore' })
    event.remove({ id: 'northstar:smelting/mars_deep_titanium_ore' })
    event.remove({ id: 'northstar:smelting/titanium_ingot_from_raw' })
    event.remove({ id: 'northstar:sequenced_assembly/titanium' })
    event.remove({ id: 'northstar:sequenced_assembly/titanium' })
    event.remove({ id: 'northstar:sequenced_assembly/titanium' })
})
