# 144Craft Foundations

Small NeoForge 1.21.1 mod replacing **only SGI's foundation raising**.
Version 0.1.0; built against NeoForge 21.1.264 and Java 21.

## Behaviour

- Adds terrain beneath unsupported template structure bases.
- Adds a short, smooth outward skirt; defaults: maximum rise **12 blocks**, skirt **6 blocks**.
- **Never lowers terrain, clears blocks, replaces solid blocks, or replaces water.**
- Uses the original terrain captured after carvers, before structures and decoration.
- Writes foundations after decoration, only inside the chunk being generated.
- Samples each template column's lowest structural block, not one bottom bounding-box height.
- Lower floors and room columns constrain neighbouring skirts so they cannot fill those spaces.
- Keeps the local surface block and subsoil, with the dimension's base block deeper down.
- Uses no random numbers or global "first structure wins" decisions.

The foundation calculation is independent of support iteration order and uses world coordinates
across chunk borders. It cannot make another mod's structure placements deterministic, or prevent
neighbouring mods' feature writes from changing final blocks.

## Safety and limitations

- **Remove SGI before testing.** This mod makes itself inactive while SGI is loaded.
- Structurify may remain for flatness checks and overlap prevention. Existing vanilla terrain
  adaptation is not disabled or replaced.
- Ships, known flying structures, and wet columns are excluded. Gaps over 12 blocks are skipped
  by default rather than building huge mountains under aircraft.
- Underground generation steps are skipped unless their exact ID is in `mixedSurfaceStructures`.
  Mining Complex is included there by default; its below-ground columns still cannot act as
  raised surface foundations.
- Procedural structure pieces without readable templates and non-rigid pieces are skipped,
  rather than guessing a whole building's foundation from its bounding box.
- Template processing that substantially changes a template's geometry is not simulated.
  All palette variants are treated conservatively.
- To avoid extending beyond the structure-start visibility horizon, edge supports whose complete
  skirts would leave that horizon are skipped.
- Additive foundations do not fix structure templates that themselves carve mountains.
- Only new chunks are affected. Existing chunks are not repaired.
- GPU-generated Voxy previews do not run this feature; real generated chunks replace previews.
- Full-pack FreeTerraForged / WGAccel / C2ME / Structurify compatibility and visual testing remain
  required before deployment. Do not assume pure calculation tests establish full-pack determinism.

## Configuration

Generated at `config/craft144_foundations-common.toml` on first load:

```toml
enabled = true
maxRise = 12
skirt = 6
mixedSurfaceStructures = ["dungeons_arise:mining_complex"]
```

`excludedStructures` contains the default ship/flying exclusions and supports exact IDs or
`namespace:*`. Restart before testing config changes in a new area.

## Build and tests

Windows:

```powershell
.\gradlew.bat build
.\gradlew.bat runGameTestServer
```

Linux:

```sh
sh gradlew build
sh gradlew runGameTestServer
```

Output: `build/libs/144craft-foundations-0.1.0.jar`.
GameTest sources and their empty fixture are development-only and are not included in that JAR.
Unit tests cover raise-only behaviour, basements/rooms, wet columns, large gaps, reversed support
order, negative coordinates, and chunk corners. GameTests check mod/mixin startup and that
actual block writes preserve solids and water.

## Installation and rollback

The build does not install itself or modify worlds. The client and server pack installs keep a
versioned release copy under `releases/0.1.0/`, and the disabled original SGI JAR under
`disabled-mods/structure-generation-improver/2.1.0/`.

After backing up a test world and stopping the game/server:

1. Move SGI's JAR out of `mods` into `disabled-mods` (keep it for rollback).
2. Put the built Foundations JAR in `mods`.
3. Restart and test a newly generated area.

Apply server installation directly in its own checkout, separately from the client.
The mod contains no client rendering code; it also works on an integrated singleplayer server.

For rollback, stop the game/server, remove Foundations, and restore SGI if desired.
Already-generated foundations remain in the world; restore the world backup to undo them.
