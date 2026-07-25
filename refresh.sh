#!/usr/bin/env bash
# Re-clone repos in this collection (shallow, .git stripped).
#   ./refresh.sh              # all
#   ./refresh.sh kysely zod   # only the named ones
set -uo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"

REPOS=$(cat <<'EOF'
01-type-level-programming|type-fest|https://github.com/sindresorhus/type-fest
01-type-level-programming|ts-toolbelt|https://github.com/millsp/ts-toolbelt
01-type-level-programming|hotscript|https://github.com/gvergnaud/hotscript
01-type-level-programming|type-challenges|https://github.com/type-challenges/type-challenges
01-type-level-programming|ts-pattern|https://github.com/gvergnaud/ts-pattern
01-type-level-programming|expect-type|https://github.com/mmkal/expect-type
02-inference-at-scale|tanstack-router|https://github.com/TanStack/router
02-inference-at-scale|trpc|https://github.com/trpc/trpc
02-inference-at-scale|hono|https://github.com/honojs/hono
02-inference-at-scale|elysia|https://github.com/elysiajs/elysia
02-inference-at-scale|tanstack-query|https://github.com/TanStack/query
03-schema-and-type-level-parsers|zod|https://github.com/colinhacks/zod
03-schema-and-type-level-parsers|arktype|https://github.com/arktypeio/arktype
03-schema-and-type-level-parsers|typebox|https://github.com/sinclairzx81/typebox
03-schema-and-type-level-parsers|valibot|https://github.com/fabian-hiller/valibot
03-schema-and-type-level-parsers|abitype|https://github.com/wevm/abitype
04-query-builders-orm|kysely|https://github.com/kysely-org/kysely
04-query-builders-orm|drizzle-orm|https://github.com/drizzle-team/drizzle-orm
05-functional-effects-hkt|effect|https://github.com/Effect-TS/effect
05-functional-effects-hkt|fp-ts|https://github.com/gcanti/fp-ts
05-functional-effects-hkt|neverthrow|https://github.com/supermacro/neverthrow
06-state-and-forms|xstate|https://github.com/statelyai/xstate
06-state-and-forms|react-hook-form|https://github.com/react-hook-form/react-hook-form
06-state-and-forms|zustand|https://github.com/pmndrs/zustand
06-state-and-forms|redux-toolkit|https://github.com/reduxjs/redux-toolkit
EOF
)

clone_one() {
  IFS='|' read -r cat dir url <<< "$1"
  dest="$ROOT/$cat/$dir"
  tmp="$dest.tmp.$$"
  mkdir -p "$ROOT/$cat"
  if git clone --depth 1 --single-branch --quiet "$url" "$tmp"; then
    rm -rf "$tmp/.git" "$dest"
    mv "$tmp" "$dest"
    echo "OK   $cat/$dir  $(du -sh "$dest" | cut -f1)"
  else
    rm -rf "$tmp"
    echo "FAIL $cat/$dir  $url"
  fi
}
export -f clone_one
export ROOT

selected="$REPOS"
if [ "$#" -gt 0 ]; then
  pattern=$(printf '%s\n' "$@" | paste -sd'|' -)
  selected=$(echo "$REPOS" | grep -E "\|($pattern)\|")
  [ -z "$selected" ] && { echo "No repos matched: $*"; exit 1; }
fi

echo "$selected" | xargs -P 6 -I{} bash -c 'clone_one "{}"'

# TypeScript compiler: sparse checkout of src/compiler only.
if [ "$#" -eq 0 ] || printf '%s\n' "$@" | grep -qx 'typescript'; then
  D="$ROOT/07-compiler-internals/typescript"
  T="$D.tmp.$$"
  mkdir -p "$T" && (
    cd "$T" || exit 1
    git init -q .
    git remote add origin https://github.com/microsoft/TypeScript.git
    git config core.sparseCheckout true
    printf 'src/compiler/*\n' > .git/info/sparse-checkout
    git fetch --depth 1 --quiet origin main
    git checkout -q FETCH_HEAD 2>/dev/null || git checkout -q -b main FETCH_HEAD
  ) && { rm -rf "$T/.git" "$D"; mv "$T" "$D"; echo "OK   07-compiler-internals/typescript  $(du -sh "$D" | cut -f1)"; } \
    || { rm -rf "$T"; echo "FAIL 07-compiler-internals/typescript"; }
fi
