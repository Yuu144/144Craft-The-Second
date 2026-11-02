// /dumprecipes [itemId]  -> logs resolved recipes for bottleneck items
// to logs/kubejs/server.log. No arg = dump the default list below.
// ponytail: raw RecipeHolder access + kjs$getId; try/catch per recipe so one
// weird modded recipe can't kill the whole dump.

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

  const stackId = s => { try { return String(s.kjs$getId()) } catch (e) { return '?' } }

  const dump = (player, items) => {
    const ra = player.server.registryAccess()
    const all = player.server.recipeManager.getRecipes()
    items.forEach(id => {
      let n = 0
      for (let i = 0; i < all.size(); i++) {
        try {
          const holder = all.get(i)
          const recipe = holder.value()
          const out = recipe.getResultItem(ra)
          if (out.isEmpty() || stackId(out) !== id) continue
          n++
          let ing = ''
          const ings = recipe.getIngredients()
          for (let j = 0; j < ings.size(); j++) {
            const stacks = ings.get(j).getItems()
            let opts = ''
            for (let k = 0; k < stacks.length; k++) opts += (k ? '|' : '') + stackId(stacks[k])
            ing += (j ? ' + ' : '') + (opts || '-')
          }
          console.info(`[RECIPE_DUMP] ${id} | ${recipe.getType()} | ${holder.id()} | IN: ${ing}`)
        } catch (e) { /* skip recipe types with no standard ingredients */ }
      }
      console.info(`[RECIPE_DUMP] ${id} -> ${n} recipe(s)`)
    })
    player.tell(`Dumped ${items.length} item(s) - grep RECIPE_DUMP in logs/kubejs/server.log`)
  }

  event.register(
    Commands.literal('dumprecipes')
      .requires(s => s.hasPermission(2))
      .executes(ctx => { dump(ctx.source.playerOrException, DUMP_ITEMS); return 1 })
      .then(Commands.argument('item', Arguments.STRING.create(event))
        .executes(ctx => { dump(ctx.source.playerOrException, [Arguments.STRING.getResult(ctx, 'item')]); return 1 }))
  )
})
