// TEMP probe v2 - delete after checking server.log. Run /kubejs reload server_scripts.
ServerEvents.recipes(event => {
  try {
    const r = event.custom({
      type: 'create:mixing',
      heat_requirement: 'heated',
      ingredients: [{ tag: 'c:ingots/iron' }, { tag: 'c:dusts/coal' }],
      results: [{ id: 'kubejs:pig_iron_ingot', count: 1 }]
    })
    console.info('[PROBE2] pig iron custom returned: ' + r + ' | id=' + r.getId() + ' | json=' + r.json)
    console.info('[PROBE2] findRecipes pig_iron immediately -> ' + event.findRecipes({ output: 'kubejs:pig_iron_ingot' }).length)
  } catch (e) {
    console.info('[PROBE2] pig iron custom THREW: ' + e)
  }
})
