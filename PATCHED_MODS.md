# Patched mods

Check this file before updating mods. Preserve each backup folder. A patched JAR must be checked or repatched before it is installed again.

| Mod | Original version | Patch | Client/server location | Status |
| --- | --- | --- | --- | --- |
| Voxy Server Side (VSS) | 0.3.5-neoforge-1.21.1 | patch-1 | Client and remote server; removed 2026-11-21 | **DO NOT UPDATE** if reinstalling until checked or reapplied |

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

