#!/usr/bin/env bash
set -euo pipefail

# Usage: ./scripts/push.sh [gitlab-remote-url]
# If a remote URL is provided, the script will add it as 'origin' if missing and push.

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_DIR"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Initializing git repo..."
  git init
  git add .
  git commit -m "chore: scaffold denmark-ga wiki and docs"
fi

if [ "$#" -ge 1 ]; then
  REMOTE_URL="$1"
  if ! git remote | grep -q '^origin$'; then
    git remote add origin "$REMOTE_URL"
  fi
  git branch -M main || true
  git push -u origin main
else
  echo "No remote provided. To push, run: ./scripts/push.sh <gitlab-repo-ssh-or-https-url>"
fi
