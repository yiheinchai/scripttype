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
# Many more shards than workers, scheduled by xargs. With shards == workers a single
# heavy shard blocks the whole run to its own wall time; oversharding lets fast workers
# pick up remaining slices instead of idling.
# Shards per worker trades scheduling granularity against the worst-case wall time: the
# cap applies per shard, so W workers and S shards allow ceil(S/W) * CAP in the worst case.
SHARDS="${SCRIPTTYPE_SHARDS:-$(( WORKERS * 3 ))}"
ROOTS=("$@")
if [ ${#ROOTS[@]} -eq 0 ]; then
  ROOTS=(01-type-level-programming 02-inference-at-scale 03-schema-and-type-level-parsers \
         04-query-builders-orm 05-functional-effects-hkt 06-state-and-forms 07-compiler-internals)
fi

rm -rf "$OUT"; mkdir -p "$OUT"
# Run the built JavaScript, not tsx. Ten concurrent tsx processes race on its shared
# compile cache and fail with errors from inside the loader ("renderImports is not
# defined"), and node also starts faster with nothing to transpile.
./node_modules/.bin/tsc -p tsconfig.build.json || exit 1
echo "$SHARDS shards across $WORKERS workers: ${ROOTS[*]}"
START=$(date +%s)
# Each shard runs under a wall-clock cap. A single corpus file can occupy the checker for
# many minutes, and without a cap one such file holds the whole run to its own time.
# Shards persist results after every batch, so a capped shard keeps what it finished.
SHARD_CAP="${SCRIPTTYPE_SHARD_CAP:-150}"
run_shard() {
  local k="$1"
  env NODE_OPTIONS=--max-old-space-size=4096 node dist/inplace.js \
    ${ROOTS_STR} --shard "$k/$SHARDS" --json "$OUT/shard$k.json" 2>"$OUT/shard$k.txt" >/dev/null &
  local pid=$!
  ( sleep "$SHARD_CAP"; kill -9 "$pid" 2>/dev/null ) &
  local killer=$!
  wait "$pid" 2>/dev/null
  kill "$killer" 2>/dev/null
}
export -f run_shard
export ROOTS_STR="${ROOTS[*]}" SHARDS OUT SHARD_CAP

printf '%s\n' $(seq 0 $((SHARDS - 1))) | xargs -P "$WORKERS" -I{} \
  bash -c 'run_shard {}'
echo "elapsed $(( $(date +%s) - START ))s (cap ${SHARD_CAP}s x $SHARDS shards / $WORKERS workers)"
ls "$OUT"/*.json 2>/dev/null | wc -l | xargs echo "shard files:"
