const industrialForegoingGeneratorOutputs = [
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
    'industrialforegoing:mycelial_meatallurgic',
    'rftoolspower:blazing_generator',
    'refurbished_furniture:light_electricity_generator',
    'refurbished_furniture:dark_electricity_generator',
    'integrateddynamics:coal_generator',
    'rftoolspower:coalgenerator',
    'justdirethings:generatorfluidt1',
    'justdirethings:generatort1',
    'draconicevolution:generator'
]

ServerEvents.recipes(event => {
    event.remove({ id: 'modern_industrialization:electric_age/machine/lv_steam_turbine_asbl' })
    event.remove({ id: 'ironfurnaces:augments/augment_generator' })

    industrialForegoingGeneratorOutputs.forEach(output => {
        event.remove({ output: output })
    })
})
