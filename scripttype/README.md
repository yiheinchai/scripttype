# Generated ScriptType sources

Mirrors the corpus tree: every `<repo>/<path>.ts` with type-level aliases has a
`<repo>/<path>.st.ts` here containing the ScriptType form of each alias, the TypeScript it
compiles back to, and its verification status.

## What these are, and what they are not

These files are produced by the **decompiler**, which translates each conditional type into
statement form: `if (matches<Pattern>(x)) { return … }` plus early returns, instead of a
nested ternary. That is already a large readability gain — control flow becomes linear and
each branch is named — and every file records whether it recompiles to a type-identical result.

What the decompiler does **not** do is recover loops. A recursive type stays recursive here,
rather than becoming the `while` loop a human would write. Loop recovery (recognising a
tail-recursive accumulator and re-expressing it as iteration) is the inverse of the
compiler's loop lowering and is not implemented.

For hand-written ScriptType in the intended imperative style — loops, mutable accumulators,
`push()` — see the `corpus/` directory, where each target is authored by hand and held to a
stricter per-sample equivalence gate.

- files: 1902
- aliases: 7518
- verified type-identical: 5516 (73.4%)

| status | count | meaning |
|---|--:|---|
| `covered` | 5516 | verified type-identical to the original |
| `typecheck-error` | 710 | the ScriptType does not itself typecheck as TypeScript |
| `compile-error` | 637 | does not compile yet |
| `raw` | 438 | uses raw() — language gap, does not count as covered |
| `mismatch` | 217 | compiles but is not type-identical yet |
