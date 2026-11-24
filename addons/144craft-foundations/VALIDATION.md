# Validation

Development environment: Windows, Java 21, Minecraft 1.21.1, NeoForge 21.1.264.

Passed:

- Gradle build.
- 13 JUnit calculation tests, no failures.
- 3 isolated Minecraft GameTests:
  - Mod/config startup, chunk carrier mixin, template accessor, flying-structure exclusion.
  - Actual foundation writes preserve an existing solid block and water.
  - A real noise-generated Nether chunk completes without mixin/generation errors.
- Release JAR contains no GameTest classes or test structure fixture.

Not yet verified:

- Full modpack runtime, especially FreeTerraForged, WGAccel, C2ME, and Structurify together.
- Visual results on Mangrove Hut, Frosted Prison, Mining Complex, and chunk corners.
- Same-seed full-world comparison with different generation orders.
- In-game verification after client/server restart. The replacement files are prepared, with
  original SGI JARs retained in `disabled-mods/structure-generation-improver/2.1.0/`.

The tests establish the small mod's calculation and basic Minecraft integration, not full-pack
worldgen determinism. Use a disposable test world before installing on an existing world.
