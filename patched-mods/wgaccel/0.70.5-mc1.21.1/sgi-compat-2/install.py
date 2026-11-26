from pathlib import Path
import hashlib
import shutil
import sys

base = Path(__file__).resolve().parent
root = base.parents[3]
original = base.parent / "original.jar"
patched = base / "patched.jar"
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(original) == "d1cad121843252ad3ee777d50e1aea849fbcadb2942a0af26321c555238e7816"
checks = dict(line.split("  ", 1)[::-1] for line in (base / "SHA256SUMS").read_text().splitlines())
assert sha(patched) == checks["patched.jar"]
mode = sys.argv[1] if len(sys.argv) > 1 else "install"
assert mode in ("install", "restore")
active = root / "mods/wgaccel-neoforge-0.70.5+mc1.21.1.jar"
disabled = active.with_name(active.name + ".disabled")
assert active.exists() != disabled.exists(), "Expected exactly one known WGA installation"
target = active if active.exists() else disabled
previous = base.with_name("sgi-compat-1") / "patched.jar"
allowed = [sha(original), sha(patched)] + ([sha(previous)] if previous.exists() else [])
assert sha(target) in allowed, "Unknown installed JAR; not overwriting"
backup = base / "installed-before.jar"
if not backup.exists():
    shutil.copy2(target, backup)
source = patched if mode == "install" else original
temporary = target.with_name(target.name + ".sgi-compat-2.tmp")
assert not temporary.exists(), "Previous temporary install needs review"
shutil.copy2(source, temporary)
assert sha(temporary) == sha(source)
try:
    temporary.replace(target)
except PermissionError:
    assert sha(temporary) == sha(source)
    temporary.unlink()
    raise SystemExit("WGA JAR is locked. Close the game/server and rerun; installed JAR unchanged.")
assert sha(target) == sha(source)
print(mode, target, sha(target))
print("Restart required; active/disabled state preserved. No configs/worlds modified.")
