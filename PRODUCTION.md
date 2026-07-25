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
- [x] **A migration path exists.** `scripttype convert` on all 205 files of type-fest
      produces 189 modules, 172 of which build with no errors and no warnings.
- [x] **Instantiation cost is measured, not asserted.** 0.90x against the hand-written
      originals over 20 targets, with tests validating the metric itself.
- [x] **The scaffold typechecks under stock tsc**, asserted by a test rather than by hand.

## Remaining

- [ ] **Installable with no build step on the user's side.** `npm pack`, install the
      tarball into a clean directory, and `npx scripttype build` works there — no `tsx`,
      no `pnpm install` in the compiler, no `dist/` assumed to be present.
      *Evidence: a test that packs, installs, and runs.*

- [ ] **A config file.** `scripttype.json` for `include`, `outDir`, `width` and
      `checkSource`, so a real project stops repeating flags in every script. CLI flags
      override it. `init` writes one.
      *Evidence: tests for precedence and for a malformed config's error message.*

- [ ] **Whole-library conversion is clean.** All 189 converted type-fest modules build
      with zero warnings (currently 172; the tail is circular constraints and a few
      argument-type mismatches).
      *Evidence: the convert sweep, re-run and reported.*

- [ ] **Round-trip coverage ≥ 90%** across the corpus, measured in one complete run
      (currently ~82%, and the last full measurement is stale).
      *Evidence: a complete `pnpm corpus && pnpm coverage`, all shards landing.*

- [ ] **No `raw()` for call and method signatures in object types** — the top two language
      gaps, ~100 occurrences between them.
      *Evidence: the gap table in COVERAGE.md, with those rows gone.*

- [ ] **A documented programmatic API.** An `exports` map and a stated public surface, so
      `compile()` can be used from a build script without reaching into `src/`.
      *Evidence: a test importing only the public entry point.*

- [ ] **CI runs the gates.** A workflow running tsc, tests, the typecheck gate, the verify
      gate and a corpus smoke on every push.
      *Evidence: a green run.*
