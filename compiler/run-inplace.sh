#!/usr/bin/env bash
# Output directory for per-repo results; override with SCRIPTTYPE_OUT.
OUT="${SCRIPTTYPE_OUT:-$(cd "$(dirname "$0")" && pwd)/.results}"
TIMEOUT=""
if command -v gtimeout >/dev/null 2>&1; then TIMEOUT="gtimeout 2400"; fi
mkdir -p "$OUT/inplace"
: > "$OUT/inplace-summary.txt"
for cat in ../0*/; do
  for repo in "$cat"*/; do
    rel="${repo#../}"; rel="${rel%/}"
    name=$(echo "$rel" | tr '/' '_')
    NODE_OPTIONS=--max-old-space-size=6144 $TIMEOUT npx tsx src/inplace.ts "$rel" \
      --json "$OUT/inplace/$name.json" > "$OUT/inplace/$name.txt" 2>&1
    line=$(grep -E '^covered:' "$OUT/inplace/$name.txt" | tail -1)
    echo "$rel  ${line:-FAILED}" | tee -a "$OUT/inplace-summary.txt"
  done
done
