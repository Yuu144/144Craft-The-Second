"""Build and check the pinned VSS patch using the preserved baseline and ASM libraries."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import zipfile

HERE = Path(__file__).resolve().parent
BASELINE_SHA256 = "6abc84e84cc40030d49f974f3e40055020b5121bcc1a72193cef7a69677a7559"
ENTRY = "dev/xantha/vss/compat/StrictLodVisibility.class"


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--jdk", type=Path, help="JDK root; otherwise use javac on PATH")
    args = parser.parse_args()
    javac = str(args.jdk / "bin/javac.exe") if args.jdk else shutil.which("javac")
    if not javac:
        raise SystemExit("A JDK with javac is required (JDK 21 recommended).")
    java = str(Path(javac).with_name("java.exe" if os.name == "nt" else "java"))
    original = HERE.parent / "original.jar"
    if sha(original) != BASELINE_SHA256:
        raise SystemExit("Original JAR differs from the inspected baseline; refusing patch.")
    build = HERE / "build"
    build.mkdir(exist_ok=True)
    libraries = sorted((HERE / "lib").glob("*.jar"))
    if len(libraries) != 5:
        raise SystemExit("Expected the five preserved ASM 9.8 libraries.")
    classpath = os.pathsep.join(map(str, libraries))
    runtime_cp = os.pathsep.join((str(build), classpath))
    subprocess.run([javac, "--release", "21", "-cp", classpath, "-d", str(build),
                    *map(str, (HERE / n for n in (
                        "PatchVss.java", "PrepareHarness.java", "VisibilityHarness.java")))], check=True)
    with zipfile.ZipFile(original) as jar:
        if any(n.upper().endswith((".SF", ".RSA", ".DSA")) for n in jar.namelist()):
            raise SystemExit("Signed baseline is unsupported.")
        (build / "original.class").write_bytes(jar.read(ENTRY))
    subprocess.run([java, "-cp", runtime_cp, "PatchVss", str(build / "original.class"),
                    str(build / "patched.class")], check=True)
    subprocess.run([java, "-cp", runtime_cp, "PrepareHarness", str(build / "patched.class"),
                    str(build / "VisibilityHarness.class")], check=True)
    subprocess.run([java, "-Xverify:all", "-cp", str(build), "VisibilityHarness"], check=True)

    patched = HERE / "patched.jar"
    marker = "META-INF/144craft-vss-patch.txt"
    marker_text = (
        "144Craft VSS patch-1: DO NOT UPDATE without reapplying/reviewing.\n"
        "Baseline: VSS 0.3.5-neoforge-1.21.1\n"
        "Client only: skip inactive visibility frames; preserve main-view coverage "
        "for null/invalid viewports. Network ingestion hooks unchanged.\n"
        "Sources, baseline, backups and restore instructions: "
        "patched-mods/vss/0.3.5-neoforge-1.21.1/patch-1/\n"
    )
    with zipfile.ZipFile(original) as source, zipfile.ZipFile(patched, "w") as target:
        for info in source.infolist():
            target.writestr(info, (build / "patched.class").read_bytes()
                            if info.filename == ENTRY else source.read(info.filename))
        info = zipfile.ZipInfo(marker, (2026, 11, 18, 0, 0, 0))
        info.compress_type = zipfile.ZIP_DEFLATED
        target.writestr(info, marker_text)
    with zipfile.ZipFile(original) as source, zipfile.ZipFile(patched) as target:
        assert target.testzip() is None
        assert set(target.namelist()) - set(source.namelist()) == {marker}
        assert set(source.namelist()) - set(target.namelist()) == set()
        changed = [n for n in source.namelist() if source.read(n) != target.read(n)]
        assert changed == [ENTRY], changed
    hashes = {"../original.jar": sha(original), "patched.jar": sha(patched)}
    hashes.update({str(p.relative_to(HERE)).replace("\\", "/"): sha(p)
                   for p in sorted(HERE.glob("*.java")) + sorted(HERE.glob("*.py"))
                   + sorted((HERE / "source").glob("*")) + libraries})
    (HERE / "SHA256SUMS.json").write_text(json.dumps(hashes, indent=2) + "\n", encoding="utf-8")
    (HERE / "VALIDATION.txt").write_text(
        "PASS: baseline SHA-256 matches the inspected JAR.\n"
        "PASS: ASM structural and full beginFrame data-flow verification.\n"
        "PASS: all other methods in StrictLodVisibility are unchanged.\n"
        "PASS: JVM -Xverify:all on the extracted patched prefix with dependency stubs.\n"
        "PASS: inactive frames skip work; disabling clears previous active state once.\n"
        "PASS: null/zero viewport preserves coverage; valid active view continues.\n"
        "PASS: missing world/player retains lifecycle cleanup.\n"
        "PASS: only StrictLodVisibility.class changes; patch marker added.\n"
        "PASS: all network classes, mixins, mod metadata and other entries are byte-identical.\n"
        "NOT TESTED: full Minecraft restart, LOD arrival/rendering, live FPS, prediction toggles.\n",
        encoding="utf-8")
    print("Built", patched)
    print("SHA-256", hashes["patched.jar"])


if __name__ == "__main__":
    main()
