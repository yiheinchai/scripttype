#!/usr/bin/env bash
OUT=/private/tmp/claude-501/-Users-yihein-chai-Documents-learn-ScriptType/93f73cb3-6a6e-4bc6-904f-cd19c8f6ebbe/scratchpad
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
