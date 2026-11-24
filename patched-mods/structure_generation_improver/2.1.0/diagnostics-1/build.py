from pathlib import Path
import hashlib
import os
import subprocess
import sys
import zipfile

base = Path(__file__).resolve().parent
original = base.parent / "original.jar"
expected = "344dade71609f73dcb68ce06c535b82b54055019cfa9df877c052b276b0fab1a"
assert hashlib.sha256(original.read_bytes()).hexdigest() == expected, "Wrong original SGI version"
lib = base / "lib"
deps = [lib / (name + "-9.10.1.jar") for name in ["asm", "asm-commons", "asm-tree", "asm-analysis"]]
assert all(p.is_file() for p in deps), "Missing bundled ASM build dependencies"
cp = os.pathsep.join(map(str, deps))
classes = base / "build" / "classes"
classes.mkdir(parents=True, exist_ok=True)
subprocess.run(["javac", "--release", "21", "-cp", cp, "-d", str(classes),
                str(base / "SgiDiagnostics.java"), str(base / "PatchSgi.java")], check=True)
patched = base / "patched.jar"
subprocess.run(["java", "-cp", str(classes) + os.pathsep + cp, "PatchSgi",
                str(original), str(patched), str(classes)], check=True)
with zipfile.ZipFile(original) as a, zipfile.ZipFile(patched) as b:
    modified = [n for n in a.namelist() if a.read(n) != b.read(n)]
    assert len(modified) == 6, modified
    assert set(b.namelist()) - set(a.namelist()) == {"com/vivideru/sgi/diagnostics/SgiDiagnostics.class"}
    (base / "CHANGED_CLASSES.txt").write_text("\n".join(modified) + "\n")
paths = [original, patched] + deps
(base / "SHA256SUMS").write_text("".join(
    hashlib.sha256(p.read_bytes()).hexdigest() + "  " + os.path.relpath(p, base).replace("\\", "/") + "\n"
    for p in paths))
print("Patched SHA256:", hashlib.sha256(patched.read_bytes()).hexdigest())
