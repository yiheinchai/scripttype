#!/usr/bin/env bash
# One complete corpus measurement: sharded run, then sweeps until nothing is unmeasured.
#
# A capped shard leaves the files after its cut unmeasured, which silently shrinks the
# coverage denominator. Sweeping afterwards — one file per batch, longer cap — measures
# those, and repeating converges on the handful the checker genuinely cannot finish.
set -uo pipefail
cd "$(dirname "$0")"
START=$(date +%s)
./run-parallel.sh || exit 1
for pass in 1 2; do
  N=$(node dist/list-unmeasured.js .results/inplace | wc -l | tr -d ' ')
  [ "$N" -eq 0 ] && break
  echo "sweep pass $pass: $N unmeasured"
  SWEEP_CAP=$(( 180 * pass )) SWEEP_TAG="$pass" ./sweep.sh >/dev/null 2>&1
done
LEFT=$(node dist/list-unmeasured.js .results/inplace | tee .results/hung.txt | wc -l | tr -d ' ')
echo "unmeasured after sweeps: $LEFT"
[ "$LEFT" -gt 0 ] && node dist/record-timeouts.js .results/hung.txt .results/inplace/timeouts.json
./node_modules/.bin/tsx src/aggregate.ts .results/inplace --md ../COVERAGE.md > .results/agg.txt 2>&1
grep -E "Partial run|^\| \*\*TOTAL" .results/agg.txt
echo "total wall: $(( $(date +%s) - START ))s"
