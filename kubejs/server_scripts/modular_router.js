ServerEvents.recipes(event => {
    // Modular Router
    event.remove({ id: 'modularrouters:modular_router' })
    event.shaped('4x modularrouters:modular_router', ['IFI', 'BMB', 'IBI'], {
        I: '#c:ingots/iron',
        F: 'fluxnetworks:flux_core',
        B: 'minecraft:iron_bars',
        M: 'modularrouters:blank_module'
    }).id('144craft2:modular_router')
})
