// /dumprecipes [itemId ...]  -> logs resolved recipes for the pack's bottleneck items
// to logs/kubejs/server.log as JSON lines. No args = dump the default list below.
// ponytail: server-side because recipes only resolve on the server; run in-game.

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

ServerEvents.commandRegistry(event => {
  const { commands: Commands, arguments: Arguments } = event

  const dump = (player, items) => {
    items.forEach(id => {
      const recipes = player.server.recipeManager.getRecipes().filter(r =>
        r.getOriginalRecipeResult() && String(r.getOriginalRecipeResult().getId()) === id
      )
      console.info(`[RECIPE_DUMP] ${id} -> ${recipes.size()} recipe(s)`)
      recipes.forEach(r => {
        console.info(`[RECIPE_DUMP] ${id} | ${r.getType()} | ${r.getId()} | ${r.json}`)
      })
    })
    player.tell(`Dumped ${items.length} item(s) to logs/kubejs/server.log (search RECIPE_DUMP)`)
  }

  event.register(
    Commands.literal('dumprecipes')
      .requires(s => s.hasPermission(2))
      .executes(ctx => { dump(ctx.source.playerOrException, DUMP_ITEMS); return 1 })
      .then(Commands.argument('item', Arguments.STRING.create(event))
        .executes(ctx => { dump(ctx.source.playerOrException, [Arguments.STRING.getResult(ctx, 'item')]); return 1 }))
  )
})
