# Production-quality checklist

The bar: **as refined as the `typescript` package itself.** Not feature parity — that is a
different and much larger thing — but the same standard of finish. You install it, run it,
and everything it claims is true and measured.

A box is only ticked when it has been *verified*, with the evidence named. "Looks right" is
not verification. Anything measured gets a number, and the number gets re-measured when the
thing it describes changes.

This file is the session's stopping condition: work continues while unticked boxes remain.

## Done

- [x] **A command line exists.** `build`, `check`, `watch`, `convert`, `explain`,
      `builtins`, `init`, with `--json`, `--out`, `--force`, `--stdout`.
- [x] **Errors teach.** 30 `ST####` codes, source frames with carets, a `help:` line,
      "did you mean" suggestions, and all errors in a file reported in one pass.
- [x] **Emitted TypeScript is readable.** Width-aware wrapping; a chain of conditionals
      keeps every guard in one column instead of building a pyramid.
- [x] **The obvious JavaScript spelling works.** 32 of 33 probed constructs compile; the
      holdout is numeric comparison, which TypeScript genuinely cannot do.
- [x] **Multi-file projects work.** Imports are carried through and rewritten; a two-module
      project typechecks as source and its output typechecks under stock `tsc`.
- [x] **A migration path exists.** `scripttype convert` on all 215 files of type-fest
      produces 198 modules and 443 aliases, none of them using `raw()`, of which 196
      check with no errors and no warnings.
      *The earlier reading of this line — 205 files, 189 modules, 172 clean — was taken
      before the clone was refreshed, and all three numbers had moved. Re-measured with
      `convert … --declarations --force` then `check`.*
- [x] **Instantiation cost is measured, not asserted.** 0.90x against the hand-written
      originals over 20 targets, with tests validating the metric itself.
- [x] **The scaffold typechecks under stock tsc**, asserted by a test rather than by hand.
- [x] **Installable with no build step on the user's side.** `npm pack` -> install the
      tarball into an empty directory -> `scripttype init` and `build` both work, with no
      `tsx` present. `prepack` rebuilds `dist` from scratch.
- [x] **A config file.** `scripttype.json` for `include`, `outDir`, `width` and
      `checkSource`, found by walking up from the cwd and stopping at a package
      boundary. Flags override it; a bad config is an error, not a silent default.
- [x] **A documented programmatic API.** An `exports` map with `src/index.ts` as the stated
      public surface; internals are unreachable by subpath.

- [x] **CI runs the gates.** `.github/workflows/ci.yml` runs `typecheck`, `build`, `test`,
      the typecheck gate, the verify gate and a corpus smoke on every push and pull
      request, on Node 20 with a pnpm cache, each gate its own named step so a failure
      names itself. A fresh checkout has none of the corpus clones — they are gitignored
      inputs, not our source — and the fixtures re-extract their references from them, so
      the workflow shallow-clones the three the gates actually read (`kysely`,
      `ts-pattern`, `ts-toolbelt`) through `refresh.sh`; without them `gate` and `verify`
      both drop to 21/22 and exit 1.
      *Evidence: run 30174563828 on `main`, conclusion `success`, with all six gate steps
      reporting `success` rather than skipped — Typecheck, Build, Tests, Typecheck gate,
      Verify gate, Corpus smoke.*

## Remaining

- [ ] **Whole-library conversion is clean.** All 198 converted type-fest modules check
      with zero warnings. Now 196; the tail is two files, each blocked on a language
      feature rather than a fix:
      - `globals/observable-like` — the original opens with a `declare global` block, and
        ScriptType has no spelling for an ambient or global declaration. Carrying the
        block across would make the source typecheck while the *output* silently lost a
        declaration the original had, which is worse than leaving it.
      - `spread` — `matches<P>(x)` does not narrow `x`, so a callee annotated with the
        guarded type rejects the argument. Narrowing would require `matches` to be a type
        predicate, which returns `boolean` and so breaks the hole-marker idiom that reads
        bindings off an `any`. The trade-off is recorded in `scripttype.d.ts`.
      *Evidence: the convert sweep, re-run and reported.*
      *Caveat on the metric: `check` runs the source typecheck, the lowering and the
      unresolved-name pass. It does not typecheck the emitted TypeScript, so this counts
      modules that are valid ScriptType which lowers without error. Round-trip identity
      of the output is what `verify` measures, separately.*

- [ ] **Round-trip coverage ≥ 90%** across the corpus, measured in one complete run
      (currently ~82%, and the last full measurement is stale).
      *Evidence: a complete `pnpm corpus && pnpm coverage`, all shards landing.*

- [ ] **No `raw()` for call and method signatures in object types** — the top two language
      gaps, ~100 occurrences between them.
      *Evidence: the gap table in COVERAGE.md, with those rows gone.*
