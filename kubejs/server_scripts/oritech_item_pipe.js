ServerEvents.recipes(event => {
    // Item Pipe
    event.remove({ id: 'oritech:crafting/item' })
    event.shaped('6x oritech:item_pipe', ['pPp', 'nnn', 'ppp'], {
        p: '#minecraft:planks',
        P: 'tfmg:steel_pipe',
        n: '#c:ingots/nickel'
    }).id('144craft2:oritech/item_pipe')

    // Transparent Item Pipe
    event.remove({ id: 'oritech:crafting/transparentitem' })
    event.shaped('6x oritech:transparent_item_pipe', ['pPp', 'gng', 'ppp'], {
        p: '#minecraft:planks',
        P: 'tfmg:steel_pipe',
        n: '#c:ingots/nickel',
        g: '#c:glass_blocks'
    }).id('144craft2:oritech/transparent_item_pipe')
})
