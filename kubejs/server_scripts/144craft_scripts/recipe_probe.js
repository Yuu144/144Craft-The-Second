// TEMP probe v3 - delete after checking server.log. Run /kubejs reload server_scripts.
ServerEvents.recipes(ev => {
  try {
    const pr = ev.custom({
      type: 'create:mixing',
      heat_requirement: 'heated',
      ingredients: [{ tag: 'c:ingots/iron' }, { tag: 'c:dusts/coal' }],
      results: [{ id: 'kubejs:pig_iron_ingot', count: 1 }]
    })
    console.info('[PROBE3] custom ok, id=' + pr.getId())
    console.info('[PROBE3] findRecipes pig_iron -> ' + ev.findRecipes({ output: 'kubejs:pig_iron_ingot' }).length)
  } catch (err) {
    console.info('[PROBE3] THREW: ' + err)
  }

  // Grep all recipe JSON for the id (catches fluid outputs / findRecipes misses)
  const hits = ev.findRecipes({}).filter(rr => String(rr.json).includes('pig_iron_ingot'))
  console.info('[PROBE3] grep-all pig_iron_ingot -> ' + hits.length)
  hits.forEach(rr => console.info('[PROBE3] HIT ' + rr.getId() + ' | ' + String(rr.json).substring(0, 250)))
})
