#!/usr/bin/env bash
# Measure whatever an earlier capped run left out.
#
# A capped shard stops mid-list, so files after the cut are simply absent from the
# results. This finds them and revisits them one file per batch with a longer cap, so a
# single pathological file can only cost itself rather than everything queued behind it.
set -uo pipefail
cd "$(dirname "$0")"
OUT="${SCRIPTTYPE_OUT:-$PWD/.results}/inplace"
CAP="${SWEEP_CAP:-240}"
WORKERS="${SCRIPTTYPE_WORKERS:-10}"

node dist/list-unmeasured.js "$OUT" > .results/unmeasured.txt
N=$(wc -l < .results/unmeasured.txt | tr -d ' ')
echo "unmeasured files: $N"
[ "$N" -eq 0 ] && exit 0

SHARDS=$(( N < WORKERS ? N : WORKERS ))
for k in $(seq 0 $((SHARDS - 1))); do
  (
    env NODE_OPTIONS=--max-old-space-size=4096 node dist/inplace.js \
      --files .results/unmeasured.txt --shard "$k/$SHARDS" --batch 1 \
      --json "$OUT/sweep$k.json" >/dev/null 2>"$OUT/sweep$k.txt" &
    pid=$!
    ( sleep "$CAP"; kill -9 "$pid" 2>/dev/null ) & killer=$!
    wait "$pid" 2>/dev/null; kill "$killer" 2>/dev/null
  ) &
done
wait
echo "sweep done"
