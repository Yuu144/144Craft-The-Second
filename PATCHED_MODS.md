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
