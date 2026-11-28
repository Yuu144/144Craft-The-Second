# Patched mods

Check this file before updating or reinstalling patched mods. Keep all retained patch archives.

| Mod | Original version | Installed filename | Location | Status |
| --- | --- | --- | --- | --- |
| Voxy Server Side (VSS) | 0.3.5-neoforge-1.21.1 | `mods/vss-0.3.5-neoforge-1.21.1.jar` | Remote server; removed 2026-11-21 | **DO NOT UPDATE** if reinstalling until checked or reapplied |

## VSS patch-1

- Patch purpose: prevent shadow passes from clearing the main view's Voxy coverage; skip visibility frame work when prediction is inactive, with cleanup when disabling it. Server LOD transfer and ingestion were unchanged.
- Server archive: `patched-mods/vss/0.3.5-neoforge-1.21.1/`.
- Original JAR: `original.jar`. Installed server JAR copy: `patch-1/server-installed.jar`; it matches `patch-1/patched.jar`.
- Source diff, patched source, patch/build scripts, and restore instructions are retained under `patch-1/`.
- Original SHA-256: `6abc84e84cc40030d49f974f3e40055020b5121bcc1a72193cef7a69677a7559`.
- Patched SHA-256: `4fa98a2ce28ccb90b3fee8660e4affc6b926ff33ae5fe80c64c2acfcc1cf055f`.
- The VSS server config removed with the JAR is retained at `patched-mods/vss/0.3.5-neoforge-1.21.1/removed-config/vss-server-config.json`.


## SGI diagnostics-1 - DO NOT UPDATE

- Mod: Structure Generation Improver 2.1.0 NeoForge 1.21.1.
- Installed: mods/structure_generation_improver-2.1.0-neoforge-1.21.1.jar. Enabled at user request; restart required to load the diagnostics.
- Purpose: diagnostic-only logging of references, filter decisions, shaper setup, cached noise state, wrapper installation and edge profiles. Not a terrain fix.
- Server archive: patched-mods/structure_generation_improver/2.1.0/. Original: original.jar; patched backup: diagnostics-1/patched.jar.
- Source and reproducible build/restore: diagnostics-1/README.md, PatchSgi.java, SgiDiagnostics.java, build.py, install.py and lib/.
- Original SHA256: 344dade71609f73dcb68ce06c535b82b54055019cfa9df877c052b276b0fab1a.
- Patched SHA256: 13ebd3f24d1219c2c1251f69de974303a2bd29127f5809d037545e77e9279dab.
- Rebuilt on server using Java 21; hash matches client. Full-pack runtime verification pending.
- Logs: logs/sgi-diagnostics.log and rotations .1, .2, .3.
- DO NOT UPDATE until diagnostics have been checked or reapplied. Retain backups.


## SGI diagnostics-2 - DO NOT UPDATE

- Supersedes diagnostics-1; old backup retained. Original SGI 2.1.0 NeoForge 1.21.1.
- Installed filename: mods/structure_generation_improver-2.1.0-neoforge-1.21.1.jar. Enabled/disabled state preserved. Restart required; no restart performed.
- Purpose: before/after block snapshots at noise, surface, carvers and features stages. Diagnostic only; no terrain changes.
- Server backup/source/build/restore: patched-mods/structure_generation_improver/2.1.0/diagnostics-2/. See README.md, build.py, install.py, PatchSgi.java, SgiDiagnostics.java, StageTrace.java and StageDiagnosticsMixin.java.
- Versioned patched backup: diagnostics-2/patched.jar; original: patched-mods/structure_generation_improver/2.1.0/original.jar. Hashes: diagnostics-2/SHA256SUMS.
- Original SHA256: 344dade71609f73dcb68ce06c535b82b54055019cfa9df877c052b276b0fab1a.
- Patched SHA256: 2f10f31a0b4bae0187eeccf4b8d192655c9b2a0e8deba4d8eaed805e8997a356. Rebuilt directly on server; matches client build.
- Default focus: overworld chunk 76,432 radius 3; logs/sgi-stages.log plus rotations .1, .2, .3.
- Isolated server stage test passed; full-pack reproduction pending. WGA settings unchanged.
- DO NOT UPDATE until checked or reapplied.


## WGA sgi-compat-1 - DO NOT UPDATE

- Worldgen Accelerator 0.70.5+mc1.21.1 NeoForge. Installed: mods/wgaccel-neoforge-0.70.5+mc1.21.1.jar. Restart required; not restarted.
- Purpose: detect SGI 2.1.0 TerrainShaper wrappers in ModTerrain.top/shapes. Only affected chunks use full-height CPU noise filling; ordinary behavior/config unchanged.
- Server archive: patched-mods/wgaccel/0.70.5-mc1.21.1/. Original: original.jar; versioned patch: sgi-compat-1/patched.jar; installation input: sgi-compat-1/installed-before.jar.
- Source, exact ASM transform, dependencies, tests, hashes and build/restore: sgi-compat-1/README.md, PatchWga.java, SgiTerrainCompat.java, TestCompat.java, ProbeTest.java, build.py, install.py, lib/, SHA256SUMS.
- Original SHA256: d1cad121843252ad3ee777d50e1aea849fbcadb2942a0af26321c555238e7816.
- Patched SHA256: 969b4d5a5c7e14aa20efef7d6fd3a05d743ec789d14b1d4f89343fc5170746b0. Rebuilt and tested directly on server; matches client build.
- Isolated real-SGI-wrapper test passed; full FreeTerraForged/GPU cutoff reproduction pending.
- DO NOT UPDATE until checked/reapplied; recheck when updating SGI too.


## WGA sgi-compat-2 - quiet - DO NOT UPDATE

- Supersedes WGA sgi-compat-1. Worldgen Accelerator 0.70.5+mc1.21.1; installed mods/wgaccel-neoforge-0.70.5+mc1.21.1.jar.
- Same SGI-only full-height CPU fallback, with added runtime messages/tracking removed. Original mod logging unchanged.
- Server source/backup/build/restore: patched-mods/wgaccel/0.70.5-mc1.21.1/sgi-compat-2/; see README.md, patched.jar, SHA256SUMS and scripts. Original remains ../original.jar; old patches retained.
- Original SHA256: d1cad121843252ad3ee777d50e1aea849fbcadb2942a0af26321c555238e7816.
- Quiet patched SHA256: 760f8837f6c9126086160313060ee9c6641143112b12b7294ab4d3f022aab9f9. Rebuilt on server; regression tests passed; matches client build.
- SGI diagnostic patches are now archived only: original SGI 2.1.0 restored to mods/structure_generation_improver-2.1.0-neoforge-1.21.1.jar. Its SHA256 is 344dade71609f73dcb68ce06c535b82b54055019cfa9df877c052b276b0fab1a.
- Restart required to stop the running diagnostics. No restart performed. Logs, configs and worlds unchanged.
- DO NOT UPDATE WGA until checked/reapplied; recheck when updating SGI.
