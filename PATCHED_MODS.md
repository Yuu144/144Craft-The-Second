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
