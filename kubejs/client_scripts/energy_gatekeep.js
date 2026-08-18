const industrialForegoingGeneratorItems = [
    'industrialforegoing:pitiful_generator',
    'industrialforegoing:biofuel_generator',
    'industrialforegoing:bioreactor',
    'industrialforegoing:mycelial_reactor',
    'industrialforegoing:mycelial_furnace',
    'industrialforegoing:mycelial_potion',
    'industrialforegoing:mycelial_culinary',
    'industrialforegoing:mycelial_slimey',
    'industrialforegoing:mycelial_disenchantment',
    'industrialforegoing:mycelial_ender',
    'industrialforegoing:mycelial_explosive',
    'industrialforegoing:mycelial_frosty',
    'industrialforegoing:mycelial_halitosis',
    'industrialforegoing:mycelial_magma',
    'industrialforegoing:mycelial_pink',
    'industrialforegoing:mycelial_death',
    'industrialforegoing:mycelial_netherstar',
    'industrialforegoing:mycelial_rocket',
    'industrialforegoing:mycelial_crimed',
    'industrialforegoing:mycelial_meatallurgic'
]

JEIEvents.hideItems(event => {
    industrialForegoingGeneratorItems.forEach(item => {
        event.hide(item)
    })
})
