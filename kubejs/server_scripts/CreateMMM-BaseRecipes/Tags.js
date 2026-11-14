ServerEvents.tags('item', e => {
    addTag(e, 'createmechanisms:quartz', ['minecraft:quartz', 'ae2:certus_quartz_crystal', 'ae2:certus_quartz_dust'])
    addTag(e, 'crafting:redstone_mechanism', ['createmechanisms:redstone_mechanism', 'create:powered_latch', 'create:pulse_repeater', 'create:powered_toggle_latch', 'create:pulse_timer', 'create:pulse_extender'])
    addTag(e, 'crafting:filters', ['create:filter', 'create:attribute_filter', 'create:package_filter', 'createmechanisms:zinc_mechanism'])
})