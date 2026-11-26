# WGA 0.70.5 — SGI compatibility patch 2 — DO NOT UPDATE

Quiet replacement for sgi-compat-1. Keeps the same SGI-only full-height CPU noise-filling
fallback, but removes the added WGA-SGI-COMPAT messages and tracking set.
No terrain, config, shader, ordinary-chunk fallback or world changes.

Original: Worldgen Accelerator 0.70.5+mc1.21.1, NeoForge 1.21.1.
Installed filename: mods/wgaccel-neoforge-0.70.5+mc1.21.1.jar.
Original backup: ../original.jar. Versioned quiet patch: patched.jar.
Earlier sgi-compat-1 archive retained.

SgiTerrainCompat.java and PatchWga.java contain all runtime changes.
TestCompat.java is the offline regression test. lib/ holds build-only ASM dependencies/license.
SHA256SUMS records original, patched and dependency hashes.

With Java 21 JDK and Python 3, from this directory:

```text
python build.py
python install.py install
```

Close the game/server before replacement. install.py preserves active/disabled state,
refuses unknown hashes, retains installed-before.jar and replaces atomically.
If Windows locks the JAR, installed files stay unchanged; close the game and retry.

Restore upstream WGA using python install.py restore and restart afterward.
To remove SGI diagnostics, restore SGI's original versioned original.jar using the retained
diagnostics-2/install.py restore script separately. Original upstream SGI and this WGA patch
are compatible; SGI's diagnostic modifications are not needed for the compatibility fix.
Existing logs are not deleted. Neither script changes configs or worlds.

Validation: bytecode analysis and JVM verification passed. Regression tests confirm SGI still
selects both fallbacks while vanilla, unrelated wrappers and null keep baseline decisions.
The compatibility logic is unchanged from patch 1, which passed the isolated real-SGI-wrapper
probe. Patch 2 removes only our runtime messages/tracking; normal upstream logging remains.

Original SHA256: d1cad121843252ad3ee777d50e1aea849fbcadb2942a0af26321c555238e7816
Patched SHA256: 760f8837f6c9126086160313060ee9c6641143112b12b7294ab4d3f022aab9f9

DO NOT UPDATE until this patch is checked/reapplied. Recheck when updating SGI as well.
