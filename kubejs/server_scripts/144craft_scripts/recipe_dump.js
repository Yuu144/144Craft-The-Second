// Dumps resolved recipes for the pack's bottleneck items to logs/kubejs/server.log
// at every recipe load. Grep RECIPE_DUMP after startup or /kubejs reload server_scripts.
// Edit DUMP_ITEMS to add items. ponytail: findRecipes gives real KubeJS wrappers with
// .json - raw RecipeHolder has no usable result/ingredient access outside the event.

const DUMP_ITEMS = [
  'kubejs:pig_iron_ingot', 'kubejs:unforged_steel_ingot', 'alltheores:steel_ingot',
  'kubejs:treated_osmium', 'kubejs:osmium_tetroxide_dust', 'kubejs:purified_osmium_dust', 'alltheores:osmium_ingot',
  'mekanism:alloy_infused',
  'mekanism:basic_control_circuit', 'mekanism:advanced_control_circuit',
  'mekanism:elite_control_circuit', 'mekanism:ultimate_control_circuit',
  'extendedae:concurrent_processor', 'megacells:accumulation_processor',
  'industrialforegoing:machine_frame_pity', 'industrialforegoing:machine_frame_simple', 'industrialforegoing:machine_frame_advanced',
  'kubejs:energized_superconducting_titanium_larp_alloy', 'kubejs:144_ium',
]

ServerEvents.recipes(event => {
  DUMP_ITEMS.forEach(id => {
    const found = event.findRecipes({ output: id })
    console.info(`[RECIPE_DUMP] ${id} -> ${found.length} recipe(s)`)
    found.forEach(r => console.info(`[RECIPE_DUMP] ${id} | ${r.getType()} | ${r.getId()} | ${r.json}`))
  })
})
