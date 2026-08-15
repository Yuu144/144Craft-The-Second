ServerEvents.recipes(event => {

    event.remove({ not: { output: "alltheores:constantan_ingot" }, output: '#c:ingots/constantan' })
    event.remove({ not: { output: "alltheores:constantan_dust" }, output: '#c:dusts/constantan' })
    event.remove({ output: 'alltheores:constantan_dust' })
    event.remove({ output: 'oritech:constantan_ingot' })
    event.remove({ type: 'minecraft:smelting', input: '#c:dusts/constantan' })
    event.remove({ type: 'minecraft:blasting', input: '#c:dusts/constantan' })
    event.remove({ id: 'tfmg:constantan_wire_from_ingots_constantan_stonecutting' })
    event.remove({ id: 'alltheores:crafting/constantan/plate' })
    event.remove({ id: 'enderio:smelting/alltheores/smelting/constantan/dust_smelting' })
    event.remove({ id: 'alltheores:alloy_smelting/constantan_ingot' })
})