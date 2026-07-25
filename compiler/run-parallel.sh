#!/usr/bin/env bash
# Round-trip the whole corpus across parallel shards.
#
# Sharding is by file, not by repository: repositories differ in size by more than an
# order of magnitude, so per-repository parallelism leaves workers idle waiting for the
# largest one. Each shard writes its own JSON; aggregate/materialise merge them.
set -uo pipefail
cd "$(dirname "$0")"
OUT="${SCRIPTTYPE_OUT:-$PWD/.results}/inplace"
WORKERS="${SCRIPTTYPE_WORKERS:-$(( $(sysctl -n hw.ncpu 2>/dev/null || nproc) - 2 ))}"
[ "$WORKERS" -lt 1 ] && WORKERS=1
ROOTS=("$@")
if [ ${#ROOTS[@]} -eq 0 ]; then
  ROOTS=(01-type-level-programming 02-inference-at-scale 03-schema-and-type-level-parsers \
         04-query-builders-orm 05-functional-effects-hkt 06-state-and-forms 07-compiler-internals)
fi

rm -rf "$OUT"; mkdir -p "$OUT"
echo "sharding across $WORKERS workers: ${ROOTS[*]}"
START=$(date +%s)
for k in $(seq 0 $((WORKERS - 1))); do
  NODE_OPTIONS=--max-old-space-size=4096 ./node_modules/.bin/tsx src/inplace.ts \
    "${ROOTS[@]}" --shard "$k/$WORKERS" --json "$OUT/shard$k.json" > "$OUT/shard$k.txt" 2>&1 &
done
wait
echo "elapsed $(( $(date +%s) - START ))s"
grep -h '^covered:' "$OUT"/shard*.txt 2>/dev/null | head -3
ls "$OUT"/*.json 2>/dev/null | wc -l | xargs echo "shard files:"
