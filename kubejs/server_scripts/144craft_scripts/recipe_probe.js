// TEMP probe - delete after checking server.log. Run /kubejs reload server_scripts.
ServerEvents.recipes(event => {
  // 1. Does the dump itself see our custom recipe?
  event.custom({ type: 'minecraft:crafting_shapeless', ingredients: [{ item: 'minecraft:dirt' }], result: { id: 'minecraft:diamond', count: 64 } })
  console.info('[PROBE] self-test diamond -> ' + event.findRecipes({ output: 'minecraft:diamond' }).length)

  // 2. Are the gated recipes gone inside the event?
  ;[
    'kubejs:pig_iron_ingot', 'kubejs:treated_osmium', 'kubejs:purified_osmium_dust',
    'mekanism:basic_control_circuit', 'alltheores:osmium_ingot', 'alltheores:steel_ingot',
  ].forEach(id => console.info('[PROBE] findRecipes ' + id + ' -> ' + event.findRecipes({ output: id }).length))

  // 3. Type-level sanity: how many of each custom type exist?
  ;['create:mixing', 'modern_industrialization:circuit_assembler', 'tfmg:casting', 'mekanism:metallurgic_infusing'].forEach(t =>
    console.info('[PROBE] type ' + t + ' -> ' + event.findRecipes({ type: t }).length))
})
