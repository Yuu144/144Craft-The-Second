# Patched mods

Check this file before updating mods. Preserve each backup folder. A patched JAR must be checked or repatched before it is installed again.

| Mod | Original version | Patch | Client/server location | Status |
| --- | --- | --- | --- | --- |
| Voxy Server Side (VSS) | 0.3.5-neoforge-1.21.1 | patch-1 | Client and remote server; removed 2026-11-21 | **DO NOT UPDATE** if reinstalling until checked or reapplied |
| Structure Generation Improver (SGI) | 2.1.0 NeoForge 1.21.1 | original installed; diagnostics archived | Client `mods/structure_generation_improver-2.1.0-neoforge-1.21.1.jar`; separate server archive | **DO NOT UPDATE** until diagnostics are checked or reapplied |

## VSS patch-1

- Installed filename on both sides: `vss-0.3.5-neoforge-1.21.1.jar`.
- Purpose: prevent shadow passes from clearing the main view's Voxy coverage; skip visibility frame work when prediction is inactive, with cleanup when disabling it. Server LOD transfer and ingestion were unchanged.
- The client JAR and the remote server JAR had the same patched SHA-256. The earlier note that the server JAR was unmodified was incorrect.
- Client archive: `patched-mods/vss/0.3.5-neoforge-1.21.1/`.
- Server archive: `/home/container/patched-mods/vss/0.3.5-neoforge-1.21.1/` in the remote checkout.
- Original JAR: `original.jar`; installed patched JAR copies: `patch-1/patched.jar`, `patch-1/installed-client.jar`, and `patch-1/server-installed.jar`.
- Patch source, diff, build script, and restore instructions are in `patch-1/source/`, `patch-1/PatchVss.java`, and `patch-1/README.md`.
- Original SHA-256: `6abc84e84cc40030d49f974f3e40055020b5121bcc1a72193cef7a69677a7559`.
- Patched SHA-256: `4fa98a2ce28ccb90b3fee8660e4affc6b926ff33ae5fe80c64c2acfcc1cf055f`.
- The removed client configs are retained in `removed-config/vss-client-config.json` and `removed-config/vss-server-config.json`. The server config is archived separately in the remote server checkout.
- Previous runtime note: `patched-mods/vss/0.3.5-neoforge-1.21.1/patch-1/RUNTIME_CHECK.md`. LOD transfer, prediction toggles, reconnect/dimension/singleplayer checks, and controlled FPS comparison remain pending.

## SGI diagnostics-1

- Purpose: investigate chunk-edge terrain seams; logs reference visibility, filter decisions,
  shaper setup, cached noise state, density-wrapper installation and sampled edge profiles.
- Original version: 2.1.0, NeoForge 1.21.1. Installed filename:
  `mods/structure_generation_improver-2.1.0-neoforge-1.21.1.jar`.
- Local archive: `patched-mods/structure_generation_improver/2.1.0/`.
  Original: `original.jar`; patched backup: `diagnostics-1/patched.jar`.
- Source, ASM patcher, bundled build dependencies, build/restore scripts, changed-class list
  and instructions: `diagnostics-1/`. Original and patched hashes: `diagnostics-1/SHA256SUMS`.
- Original SHA-256: `344dade71609f73dcb68ce06c535b82b54055019cfa9df877c052b276b0fab1a`.
- Patched SHA-256: `13ebd3f24d1219c2c1251f69de974303a2bd29127f5809d037545e77e9279dab`.
- Server documentation, backups and enabled/disabled installation state are maintained
  separately in the remote checkout. No terrain behavior fix is claimed by this patch.
- **DO NOT UPDATE** until diagnostics have been checked or reapplied.


## WGAccel sgi-compat-2 - DO NOT UPDATE

- Worldgen Accelerator 0.70.5+mc1.21.1; client: mods/wgaccel-neoforge-0.70.5+mc1.21.1.jar.
- Quiet SGI compatibility fallback. Original SGI 2.1.0 is installed on the client.
- Backup, original JAR, hashes, source, build and restore instructions: patched-mods/wgaccel/0.70.5-mc1.21.1/sgi-compat-2/README.md.
- Original SHA-256: d1cad121843252ad3ee777d50e1aea849fbcadb2942a0af26321c555238e7816.
- Patched SHA-256: 760f8837f6c9126086160313060ee9c6641143112b12b7294ab4d3f022aab9f9.
- DO NOT UPDATE until checked or reapplied.
