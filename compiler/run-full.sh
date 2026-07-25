#!/usr/bin/env bash
# Run the round-trip per repository in separate processes to bound memory.
# Output directory for per-repo results; override with SCRIPTTYPE_OUT.
OUT="${SCRIPTTYPE_OUT:-$(cd "$(dirname "$0")" && pwd)/.results}"
mkdir -p "$OUT/per-repo"
: > "$OUT/summary.txt"
for cat in ../0*/; do
  for repo in "$cat"*/; do
    rel="${repo#../}"; rel="${rel%/}"
    name=$(echo "$rel" | tr '/' '_')
    NODE_OPTIONS=--max-old-space-size=6144 npx tsx src/batch.ts "$rel" \
      --json "$OUT/per-repo/$name.json" > "$OUT/per-repo/$name.txt" 2>&1
    line=$(grep -E '^covered:' "$OUT/per-repo/$name.txt" | tail -1)
    echo "$rel  ${line:-CRASHED}" >> "$OUT/summary.txt"
    echo "$rel  ${line:-CRASHED}"
  done
done
