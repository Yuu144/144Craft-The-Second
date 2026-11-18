"""Verify, install, or restore the preserved client JAR with hash checks."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import tempfile

HERE = Path(__file__).resolve().parent
INSTANCE = HERE.parents[3]
INSTALLED = INSTANCE / "mods/vss-0.3.5-neoforge-1.21.1.jar"


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("action", choices=("verify", "install", "restore-original"))
    args = parser.parse_args()
    hashes = json.loads((HERE / "SHA256SUMS.json").read_text(encoding="utf-8"))
    for name in ("../original.jar", "patched.jar"):
        if sha(HERE / name) != hashes[name]:
            raise SystemExit(f"Backup hash mismatch: {name}")
    current = sha(INSTALLED) if INSTALLED.exists() else None
    if args.action == "verify":
        if current != hashes["patched.jar"]:
            raise SystemExit(f"Installed JAR is not patch-1. SHA-256: {current}")
        print("Verified: installed JAR matches the preserved patch-1 backup.")
        return
    wanted = "patched.jar" if args.action == "install" else "../original.jar"
    if current == hashes[wanted]:
        print("Already installed:", wanted)
        return
    if current not in (None, hashes["../original.jar"], hashes["patched.jar"]):
        saved = HERE / f"replaced-{current}.jar"
        if not saved.exists():
            saved.write_bytes(INSTALLED.read_bytes())
        if sha(saved) != current:
            raise SystemExit("Could not preserve the unexpectedly updated installed JAR.")
        print("Preserved the replaced version:", saved)
    temporary = None
    try:
        with tempfile.NamedTemporaryFile(dir=INSTALLED.parent, suffix=".patch-tmp", delete=False) as file:
            temporary = Path(file.name)
            file.write((HERE / wanted).read_bytes())
        if sha(temporary) != hashes[wanted]:
            raise SystemExit("Temporary copy failed verification.")
        os.replace(temporary, INSTALLED)
        if sha(INSTALLED) != hashes[wanted]:
            raise SystemExit("Installed hash mismatch.")
    except PermissionError:
        raise SystemExit("Minecraft is locking the JAR. Close Minecraft and run this command again.")
    finally:
        if temporary is not None and temporary.exists():
            temporary.unlink()
    print("Installed and verified:", INSTALLED)
    print("Restart Minecraft to load this JAR.")


if __name__ == "__main__":
    main()
