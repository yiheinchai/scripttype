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

Two design decisions carry most of the weight:

**ScriptType source is syntactically valid TypeScript.** A `.st.ts` file parses with the stock
TypeScript parser, so editors highlight it and there is no lexer to maintain. Only the *semantics*
are reinterpreted.

**`infer` never appears in source.** Pattern matching is expressed through destructuring and a
builtin library instead, which is both more JavaScript-like and the single biggest readability win.
Where a fully general pattern is needed, `matches<Pattern>(x)` accepts one — `infer` is legal in a
type-argument position *syntactically*, which is all the compiler needs.

## Status

The compiler works end to end. Two verification tracks measure it:

**Hand-authored targets** — a ScriptType program written by hand, checked against the reference
type extracted verbatim from its library. This is the strict gate: the compiled output must
typecheck and be **type-identical** to the reference for every sample instantiation, with no
`raw()` escape hatch.

```
19/19 covered (100%)
```

**Round-trip** — every generic type alias in the corpus is decompiled to ScriptType, recompiled,
and compared to the original. This is how the project scales past hand-authoring; see
[Coverage](#coverage) for the current numbers and the honest caveats.

Run both:

```bash
cd compiler
pnpm install
pnpm test                      # compiler unit tests
pnpm verify                    # hand-authored corpus targets
pnpm verify kysely --verbose   # filter, and show emitted output on failure

npx tsx src/inventory.ts                              # corpus size + coverage
npx tsx src/batch.ts 04-query-builders-orm/kysely/src # round-trip a subtree
npx tsx src/roundtrip.ts <file> --show                # round-trip one file, verbosely
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
CORPUS.md               reading guide to the 26 corpus repositories
compiler/src/
  ir.ts                 output IR (TypeExpr) + emitter with precedence-aware parenthesisation
  lower.ts              the core: statements -> types, by continuation-passing
  builtins.ts           builtin library; each carries a lowering rule
  prelude.ts            hand-written helpers for operations TS has no native form for
  optimize.ts           peepholes for output quality (guard fusion, infer pruning)
  compile.ts            orchestration
  decompile.ts          TypeScript type -> ScriptType (enables round-trip at scale)
  verify.ts             type-identity gate via the TS compiler API
  extract.ts            pull reference types verbatim from a clone
  corpus.ts             target discovery, provenance checking
  batch.ts              batched round-trip (one TS program per file, not per alias)
  inventory.ts          corpus census + coverage denominator
corpus/<repo>/<Type>/         hand-authored targets (strict gate)
  meta.json             provenance + sample instantiations
  reference.ts          the original TypeScript, extracted verbatim
  source.st.ts          the ScriptType program, written by hand
scripttype/<repo-path>.st.ts  generated ScriptType for every corpus alias,
                              with the TypeScript it compiles back to and its
                              verification status inline
01-…07-/                the corpus repositories (see CORPUS.md)
```

## Seeing the ScriptType for the corpus

`scripttype/` mirrors the corpus tree. For each source file with type-level aliases there is a
`.st.ts` file holding the ScriptType form of every alias, the TypeScript it compiles back to,
and whether that round-trip was verified type-identical:

```ts
// ✓ TrimLeft: verified type-identical to the original
export function TrimLeft(V: string) {
  if (matches<`${Whitespace}${infer R}`>(V)) {
    return TrimLeft(R)
  }
  return V
}
/* compiles to:
 * export type TrimLeft<V extends string> = V extends `${Whitespace}${infer R}` ? TrimLeft<R> : V
 */
```

Regenerate with `tsx src/materialize.ts <statuses-dir>`.

**These are decompiler output, and the distinction matters.** The decompiler turns each
conditional type into statement form — `if (matches<…>(x)) { return … }` with early returns
instead of a nested ternary — which linearises control flow and names each branch. It does *not*
recover loops: a recursive type stays recursive rather than becoming the `while` loop a human
would write, because loop recovery is the inverse of the compiler's loop lowering and is not
implemented. For ScriptType in the intended imperative style, see the hand-authored `corpus/`
targets, which are also held to the stricter per-sample gate.

## Coverage

The corpus contains **7,520 generic type aliases** — type aliases with at least one type
parameter, which are the constructs ScriptType exists to replace. Of those, 3,633 use conditional
types, 943 mapped types, 599 template literal types, and 730 are recursive.

Full coverage of all 7,520 is the project's completion criterion and is not yet reached. Current
numbers, and what still blocks them, are regenerated by `src/inventory.ts` and `src/batch.ts`.

Two caveats stated plainly, because they matter for reading the numbers:

- **Round-trip coverage is a weaker signal than hand-authored coverage.** Sample arguments cannot
  be generated automatically for arbitrary generic types, so the round-trip compares
  constraint-instantiated witnesses rather than a curated sample set. The two numbers are reported
  separately and never merged.
- **`unresolved-deps` is a harness limitation, not a language gap.** The corpus clones have no
  `node_modules`, and reference extraction is single-file, so a type importing across files cannot
  be typechecked in isolation. These are excluded from language-gap accounting and reported in
  their own bucket.

Known language gaps, in corpus frequency order: generic function types (the `<T>() => …` variance
trick, which `equals()` covers for hand-authored code but the decompiler cannot express), method
and call signatures in object types, and variadic tuple forms with optional elements.

## Non-goals

Not a general TypeScript-to-type-level compiler: value-level code, side effects and `async` have no
type-level meaning. Not attempting to beat hand-written types on instantiation performance, though
`defer()` exposes kysely's `DrainOuterGeneric` trick and emitter-level deferral is planned.
