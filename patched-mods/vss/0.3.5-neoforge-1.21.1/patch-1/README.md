# VSS patch-1 - DO NOT UPDATE

Created 2026-11-18 for the local 144Craft-The-Second client. No remote server changes.

Baseline: the installed VSS `0.3.5-neoforge-1.21.1` JAR, preserved as `../original.jar`. Its hash is pinned by the build script. The patch is specific to that exact baseline; it must not be applied blindly to another release.

## Changes

Only `StrictLodVisibility.beginFrame(Object, Object)` changes:

1. Preserve the original missing-world/player cleanup.
2. Return before visibility frame work if `active()` is false. If a previous active view exists (`levelIdentity != null`), run the existing geometry cleanup once first. The cleanup clears `levelIdentity`, so subsequent inactive frames skip it.
3. For null or zero-sized viewports, return without calling `updateRenderWindow(null, 0, 0, 0)`. Voxy deliberately supplies a null viewport during Iris shadows; skipping that pass must preserve the main view's coverage.

The remaining active rendering path, ingestion/upload hooks, network classes, mixin configuration, and version metadata are preserved. The JAR also contains an identification note at `META-INF/144craft-vss-patch.txt`.

The original profile showed repeated full coverage resets in both the Iris shadow pass and the normal world pass. Each reset cleared about 6 MiB of arrays. Prediction was disabled, but the original inactive check occurred after that work. Removing the overhead does not establish an FPS gain; a GPU limit was also present.

## Files

- `../original.jar`: immutable prepatch backup.
- `patched.jar`: tested patch backup, independent of the installed mod.
- `source/StrictLodVisibility.java`: patched class decompiled using Vineflower 1.10.1 for inspection. It is not the upstream source tree and is not the build input. Nested classes remain in the JAR unchanged.
- `source/StrictLodVisibility.diff`: original versus patched decompiled source.
- `PatchVss.java`: exact reproducible bytecode transformation, with baseline shape checks and method verification.
- `VisibilityHarness.java` / `PrepareHarness.java`: checks using the actual patched method prefix with dependency stubs.
- `lib/`: the five ASM 9.8 libraries needed for the build, copied from the existing Minecraft installation. Their license notices remain inside the JARs.
- `build.py`: build/check/package script using only a JDK, Python standard library, and the preserved ASM libraries.
- `manage.py`: install, restore and verify helper; replacement is atomic and hash checked.
- `SHA256SUMS.json`: hashes of both JARs, patch/test scripts, inspection source, and dependencies.
- `VALIDATION.txt`: scope of completed checks and remaining live checks.

## Restore after an accidental update

Close Minecraft first. Run from the instance directory:

```powershell
py patched-mods/vss/0.3.5-neoforge-1.21.1/patch-1/manage.py install
py patched-mods/vss/0.3.5-neoforge-1.21.1/patch-1/manage.py verify
```

`install` restores `patched.jar` to `mods/vss-0.3.5-neoforge-1.21.1.jar`. If that installed path contains an unexpected version, the helper saves it as `replaced-<sha256>.jar` in this backup folder before replacing it. If an updater used a different VSS filename, move that replacement outside `mods` first; keep only one installed VSS JAR.

To undo the patch and restore the original baseline instead:

```powershell
py patched-mods/vss/0.3.5-neoforge-1.21.1/patch-1/manage.py restore-original
```

Restart Minecraft after installation. The backup directory is outside `mods` and must remain there.

## Rebuild

From the instance directory, with Python and JDK 21 available:

```powershell
py patched-mods/vss/0.3.5-neoforge-1.21.1/patch-1/build.py
```

If `javac` is not on PATH, supply `--jdk 'C:\Program Files\Eclipse Adoptium\jdk-21.0.6.7-hotspot'` or another compatible JDK root. This rebuilds the preserved patch backup and checks; installation is a separate `manage.py install` step. Use a new patch directory for future changes instead of overwriting this revision.

## Verification

Completed: pinned baseline hash, ASM structure/data flow, unchanged non-target methods, isolated JVM verification and behavior checks, archive integrity, and byte-identical non-target JAR entries. The installed JAR's hash matches `patched.jar`.

The isolated checks cover inactive frames, one-time disable cleanup, null/zero-sized viewports, continuation for a valid active view, and missing-world/player cleanup. They do not run the full Minecraft renderer or network stack.

A subsequent [runtime check](RUNTIME_CHECK.md) confirmed Minecraft startup with Photon High and Voxy and found no sampled VSS visibility/reset work in 40 seconds, compared with 4.31% visibility samples before the patch. GPU utilization remained 97-98%. Broader feature regression checks and a controlled FPS comparison remain pending.

After restart, verify startup, server LOD arrival and rendering with Photon enabled, singleplayer behavior, prediction toggles, dimension changes and reconnects. Repeat a focused JFR to confirm the reset loop is gone and measure any change in frame time.
