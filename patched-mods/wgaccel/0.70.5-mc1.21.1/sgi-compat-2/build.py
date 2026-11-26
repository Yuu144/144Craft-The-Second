from pathlib import Path
import hashlib
import os
import subprocess
import zipfile

base = Path(__file__).resolve().parent
original = base.parent / "original.jar"
assert hashlib.sha256(original.read_bytes()).hexdigest() == "d1cad121843252ad3ee777d50e1aea849fbcadb2942a0af26321c555238e7816"
deps = [base / "lib" / (name + "-9.10.1.jar") for name in ["asm", "asm-tree", "asm-analysis"]]
assert all(p.is_file() for p in deps)
cp = os.pathsep.join(map(str, deps))
classes = base / "build" / "classes"
classes.mkdir(parents=True, exist_ok=True)
subprocess.run(["javac", "--release", "21", "-proc:none", "-cp", cp, "-d", str(classes)]
    + [str(base / name) for name in ["SgiTerrainCompat.java", "PatchWga.java", "TestCompat.java"]], check=True)
run_cp = str(classes) + os.pathsep + cp
patched = base / "patched.jar"
subprocess.run(["java", "-cp", run_cp, "PatchWga", str(original), str(patched), str(classes)], check=True)
subprocess.run(["java", "-Xverify:all", "-cp", run_cp, "TestCompat", str(patched)], check=True)
with zipfile.ZipFile(original) as a, zipfile.ZipFile(patched) as b:
    assert [n for n in a.namelist() if a.read(n) != b.read(n)] == ["com/wgaccel/gen/ModTerrain.class"]
    assert set(b.namelist()) - set(a.namelist()) == {"com/wgaccel/compat/SgiTerrainCompat.class"}
paths = [original, patched] + deps
(base / "SHA256SUMS").write_text("".join(
    hashlib.sha256(p.read_bytes()).hexdigest() + "  " + os.path.relpath(p, base).replace("\\", "/") + "\n"
    for p in paths))
print("Patched SHA256:", hashlib.sha256(patched.read_bytes()).hexdigest())
