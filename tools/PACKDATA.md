# Runtime pack data

`kubejs/server_scripts/144craft_scripts/runtime_export.js` reads the loaded server
registries and recipe manager without changing recipes. It exports automatically
after entering a world and after datapack reloads. It works in singleplayer or on
a dedicated server where the script is installed; a client script cannot inspect
a remote server's full recipe manager. Recipes are exported in bounded batches.

Manual commands (OP / cheats required):

```mcfunction
/packdata export
/packdata status
```

Restart the world after first adding the script. Use `/reload` after recipe edits;
reloading server scripts alone does not apply new recipes. Failed or interrupted
exports leave the previous complete snapshot selected. Complete snapshots and
the latest pointer are under `local/144craft-runtime/`. The manifest records the
export date, counts and any recipes whose serializers could not export them.
Items, fluids and recipes are stored as JSON-array batches in separate directories.
Snapshot folders accumulate; old snapshots may be removed when no export is running.

From the instance directory:

```powershell
python tools/packdata.py status
python tools/packdata.py search capacitor
python tools/packdata.py search circuit --mod tfmg
python tools/packdata.py search --tag c:plates/steel
python tools/packdata.py search oil --fluids
python tools/packdata.py recipes alltheores:steel_ingot
python tools/packdata.py uses alltheores:steel_ingot
python tools/packdata.py recipe 144craft2:ae2/inscriber
```

Add `--json` to search for structured results. Use `--limit 50` to increase result
counts. The recipe and uses commands return complete serialized recipe data,
including quantities, probabilities and machine-specific fields. Tag-based
ingredients match the exported membership of the requested item. `uses` includes
reusable recipe tools, not just consumed ingredients. Known input/output field
names are indexed; unfamiliar custom formats remain available in the `recipes/` batches
and through exact recipe-ID lookup. This is not a claim to cover every JEI category.

For choosing a fitting item, search several name/ID/tag terms, inspect candidates,
then check their recipes and uses. Search is literal, not semantic: try related
words such as `circuit`, `processor`, `capacitor`, `coil`, `frame`, or `plate`.
Names use the game's current translation when available; server names may be
untranslated. Registry items include hidden items; JEI-only plugins, catalysts,
recipe visibility and component-specific variants are not captured by this server
export. Always inspect the export date before treating it as current.
