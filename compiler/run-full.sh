#!/usr/bin/env bash
# Run the round-trip per repository in separate processes to bound memory.
OUT=/private/tmp/claude-501/-Users-yihein-chai-Documents-learn-ScriptType/93f73cb3-6a6e-4bc6-904f-cd19c8f6ebbe/scratchpad
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
