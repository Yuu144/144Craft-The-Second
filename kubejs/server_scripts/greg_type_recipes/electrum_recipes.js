ServerEvents.recipes(event => {
    event.remove({ not: { output: "alltheores:electrum_ingot" }, output: '#c:ingots/electrum' })
    event.remove({ not: { output: "alltheores:electrum_dust" }, output: '#c:dusts/electrum' })
    event.remove({ id: 'alltheores:crafting/electrum/alloy_blending_from_dust' })
    //
    event.remove({ id: 'alltheores:sag_milling/electrum/ingot' })
})
