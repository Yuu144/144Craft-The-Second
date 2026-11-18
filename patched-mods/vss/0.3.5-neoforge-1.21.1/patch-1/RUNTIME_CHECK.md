# Runtime check - 2026-11-18

Minecraft restarted as PID 29244 at 14:56:45 CET, after patch installation. The installed JAR matches the preserved patch-1 SHA-256. Logs show Photon v1.4 high and the Iris/Voxy rendering pipeline initialized. Client prediction remains disabled.

A 40-second focused JFR recording was captured at approximately 15:00:36-15:01:16 CET. GPU polls during the recording were 97-98% utilization, about 5,596-5,604 MiB VRAM use, and about 206-212 W.

| Render-thread samples | Before (25 seconds) | After (40 seconds) |
| --- | ---: | ---: |
| Total | 766 | 968 |
| VSS visibility | 33 (4.31%) | 0 (0%) |
| Coverage invalidateAll reset path | 32 | 0 |

Neither `StrictLodVisibility` nor `StrictVoxyCoverageChanges.invalidateAll` appeared in the postpatch sampled stacks. This supports that the recurring visibility reset overhead is gone with prediction disabled. Sampling cannot establish that a method was never called or measure an exact zero execution cost.

The GPU remains heavily utilized. These captures do not provide a controlled FPS comparison; do not interpret the CPU sample reduction as an equal FPS improvement.

Other observed postpatch render-thread CPU sample shares: ElectroEnergetics wires 6.20%, Create Better FPS geometry 5.99%, Sodium occlusion 4.96%, GeckoLib geometry 4.44%, particles 1.55%. Categories may overlap and are not GPU or total-frame time shares.

Full Minecraft startup and active shader/Voxy rendering were exercised. This recording does not independently verify newly downloaded server LOD columns, prediction toggles, dimension changes, reconnects, or singleplayer. Those broader regression checks remain pending.

Local evidence: `diagnostics/render-postpatch.jfr`, `diagnostics/render-postpatch-analysis.txt`, and the earlier `diagnostics/render-recheck.jfr`. Diagnostic recordings are not included in the tracked patch backup.
