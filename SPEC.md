# ScriptType — Language Specification (v0.1)

## The problem

TypeScript's type system is a real, Turing-complete functional programming language, but it has
no statements. No `const`, no loops, no early return, no local variables. Every computation must
be written as a single nested expression, and recursion is the only iteration construct. That is
why the code in `01-`…`07-` is hard to write and harder to read:

```ts
// kysely — what does this do? You must hold the whole expression in your head.
type ExtractAliasFromStringSelectExpression<SE extends string> =
  SE extends `${string} as ${infer A}` ? A
  : SE extends `${string}.${infer C}` ? C
  : SE
```

## The idea

The type system is a *pure functional language*. Imperative code mechanically lowers into pure
functional code — that's what every compiler in the world already does. So let the user write
statements, and compile them down:

```ts
// ScriptType — valid TypeScript syntax, reads like JavaScript
export function ExtractAliasFromStringSelectExpression(se: string): string {
  if (endsWithAfter(se, ' as ')) {
    const [, alias] = splitLast(se, ' as ')
    return alias
  }
  if (includes(se, '.')) {
    const [, column] = splitLast(se, '.')
    return column
  }
  return se
}
```

Both forms must produce **the same type**. That equivalence, checked against real library code,
is the project's correctness criterion.

## Design constraints

1. **ScriptType source is syntactically valid TypeScript.** It parses with the stock TypeScript
   parser, so editors highlight it, and we never write a lexer. A `.st.ts` file is a valid TS
   module; we reinterpret its *semantics*, not its syntax.
2. **No `infer` in source.** `infer` is only legal inside a conditional type's `extends` clause,
   so it cannot appear in expression position. Pattern matching is expressed instead through
   **destructuring** and a **builtin library** — which is more JavaScript-like anyway, and is the
   single biggest readability win.
3. **Emitted output must be idiomatic**, close enough to hand-written TypeScript that a human
   diff against the original library code is meaningful.
4. **Total escape hatch.** `raw()` emits verbatim type syntax, so 100% corpus coverage is always
   reachable. Coverage metrics report raw-free solutions separately, since a `raw()` solution
   proves nothing about the language.

## Program structure

A ScriptType module is a `.st.ts` file. Every exported function declaration compiles to one
exported generic type alias. Parameters become type parameters; annotations become constraints.

```ts
export function Split(input: string, sep: string): string[] { ... }
```
```ts
export type Split<Input extends string, Sep extends string> = ...
```

Parameter names are lowerCamel in source and PascalCase in output (`input` → `Input`), matching
the conventions of each language. The return annotation is optional; when present it is enforced
as a post-condition by the verifier, not emitted.

## Expression lowering

| ScriptType | TypeScript | Notes |
|---|---|---|
| `input` | `Input` | parameter / local reference |
| `'a'`, `42`, `true` | `'a'`, `42`, `true` | literal types |
| `string`, `never`, `unknown` | same | bare type keywords are in scope as values |
| `a \| b` | `A \| B` | `\|` parses as a valid TS expression; reinterpreted as union |
| `a & b` | `A & B` | likewise, intersection |
| `[a, b]` | `[A, B]` | tuple |
| `[...a, b]` | `[...A, B]` | tuple spread |
| `{ k: v }` | `{ k: V }` | object type |
| `Foo(a, b)` | `Foo<A, B>` | call → type application |
| `a[b]` | `A[B]` | indexed access |
| `` `${a}-${b}` `` | `` `${A}-${B}` `` | template literal type |
| `keyof(a)` | `keyof A` | builtin operator |
| `a as const` | `readonly` variants | modifier |

## Statement lowering

### `const` — let-binding

Two strategies. Default is **substitution**, because hand-written library code inlines
everything and we want output that diffs cleanly against it:

```ts
const t = trim(s); return upper(t)     →  Uppercase<Trim<S>>
```

When a binding is referenced more than once, substitution would duplicate work. The compiler then
emits the canonical type-level let-binding — `X extends infer N ? … : never`:

```ts
const p = parse(s)
return [p, p]                          →  Parse<S> extends infer P ? [P, P] : never
```

`@bind` on a declaration forces the second form; `@inline` forces the first.

### `if` / `else` — conditional types

```ts
if (extendsType<string>(t)) { return 'yes' }
return 'no'                            →  T extends string ? 'yes' : 'no'
```

Early return is the same shape: statements after an `if` become that `if`'s else-branch. A missing
final `return` is a compile error (the type would be underdetermined).

### Narrowing guards

A guard both tests and binds. `extendsType<P>(x)` lowers to `X extends P`, and inside the
then-branch `x` is narrowed to `P`:

```ts
if (extendsType<[unknown, ...unknown[]]>(t)) {
  const [head] = t                     // legal only because t narrowed to a tuple
}
```

### `matches<Pattern>(x)` — the general pattern primitive

Destructuring and the builtins cover the common shapes, but not every conditional type. For
the rest there is `matches`, which accepts an arbitrary pattern *including* `infer`:

```ts
if (matches<ReadonlyArray<infer I>>(t)) { return I }
return never
```
```ts
T extends ReadonlyArray<infer I> ? I : never
```

`infer` is only *semantically* legal inside a conditional type's `extends` clause, but it
parses anywhere a type does — so a pattern carrying `infer` names is a syntactically valid
type argument, which is all the compiler needs. Each `infer X` becomes a variable `X` bound in
the true-branch.

This makes the language expressively complete for conditional types, and is what allows the
decompiler (TypeScript type -> ScriptType) to be total. Type references inside a pattern are
resolved against the enclosing scope, so a pattern may use the source's own parameter
spelling.

### Destructuring — the `infer` replacement

Tuple destructuring maps exactly onto tuple `infer` patterns:

```ts
const [head, ...tail] = t              →  T extends [infer Head, ...infer Tail] ? … : never
```

Object destructuring maps onto indexed access:

```ts
const { name } = user                  →  User['name']
```

String destructuring goes through builtins that lower to template literal patterns:

```ts
const [l, r] = splitOnce(s, '/')       →  S extends `${infer L}/${infer R}` ? … : never
```

Because a destructuring pattern can fail to match, every destructuring form has a failure branch.
The compiler derives it from control flow: inside an `if` the failure branch is the `else`; at
statement level, failure yields `never` unless a `?? fallback` is supplied.

### Lifting out of expression-only positions

A mapped type's value is a single expression, so a construct that needs statements — a nested
mapped type, or a pattern with bindings — cannot be written inline there. Such a construct is
extracted into its own function taking the enclosing names it reads, and the value becomes a
call; the compiler turns that into a helper type alias. This is ordinary lambda lifting, and it
is what a person writing the type by hand would do.

### Loops — recursive helper with accumulators

This is the transformation that carries the whole value proposition. A `while` loop over a mutable
accumulator becomes a tail-recursive generated type:

```ts
export function Split(input: string, sep: string): string[] {
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
```ts
export type Split<Input extends string, Sep extends string> =
  Split__loop<Input, Sep, []>

type Split__loop<Rest extends string, Sep extends string, Out extends string[]> =
  Rest extends `${infer Head}${Sep}${infer Tail}`
    ? Split__loop<Tail, Sep, [...Out, Head]>
    : [...Out, Rest]
```

The algorithm is standard closure conversion:
1. Compute the loop's free mutable variables — these become the helper's accumulator parameters.
2. The loop condition becomes the helper's conditional test.
3. The body's mutations become the arguments of the recursive call (`rest = tail` → pass `Tail`).
4. Loop exit becomes the false branch, emitting whatever the code does after the loop.
5. `break` exits with the current accumulators; `continue` recurses immediately.

`for (const x of xs)` desugars to the same shape with a `[Head, ...Tail]` destructure, and
`for...in` over an object lowers to a mapped type when the body has no cross-iteration state:

```ts
for (const k in o) { out[k] = f(o[k]) }   →  { [K in keyof O]: F<O[K]> }
```

Mapped-type recognition matters for output quality: lowering an object loop to recursion would be
correct but would not resemble the original library code.

`for (const k in o)` follows JavaScript and means *the keys of* `o`, i.e. `keyof O`. When the
value is already a key union rather than an object, `keySet(K)` says so explicitly and yields
`[K in K]` rather than `[K in keyof K]`.

Property modifiers are written as markers wrapping the value, since `out[k]?= v` is not valid
JavaScript syntax:

| marker | mapped type |
|---|---|
| `out[k] = optional(v)` | `{ [K in …]?: V }` |
| `out[k] = required(v)` | `{ [K in …]-?: V }` |
| `out[k] = readonlyProp(v)` | `{ readonly [K in …]: V }` |
| `out[k] = mutable(v)` | `{ -readonly [K in …]: V }` |

Assigning to a computed key (`out[upper(k)] = …`) produces an `as` clause.

### Destructuring fallbacks

A destructuring pattern can fail to match. By default failure yields `never`; `orElse` supplies
something else:

```ts
const [, ...tail] = orElse(it, [])       →  It extends [unknown, ...infer Tail] ? Tail : []
```

### `switch`

Lowers to nested conditionals in source order. A `default` clause is the innermost else; without
one, the fallthrough is `never`.

### Errors

`error('msg')` emits the configured error type (default `ScriptTypeError<'msg'>`), letting
libraries like arktype surface diagnostics from inside type-level code.

## Builtin library

Builtins are declared, never implemented — each carries a lowering rule. Initial set, chosen by
auditing what the corpus actually uses:

- **String**: `splitOnce`, `splitLast`, `startsWith`, `endsWith`, `includes`, `trim`, `upper`,
  `lower`, `capitalize`, `uncapitalize`, `replace`, `replaceAll`, `length`, `removePrefix`,
  `removeSuffix`, `join`
- **Tuple**: `push`, `concat`, `length`, `head`, `tail`, `last`, `reverse`, `at`
- **Object**: `keyof`, `get`, `pick`, `omit`, `merge`, `entries`
- **Tuple/array (cont.)**: `append`, `prepend`, `isEmpty`, `elementOf`, `indexOfType`,
  `arrayOf`, `readonlyArrayOf`, `asReadonly`, `optElem` (an optional tuple element)
- **Predicates**: `extendsType<P>`, `isSubtypeOf`, `isNever`, `isAny`, `equals`
- **Meta**: `matches<P>`, `keySet`, `orElse`, `optional`, `required`, `readonlyProp`, `mutable`,
  `defer` (kysely's `DrainOuterGeneric`), `voidType`, `error`, `raw`, `simplify`

**Shapes with no operator form.** `|` and `&` are JavaScript's bitwise operators, so they
typecheck only when every operand is `any`-typed. Where that does not hold — a union of string
literals, a `for…in` key variable, an object literal — the call forms `anyOf(a, b, …)` and
`merge(a, b, …)` apply instead. Likewise for constructs with no expression spelling at all:

| builtin | TypeScript |
|---|---|
| `fnType([A, B], R)` | `(a0: A, a1: B) => R` |
| `genericFnType(['T'], [A], R)` | `<T>(a0: A) => R` — the variance trick `Equals` is built from |
| `ctorType([A], R)` | `new (a0: A) => R` |
| `indexRecord(K, V)` | `{ [key: K]: V }` |
| `t<T>()` | `T` — for a type whose head has no callable value form, e.g. `Promise<X>` |
| `obj({ k: V })` | `{ k: V }` where it must be an operand |
| `emptyObject`, `Null`, `Undefined` | `{}`, `null`, `undefined` where those cannot be operands |

`defer(x)` deserves a note: it emits `[X] extends [unknown] ? X : never`, the trick kysely calls
`DrainOuterGeneric`, which defers instantiation of an outer generic and is the standard cure for
*"Type instantiation is excessively deep and possibly infinite"*.

## Verification: what "1-1 match" means

Textual equality is the wrong criterion — helper naming, whitespace, and clause ordering are all
semantically irrelevant, and the compiler is entitled to introduce helpers the original didn't
have. The verifier therefore checks **semantic equivalence** in three escalating tiers:

- **Tier 1 — Type identity (the real gate).** For each of N sample instantiations, use the
  TypeScript compiler API to resolve both `Original<Args>` and `Compiled<Args>`, then assert
  mutual assignability *and* identical normalized `typeToString`. Mutual assignability alone is
  too weak (it conflates `any` with everything); string identity alone is too strong (ordering).
  Both together are the right gate.
- **Tier 2 — Structural AST similarity.** Normalize both emitted and original type ASTs
  (α-rename type parameters, sort union members, inline single-use helpers) and report a distance.
  This does not gate; it measures how idiomatic the output is, which is the honest way to detect
  "passes tests but emits garbage."
- **Tier 3 — Differential fuzzing.** Generate random inputs in the parameter domain and compare
  resolved types. Catches divergence on the edge cases hand-picked samples miss — `never`, `any`,
  unions, optional/rest tuple elements, and recursion at the instantiation-depth limit.

A corpus target counts as **covered** only at Tier 1 pass with zero `raw()` in its source.

## Non-goals

Not a general TS-to-type-level compiler: value-level code, side effects, and async have no
type-level meaning. Not attempting to beat hand-written types on instantiation performance,
though `DrainOuterGeneric`-style deferral is a planned emitter optimization.
