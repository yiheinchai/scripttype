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
#
# An incremental build exits 0 without emitting anything when its build info says the
# sources are unchanged, so a `dist` that was deleted since the last build stays deleted
# and tsc's exit code says nothing about it. Discard the build info when the entrypoint is
# missing, and confirm the entrypoint afterwards rather than trusting the exit code.
[ -f dist/inplace.js ] || rm -f .results/tsbuildinfo.build
./node_modules/.bin/tsc -p tsconfig.build.json || exit 1
[ -f dist/inplace.js ] || { echo "build emitted no dist/inplace.js" >&2; exit 1; }

# Shards run from a private copy of the build, not from `dist` itself, because `pnpm build`
# begins with `rm -rf dist`: a build started elsewhere while a sweep is in flight deletes
# the code out from under the shards that have not been scheduled yet, and those die with
# MODULE_NOT_FOUND having measured nothing. The copy is a sibling of `dist` because the
# harness locates the corpus relative to its own directory.
RUN_DIR="$PWD/dist-run.$$"
rm -rf "$RUN_DIR"; cp -R dist "$RUN_DIR"
trap 'rm -rf "$RUN_DIR"' EXIT

echo "$SHARDS shards across $WORKERS workers: ${ROOTS[*]}"
START=$(date +%s)
# Each shard runs under a wall-clock cap. A single corpus file can occupy the checker for
# many minutes, and without a cap one such file holds the whole run to its own time.
# Shards persist results after every batch, so a capped shard keeps what it finished.
SHARD_CAP="${SCRIPTTYPE_SHARD_CAP:-150}"
run_shard() {
  local k="$1"
  env NODE_OPTIONS=--max-old-space-size=4096 node "$RUN_DIR/inplace.js" \
    ${ROOTS_STR} --shard "$k/$SHARDS" --json "$OUT/shard$k.json" 2>"$OUT/shard$k.txt" >/dev/null &
  local pid=$!
  ( sleep "$SHARD_CAP"; kill -9 "$pid" 2>/dev/null ) &
  local killer=$!
  wait "$pid" 2>/dev/null
  kill "$killer" 2>/dev/null
}
export -f run_shard
export ROOTS_STR="${ROOTS[*]}" SHARDS OUT SHARD_CAP RUN_DIR

printf '%s\n' $(seq 0 $((SHARDS - 1))) | xargs -P "$WORKERS" -I{} \
  bash -c 'run_shard {}'
echo "elapsed $(( $(date +%s) - START ))s (cap ${SHARD_CAP}s x $SHARDS shards / $WORKERS workers)"
ls "$OUT"/*.json 2>/dev/null | wc -l | xargs echo "shard files:"

# Name the shards that wrote nothing at all, and show why. A shard killed at its cap keeps
# the batches it finished, but one that dies before its first batch contributes no outcomes
# at all — and the coverage report then describes less than the whole corpus without
# anything here saying so.
#
# Only a shard that also wrote to stderr is treated as a failure: reaching the cap during
# the very first batch leaves no JSON either, and that is expected on the heaviest slices.
MISSING=()
CRASHED=()
for k in $(seq 0 $((SHARDS - 1))); do
  [ -f "$OUT/shard$k.json" ] && continue
  MISSING+=("$k")
  [ -s "$OUT/shard$k.txt" ] && CRASHED+=("$k")
done
if [ ${#MISSING[@]} -gt 0 ]; then
  echo "shards that measured nothing: ${MISSING[*]}" >&2
fi
if [ ${#CRASHED[@]} -gt 0 ]; then
  echo "shards that failed outright: ${CRASHED[*]}" >&2
  sed -n '1,12p' "$OUT/shard${CRASHED[0]}.txt" >&2
  exit 1
fi
