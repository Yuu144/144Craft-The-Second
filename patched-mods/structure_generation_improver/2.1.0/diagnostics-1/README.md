# SGI 2.1.0 diagnostics-1 — DO NOT UPDATE

Minecraft 1.21.1 / NeoForge. Diagnostic instrumentation only; terrain math, filters,
reference selection and placement behavior are not intentionally changed.
This is not a seam fix. Logging itself adds overhead and can perturb timing.

## Files

- `../original.jar`: unmodified SGI 2.1.0.
- `patched.jar`: versioned patched backup, kept outside `mods` before installation.
- `SgiDiagnostics.java`: read-only runtime logging helper.
- `PatchSgi.java`: exact ASM transformation source (12 hooks in six classes).
- `build.py`: reproducible build, original-version check, bytecode analysis and hashes.
- `install.py`: install/restore, refusing unknown JAR hashes and preserving disabled state.
- `lib/`: ASM 9.10.1 build dependencies, not included in the installed JAR.
- `SHA256SUMS`: original, patch and build-dependency SHA-256 hashes.
- `CHANGED_CLASSES.txt`: changed original class entries.
- `installed-before.jar`: retained installation input, if there was a JAR in `mods`.

No decompiled original SGI source is included. SGI remains All Rights Reserved.
Patch/build sources make the injected changes inspectable without recompiling SGI.

## Build and restore

Requires Java 21 JDK and Python 3; no Python packages needed.

From this directory, on Windows or Linux:

```text
python build.py
python install.py install
```

Stop the game/server before replacing JARs. Installation preserves the current disabled
state; if SGI is absent from `mods`, it prepares a `.jar.disabled` file instead of enabling it.

Rollback:

```text
python install.py restore
```

This restores the original JAR in the same active/disabled location. Restart afterward.
Do not enable Foundations alongside SGI. No script changes configs or world files.

## Logs

`logs/sgi-diagnostics.log`, with rotated `.1`, `.2`, `.3` files.
Rotation uses a conservative 16 MiB estimate per file; old logs are overwritten.
Copy all four soon after reproducing. A startup `[SGI-DIAG]` console marker identifies the patch.

Records include timestamp, PID, sequence, thread, chunk context, object identities and:

- Reference expansion: raw starts and reference maps before/after.
- Plan lookup and evaluation: cache reuse can be inferred from `plan` without `evaluate`,
  structure ID, start chunk, validity, bounding box, filter verdict and anchor.
- Site construction: outline bounds and the eight-chunk visibility window.
- Shaper setup: references visible then and whether the result is null.
- Noise-chunk setup: existing cached state, returned chunk, cancellation and beardifier type.
- Carver entry/exit: cached noise state and wrapper identity.
- Actual shape profile: surface, strength, bottom, carving bounds and surface drop at
  each chunk-edge column plus the center. Coordinates are the fillColumn X/Z arguments.
- Explicit throws at instrumented exits. Implicit exceptions remain in Minecraft's normal log.

No per-density/per-block compute logging. Logging does not request neighbor chunks, resolve
new structure starts or iterate lazy StructureManager results. Reflective access failures are
reported as unavailable; helper failures are caught instead of failing terrain generation.
Detailed collections are truncated after 64 elements; this is a diagnostic limit, not a worldgen limit.
Thread chunk context is a correlation aid; exact X/Z arguments take precedence for profile samples.

To turn off logging without replacing the JAR, add JVM argument:
`-Dsgi.diagnostics.disabled=true` and restart.

## Reproduction

Keep seed, mods/configs, coordinates and travel/generation order recorded. Use fresh terrain.
Capture the seam with F3+G and block coordinates. Preserve the normal `latest.log`, mod list
and SGI/Structurify configs alongside all rotated diagnostic logs. Compare neighboring chunks:
reference visibility -> plan -> shaper -> noise wrapper -> edge surface/strength.

The patch does not add hooks inside Structurify or alternative generators. If those bypass
SGI's entry points entirely, missing events are evidence, not a reason to assume the helper failed.

## Validation

- Original JAR hash checked before building.
- All 12 target methods found; original resources/config and all other classes unchanged.
- ASM BasicVerifier analysis passed for every method in the six modified classes.
- Java 21 / NeoForge 21.1.264 isolated dedicated server reached `Done` and stopped normally.
- Forced-structure test in a disposable vanilla world exercised wrapping and actual shape profiles.
  No unavailable reflective fields/methods appeared in the observed test records.
- Full modpack reproduction and production runtime verification remain pending.
- Development test files: `C:/Users/Yuu14/AppData/Local/Temp/opencode/sgi-diagnostics-smoke/`.
