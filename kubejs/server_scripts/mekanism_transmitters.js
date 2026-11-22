ServerEvents.recipes(event => {
    // Mekanism Transmitters
    const transmitters = [
        { name: 'mechanical_pipe', center: 'minecraft:bucket' },
        { name: 'logistical_transporter', center: '#c:circuits/basic' },
        { name: 'pressurized_tube', center: '#c:glass_blocks/cheap' }
    ]

    transmitters.forEach(transmitter => {
        event.remove({ id: 'mekanism:transmitter/' + transmitter.name + '/basic' })
        event.shaped('8x mekanism:basic_' + transmitter.name, [
            'SCS',
            ' P '
        ], {
            S: '#c:ingots/steel',
            C: transmitter.center,
            P: 'tfmg:steel_pipe'
        }).id('144craft2:mekanism_transmitters/' + transmitter.name)
    })
})
