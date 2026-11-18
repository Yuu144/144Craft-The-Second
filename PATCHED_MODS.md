# Patched mods

Check this file before updating mods. Preserve each backup folder. Do not replace a listed mod until its patch has been reviewed or reapplied and tested for the replacement version.

| Mod | Baseline version | Patch | Side | Status |
| --- | --- | --- | --- | --- |
| Voxy Server Side (VSS) | 0.3.5-neoforge-1.21.1 | patch-1 | Local client, including singleplayer | **DO NOT UPDATE** - installed 2026-11-18 |

## VSS patch-1

- Installed file: `mods/vss-0.3.5-neoforge-1.21.1.jar`.
- Purpose: stop shadow passes from clearing the main view's Voxy coverage; skip visibility frame work when prediction is inactive, with cleanup when disabling it.
- Server LOD downloading and ingestion remain unchanged. No remote server JAR was modified.
- Original prepatch backup: [original.jar](patched-mods/vss/0.3.5-neoforge-1.21.1/original.jar).
- Patched backup: [patched.jar](patched-mods/vss/0.3.5-neoforge-1.21.1/patch-1/patched.jar).
- [Build, verification and restore instructions](patched-mods/vss/0.3.5-neoforge-1.21.1/patch-1/README.md).
- [Patched code for inspection](patched-mods/vss/0.3.5-neoforge-1.21.1/patch-1/source/StrictLodVisibility.java) and [source diff](patched-mods/vss/0.3.5-neoforge-1.21.1/patch-1/source/StrictLodVisibility.diff).
- [Reproducible patch implementation](patched-mods/vss/0.3.5-neoforge-1.21.1/patch-1/PatchVss.java).
- [SHA-256 hashes](patched-mods/vss/0.3.5-neoforge-1.21.1/patch-1/SHA256SUMS.json).
- Original SHA-256: `6abc84e84cc40030d49f974f3e40055020b5121bcc1a72193cef7a69677a7559`.
- Patched SHA-256: `4fa98a2ce28ccb90b3fee8660e4affc6b926ff33ae5fe80c64c2acfcc1cf055f`.
- Validation: bytecode structure/data flow, unchanged methods/archive entries, and isolated JVM behavior checks passed. Installed JAR hash matches the patched backup. After restart, Minecraft ran with Photon High and Voxy; a 40-second profile contained no sampled VSS visibility/reset work, versus 4.31% visibility samples before. See [runtime check](patched-mods/vss/0.3.5-neoforge-1.21.1/patch-1/RUNTIME_CHECK.md). Server LOD transfer, prediction toggles, reconnect/dimension/singleplayer checks, and a controlled FPS comparison remain pending.

The filename and mod version metadata intentionally remain the baseline version. Identify the patch using its hash or the embedded `META-INF/144craft-vss-patch.txt` marker. Preserve `patch-1` when creating later patches; use a new patch directory.
