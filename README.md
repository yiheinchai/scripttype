# ScriptType

**Write TypeScript type-level code as if it were JavaScript. Compile it to TypeScript types.**

TypeScript's type system is a real, Turing-complete functional language — but it has no
statements. No `const`, no loops, no early return. Every computation must be a single nested
expression, and recursion is the only iteration construct. That is why advanced type-level code
is so hard to write and so much harder to read.

ScriptType lets you write the same logic with variables, `if`/`else`, and loops, and compiles it
down to the conditional types, `infer` patterns, mapped types, and recursive generics you would
otherwise have to write by hand.

```ts
// ScriptType — valid TypeScript syntax, reads like JavaScript
export function Split(input: string, sep: string) {
  const out: string[] = []
  let rest = input
  while (includes(rest, sep)) {
    const [head, tail] = splitOnce(rest, sep)
    out.push(head)
    rest = tail
  }
  out.push(rest)
  return out
}
```

compiles to:

```ts
export type Split<Input extends string, Sep extends string> = Split__loop<Input, [], Sep>

type Split__loop<Rest extends string, Out extends string[], Sep extends string> =
  Rest extends `${infer Head}${Sep}${infer Tail}`
    ? Split__loop<Tail, [...Out, Head], Sep>
    : [...Out, Rest]
```

A `while` loop with a mutable accumulator becomes a tail-recursive helper type. That is the whole
idea, and it is standard closure conversion — the same transformation every compiler already does.

## Getting started

```bash
cd compiler && pnpm install

./bin/scripttype init my-types     # scripttype.d.ts, a tsconfig, and an example
./bin/scripttype build my-types    # my-types/example.st.ts -> my-types/example.ts
```

`init` scaffolds a project that typechecks under stock `tsc` with no plugin, because a
`.st.ts` file is ordinary TypeScript syntax. From there:

```bash
scripttype build src               # compile every .st.ts under src, next to its source
scripttype build src --out gen     # or into a directory
scripttype check .                 # report problems, write nothing (for CI)
scripttype watch src               # rebuild on change
scripttype builtins string         # search the builtin surface
scripttype explain ST1102          # the full text behind any error code
```

`build` writes `foo.st.ts` to `foo.ts` with a generated-file banner, and refuses to
overwrite anything at that path it did not write itself.

## When you get something wrong

A type-level language whose errors are bad is not worth adopting, so every compiler error
carries a code, the span it happened at, and the fix:

```
error[ST1101]: compound assignment `+=` is not supported
  --> src/nat.st.ts:3:3
  |
2 |   let x = 1
3 |   x += 2
  |   ^^^^^^
4 |   return x
  |
help: Write it out: `x = x + 2`.
      run `scripttype explain ST1101` for a worked example
```

An unknown name suggests the nearest builtin. A runtime global (`console`, `Math`) is
named as such rather than reported as an undefined variable. `scripttype explain` prints
the long-form entry, which is where the language is documented for that construct — it
lives next to the code that raises the error so the two cannot drift apart.

## Why it works

The type system is a pure functional language, so imperative code lowers into it mechanically:

| ScriptType | TypeScript |
|---|---|
| `const x = f(y)` (used once) | substituted inline |
| `const x = f(y)` (used twice) | `F<Y> extends infer X ? … : never` |
| `if (cond) { … } else { … }` | `C extends P ? … : …` |
| early `return` | nested conditional |
| `while` / `for…of` + mutation | generated tail-recursive helper with accumulator parameters |
| `for…in` | mapped type `{ [K in keyof T]: … }` |
| `switch` | nested conditionals |
| destructuring `const [h, ...t] = x` | `X extends [infer H, ...infer T] ? … : never` |
| `splitOnce(s, '/')` | `S extends \`${infer L}/${infer R}\`` |
| `typeof x === 'string'` | `X extends string` |
| `'k' in o` | `'k' extends keyof O` |
| `Array.isArray(x)` | `X extends any[]` |
| `a === b` / `a !== b` | `A extends B ? … : …`, branches swapped for `!==` |
| `s.startsWith('a')` | `S extends \`a${string}\`` |

Two design decisions carry most of the weight:

**ScriptType source is syntactically valid TypeScript.** A `.st.ts` file parses with the stock
TypeScript parser, so editors highlight it and there is no lexer to maintain. Only the *semantics*
are reinterpreted.

**`infer` never appears in source.** Pattern matching is expressed through destructuring and a
builtin library instead, which is both more JavaScript-like and the single biggest readability win.
Where a fully general pattern is needed, `matches<Pattern>(x)` accepts one, with `Hole<'N'>` in
place of `infer N`. The one exception is inside `raw('…')`, which is literal TypeScript by
definition — and every `infer` in the generated corpus is in exactly that position.

**ScriptType source must itself typecheck as TypeScript.** Not merely parse — typecheck, with zero
errors and no `@ts-ignore` anywhere. That is a verification gate, not a nicety: a type-level
language whose own source does not typecheck is not good enough. See
[The typecheck gate](#the-typecheck-gate).

## Two dialects

**Annotated** (`.st.ts`) — parameters carry their constraints as type annotations.

**Pure JavaScript** — no annotations at all. Native methods map to type operations and JSDoc
carries the constraints, so a type-level program is just JavaScript:

```js
/**
 * @param {string} input
 * @param {string} sep
 */
export function Split(input, sep) {
  const out = []
  let rest = input
  while (rest.includes(sep)) {
    const [head, tail] = splitOnce(rest, sep)
    out.push(head)
    rest = tail
  }
  out.push(rest)
  return out
}
```

`rest.includes(sep)` becomes a template-literal guard, `s.toUpperCase()` becomes `Uppercase<S>`,
`Object.keys(o)` becomes `keyof O`. Accumulator constraints are inferred from initialiser shape,
so the emitted `[...Out, Head]` still typechecks.

## The typecheck gate

ScriptType source typechecks against `compiler/src/scripttype.d.ts`, which declares the builtin
surface. Getting there required establishing several things empirically, each of which shaped the
language:

- **Type keywords are declared as values of type `any`**, never of their namesake type.
  `declare const boolean: boolean` breaks `boolean | 0 | 1`, because `|` is JavaScript's bitwise
  operator and needs `any`/`number`/`bigint`.
- **The consuming `lib` must exclude DOM**, whose globals (`length`, `name`, `origin`, `status`, …)
  collide with builtin names.
- **`infer` cannot survive in a type-argument position** — it is a semantic error outside a
  conditional type's `extends` clause. Hence `Hole<'N'>`, an ordinary type the compiler turns back
  into `infer N` (`Hole<'N', C>` carries an inference constraint).
- **A hole cannot be a free identifier**, so bindings are read off a match marker:
  `const m = matches<P>(v); if (m) { m.R }`. A marker is `any`, so property access is always
  well-typed.
- **A parameter is a value**, so referring to it in a type position needs `typeof` — in patterns
  and in parameter annotations alike.
- **`{}` cannot be an `&` operand and `null` cannot be a `|` operand**, so both have named
  spellings (`emptyObject`, `Null`). Generated output uses `merge(...)` / `anyOf(...)` rather than
  the operators, because a decompiled operand is often not `any`-typed — a `for…in` key variable is
  `string`.

Run it:

```bash
npx tsx src/typecheck-cli.ts     # every hand-authored source, zero errors required
```

`typecheck-error` is a first-class status in the round-trip harness, so a generated program that
fails to typecheck does not count as covered.

## Status

The compiler works end to end. Two verification tracks measure it:

**Hand-authored targets** — a ScriptType program written by hand, checked against the reference
type extracted verbatim from its library. This is the strict gate: the compiled output must
typecheck and be **type-identical** to the reference for every sample instantiation, with no
`raw()` escape hatch.

```
typecheck gate:  22/22
type identity:   22/22
```

**Round-trip** — every generic type alias in the corpus is decompiled to ScriptType, recompiled,
and compared to the original. This is how the project scales past hand-authoring. A target
counts only if it does all three: typechecks as TypeScript, recompiles to a type-identical
result, and uses no `raw()`.

[COVERAGE.md](COVERAGE.md) holds the current figure and the per-repository breakdown, and is
regenerated by `pnpm corpus && pnpm coverage` — it is the single source of truth for that
number, so it is not repeated here where it would go stale.

Run the gates (these are for working *on* the compiler; to *use* ScriptType see
[Getting started](#getting-started)):

```bash
cd compiler
pnpm install
pnpm check          # everything: tsc, unit tests, typecheck gate, corpus verification
pnpm typecheck      # the compiler's own sources — zero errors
pnpm test           # compiler unit tests
pnpm gate           # every hand-authored ScriptType source typechecks, zero errors
pnpm verify         # hand-authored targets are type-identical to their references
pnpm verify kysely --verbose   # filter, and show emitted output on failure

pnpm inventory                                    # corpus census
pnpm roundtrip 04-query-builders-orm/kysely/src   # round-trip a subtree
pnpm coverage                                     # aggregate the last full run
pnpm materialize                                  # write scripttype/ to disk
pnpm dx                                           # regenerate DX.md
```

## How equivalence is checked

Textual comparison would be the wrong gate — helper names, clause order and whitespace are
semantically irrelevant, and the compiler is entitled to introduce helpers the original never had.
So the verifier asks the TypeScript checker itself whether

```ts
Equals<Original<Args>, Compiled<Args>>
```

resolves to exactly `true`, using the conditional-variance identity trick. That is strictly
stronger than mutual assignability: it distinguishes `any` from `unknown`, which assignability
does not.

Each fixture also carries **provenance**. `meta.json` records the corpus file its reference came
from, and the runner re-extracts from the clone and compares, so a fixture cannot silently drift
away from the library code it claims to reproduce. This caught a real error during development: an
early test used a simplified three-branch version of kysely's
`ExtractAliasFromStringSelectExpression`, when the real type has six branches and deliberately
*bounded* dotted-path semantics (`'a.b.c.d'` yields `'c.d'`, not `'d'`). The ScriptType version now
reproduces that quirk exactly, verified across 10 samples.

## Layout

```
SPEC.md                 language specification and lowering rules
DX.md                   generated side-by-side readability comparison
COVERAGE.md             generated per-repository coverage report
CORPUS.md               reading guide to the 26 corpus repositories
compiler/bin/
  scripttype.mjs        the executable; registers tsx, then runs src/cli.ts
compiler/src/
  cli.ts                build / check / watch / explain / builtins / init
  diagnostics.ts        error catalogue, source frames, "did you mean"
  format.ts             width-aware printer for the emitted TypeScript
  ir.ts                 output IR (TypeExpr) + emitter with precedence-aware parenthesisation
  lower.ts              the core: statements -> types, by continuation-passing
  builtins.ts           builtin library; each carries a lowering rule
  prelude.ts            hand-written helpers for operations TS has no native form for
  optimize.ts           peepholes for output quality (guard fusion, infer pruning)
  compile.ts            orchestration
  decompile.ts          TypeScript type -> ScriptType (enables round-trip at scale)
  verify.ts             type-identity gate via the TS compiler API
  typecheck.ts          the typecheck gate; scripttype.d.ts is the ambient surface
  recover-loop.ts       tail recursion -> while loop, the main readability win
  inplace.ts            high-coverage round-trip harness (overlay on the real file)
  freenames.ts          free-name analysis, so generated files are self-contained
  extract.ts            pull reference types verbatim from a clone
  corpus.ts             target discovery, provenance checking
  batch.ts              batched round-trip (one TS program per file, not per alias)
  inventory.ts          corpus census + coverage denominator
corpus/<repo>/<Type>/         hand-authored targets (strict gate)
  meta.json             provenance + sample instantiations
  reference.ts          the original TypeScript, extracted verbatim
  source.st.ts          the ScriptType program, written by hand
scripttype/<repo-path>.st.ts       generated ScriptType for every corpus alias,
                                   with the TypeScript it compiles back to and its
                                   verification status inline
scripttype/<repo-path>.original.ts the original, in the same directory, for
                                   side-by-side comparison
01-…07-/                the corpus repositories (see CORPUS.md)
```

## Seeing the ScriptType for the corpus

`scripttype/` mirrors the corpus tree. For each source file with type-level aliases there is a
`.st.ts` file holding the ScriptType form of every alias, the TypeScript it compiles back to,
and whether that round-trip was verified type-identical:

```ts
// ✓ TrimLeft: verified type-identical to the original
/* @scripttype preserveParamNames */
export function TrimLeft(V: string) {
  let v = V
  while (true) {
    const m1 = matches<`${Whitespace}${Hole<"R">}`>(v)
    if (!m1) {
      break
    }
    v = m1.R
  }
  return v
}
/* compiles to:
 * export type TrimLeft<V extends string> = TrimLeft__loop<V>
 * type TrimLeft__loop<V extends string> = V extends `${Whitespace}${infer R}` ? TrimLeft__loop<R> : V
 */
```

Regenerate with `tsx src/materialize.ts <statuses-dir>`.

**These are decompiler output, and the distinction matters.** The decompiler turns each
conditional type into statement form — early returns instead of a nested ternary — which
linearises control flow and names each branch, and it recovers tail recursion back into a
`while` loop, which is the inverse of the compiler's loop lowering. What it does not do is
choose good names or find the abstraction a person would have reached for; for ScriptType in
the intended hand-written style, see the `corpus/` targets, which are also held to the stricter
per-sample gate.

## Coverage

The corpus contains **7,518 generic type aliases** — type aliases with at least one type
parameter, which are the constructs ScriptType exists to replace. Of those, 3,633 use conditional
types, 943 mapped types, 599 template literal types, and 730 are recursive.

[COVERAGE.md](COVERAGE.md) carries the current totals and the per-repository table, regenerated
by `pnpm corpus && pnpm coverage`. Spread is wide and informative: kysely and type-challenges sit
near 100%, while hotscript is the outlier because its type-level arithmetic is deliberately
extreme.

Full coverage of all 7,518 is the project's completion criterion and is **not yet reached**. Each
failure is one of four kinds, in rough order of how many there are:

- **compile errors** — the decompiler emits ScriptType the compiler then rejects. The largest
  bucket, and the most mechanical to shrink.
- **typecheck errors** — the generated ScriptType does not itself typecheck. The remaining causes
  are narrow: circular constraints, a few object-literal operand positions, and name collisions
  with library globals.
- **`raw()` fallbacks** — genuine language gaps, where the decompiler could not express a
  construct at all. Call and method signatures in object types dominate, followed by generic
  function types (the `<T>() => …` variance trick, which `equals()` covers for hand-authored code
  but the decompiler cannot reconstruct), index signatures, and constructor types.
- **mismatches** — compiles and typechecks, but is not type-identical. The most interesting
  failures, because each is a real semantic difference rather than a missing feature.

One caveat worth stating plainly: **round-trip coverage is a weaker signal than the hand-authored
gate.** Sample arguments cannot be generated automatically for arbitrary generic types, so the
round-trip compares constraint-instantiated witnesses rather than a curated sample set. The two
numbers are reported separately and never merged.

## Non-goals

Not a general TypeScript-to-type-level compiler: value-level code, side effects and `async` have no
type-level meaning. Not attempting to beat hand-written types on instantiation performance, though
`defer()` exposes kysely's `DrainOuterGeneric` trick and emitter-level deferral is planned.
