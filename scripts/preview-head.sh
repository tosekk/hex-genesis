#!/bin/sh
# Playtest the COMMITTED build. The dev server hot-reloads (and loses the run) whenever any agent saves
# a file in the shared checkout; this builds `git HEAD` in a temp dir and serves it statically.
# Usage: npm run preview:head   (then open http://localhost:4199/?seed=7)
set -e
ROOT=$(cd "$(dirname "$0")/.." && pwd)
DIR=$(mktemp -d "${TMPDIR:-/tmp}/terraform-head.XXXXXX")
git -C "$ROOT" archive HEAD | tar -x -C "$DIR"
ln -s "$ROOT/node_modules" "$DIR/node_modules"
echo "Building $(git -C "$ROOT" rev-parse --short HEAD) in $DIR"
(cd "$DIR" && npx vite build --logLevel warn)
cd "$DIR" && exec npx vite preview --port "${PORT:-4199}" --strictPort
