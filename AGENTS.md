# Workspace instructions

- Always make server and client changes separately.
- Make server changes directly on the remote server, in the server's own files and Git checkout. Do not stage server edits in this client instance.
- Make client changes in this local `144Craft-The-Second` instance.
- Shared modpack recipe and progression changes must work in singleplayer too. Unless explicitly scoped to one side, apply them separately to both the remote server and this local instance, including required scripts and datapack tags. Local `kubejs/server_scripts` run in the singleplayer integrated server.
- If committing or pushing both, do so separately from each location and verify each result independently.
- After finishing a task, ask whether to commit and push the completed changes.
- Use `PROGRESSION.canvas` only for in-game progression and recipe changes. Keep workflow instructions, documentation preferences, and commit style in this Markdown file.
- Keep comments in KubeJS files very simple, such as just the item name.
- Keep Git/GitHub commit messages very simple and short.
- Keep progression canvas text simple and match the existing cards: item names, short labels such as `MAKE WITH`, `NEEDS`, and `POWER`, and brief arrows. Avoid long explanations and repeated text.

## Patched mods

- Document every patched mod in `PATCHED_MODS.md`, including its name, original version, installed JAR filename, client/server location, patch purpose, and backup/source paths. Clearly mark it `DO NOT UPDATE` until the patch has been checked or reapplied to the replacement version.
- Before installing a patched mod, keep a versioned copy of the patched JAR outside `mods`, under `patched-mods/<mod-id>/<version>/` in the relevant client or server checkout. Keep the original JAR and SHA-256 hashes there too so accidental replacements can be identified and restored.
- Keep the patched source code or source diff, any patch/build scripts, and simple build and restore instructions alongside the backup. A patched JAR alone is not enough; the changed code must remain inspectable and reproducible.
- When updating mods, check `PATCHED_MODS.md` first. Preserve existing patch backups, and verify or reapply each affected patch before replacing its installed JAR.
- Keep client and server patch documentation and backups separately in their respective locations.

## Remote server access

- Minecraft server SSH host: `192.168.178.83` (user: `root`).
- SSH key directory: `C:\Users\Yuu14\Desktop\144CRAFT\144craft_server`.
- OpenSSH private key: `C:\Users\Yuu14\Desktop\144CRAFT\144craft_server\private_openssh_key`.
- Connect with: `ssh -i "C:\Users\Yuu14\Desktop\144CRAFT\144craft_server\private_openssh_key" root@192.168.178.83`.
- Use this host for remote Minecraft server work. Keep private key contents out of documentation and Git.

## Custom recipes

- When changing a recipe, use crafted components made from the required material, such as plates, gears, screws, bolts, or machine parts. Do not rely only on raw ingots or blocks when suitable components exist.
- Make progression recipes meaningfully expensive: require a significant amount of material through multiple components.
- For a material or component available from multiple mods, prefer sources in this order:
  1. AllTheOres
  2. Modern Industrialization or its addons
- For more information about the progression line, consult `PROGRESSION.canvas` or a similar current progression canvas before changing recipes.
