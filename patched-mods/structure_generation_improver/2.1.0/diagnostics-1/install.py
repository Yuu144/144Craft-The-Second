from pathlib import Path
import hashlib
import shutil
import sys

base = Path(__file__).resolve().parent
root = base.parents[3]
name = "structure_generation_improver-2.1.0-neoforge-1.21.1.jar"
original = base.parent / "original.jar"
patched = base / "patched.jar"
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(original) == "344dade71609f73dcb68ce06c535b82b54055019cfa9df877c052b276b0fab1a"
mode = sys.argv[1] if len(sys.argv) > 1 else "install"
assert mode in ("install", "restore")
assert patched.is_file()
checks = dict(line.split("  ", 1)[::-1] for line in (base / "SHA256SUMS").read_text().splitlines())
assert sha(patched) == checks["patched.jar"]
active = root / "mods" / name
disabled = root / "mods" / (name + ".disabled")
assert not (active.exists() and disabled.exists()), "Ambiguous installation; inspect both JARs"
target = active if active.exists() else disabled
if target.exists():
    assert sha(target) in (sha(original), sha(patched)), "Unknown installed JAR; not overwriting"
    backup = base / "installed-before.jar"
    if not backup.exists():
        shutil.copy2(target, backup)
source = patched if mode == "install" else original
shutil.copy2(source, target)
assert sha(target) == sha(source)
print(mode, target, sha(target))
print("Restart required. Enabled/disabled state preserved; no worlds modified.")
