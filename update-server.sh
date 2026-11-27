#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

echo "Pulling updates; local changes and untracked files will be kept..."
if git pull --ff-only; then
  echo "Update complete. Local changes and existing stashes were left in place."
else
  echo "Update stopped. Check Git's message; local changes and existing stashes were left in place." >&2
  echo "If incoming changes overlap local files, resolve those files before retrying." >&2
  exit 1
fi
