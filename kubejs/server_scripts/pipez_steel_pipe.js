ServerEvents.recipes(event => {
    // Pipez
    const pipes = [
        { name: 'item_pipe', side: 'minecraft:dropper' },
        { name: 'fluid_pipe', side: 'minecraft:bucket' },
        { name: 'gas_pipe', side: 'mekanism:alloy_infused' }
    ]

    pipes.forEach(pipe => {
        event.remove({ id: 'pipez:' + pipe.name })
        event.shaped('16x pipez:' + pipe.name, [
            'IPI',
            'SRS',
            'III'
        ], {
            I: '#c:ingots/iron',
            P: 'tfmg:steel_pipe',
            S: pipe.side,
            R: '#c:dusts/redstone'
        }).id('144craft2:pipez/' + pipe.name)
    })
})
