ServerEvents.recipes(event => {

    event.remove({ id: 'alltheores:crafting/constantan/plate' })
    event.remove({ id: 'tfmg:mixing/constantan' })
    event.remove({ output: '#c:ingots/constantan' })
    event.remove({ output: '#c:dusts/constantan' })
    event.remove({ id: 'alltheores:sag_milling/constantan/ingot' })
    event.remove({ id: 'alltheores:alloy_smelting/constantan_ingot' })
    
})
