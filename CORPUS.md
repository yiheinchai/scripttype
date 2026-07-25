# ScriptType Corpus — Reading Guide

The 26 repositories in `01-`…`07-` are ScriptType's verification corpus. They were chosen
because their type-level code is worth reading, and they double as the test set: every
type-level construct here is something ScriptType must be able to express. See
`README.md` for the project itself.

Every path cited below was verified against the actual clone.

Total size ~370 MB. `.git` directories were removed to keep it light; see
[Refreshing](#refreshing) to update.

---

## Suggested path

If you read these in the order below, each stage gives you the vocabulary for the next.

**Stage 1 — Learn the primitives.** `01-type-level-programming/`
Conditional types, `infer`, recursion, template literals, distributivity, variance.
Do a few dozen `type-challenges` exercises, then read `type-fest` to see the same tricks
written to production standards.

**Stage 2 — See inference applied at scale.** `02-inference-at-scale/`
How a router or an RPC layer threads one generic through 40 call sites without you ever
writing a type argument. Study `hono` before `tanstack-router` — same ideas, a tenth the
surface area.

**Stage 3 — Watch types become a programming language.** `03-schema-and-type-level-parsers/`
`arktype` and `typebox` implement real *parsers* — tokenizer, state machine, grammar — that
run in the type checker. This is the deep end.

**Stage 4 — Study the escape hatches.** `05-functional-effects-hkt/` and `07-compiler-internals/`
Higher-kinded types don't exist in TypeScript. Read how `fp-ts` and `effect` fake them, then
read `checker.ts` to understand why the limitation exists in the first place.

`04-query-builders-orm/` and `06-state-and-forms/` are applied domains you can drop into any
time after Stage 2.

---

## How to actually read this code

Reading type-level code by eye does not work well. Use the compiler as a REPL.

1. **Open a scratch file in the repo you're studying** and import the internal type
   directly, then hover it:
   ```ts
   import type { ParsePathParams } from './packages/router-core/src/link'
   type T = ParsePathParams<'/users/$userId/posts/{-$postId}'>
   //   ^? hover this
   ```
2. **Force full expansion.** Editors truncate with `...`. Defeat that with:
   ```ts
   type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never
   ```
   Or install `ts-reset`-style helpers; `kysely`'s `SimplifyDeep` and `type-fest`'s `Simplify`
   both exist for exactly this reason.
3. **Read the type tests, not the docs.** Nearly every repo here has `*.test-d.ts`,
   `*.test-types.ts`, or `expectTypeOf` assertions. These are executable specifications of
   what the types are *supposed* to do, and they are usually far more legible than the
   implementation. Find them with:
   ```bash
   find . -name '*test-d.ts' -o -name '*.test-types.ts' | grep -v node_modules
   ```
4. **Turn on the tracing tools** when something is slow or hits *"Type instantiation is
   excessively deep"*:
   ```bash
   tsc --noEmit --extendedDiagnostics        # instantiation counts, check time
   tsc --noEmit --generateTrace ./trace      # then open in Perfetto UI
   ```
   `kysely`'s `DrainOuterGeneric` (below) exists purely to win this fight.

---

## The collection

### 01 — Type-level programming primitives

| Repo | Why it's here |
|---|---|
| **type-challenges** | 400+ graded exercises. The single fastest way to build fluency. |
| **type-fest** | The canonical utility-type library, written to a very high standard. |
| **hotscript** | Higher-order type-level functions — lambda calculus in the type system. |
| **ts-toolbelt** | The older, more extreme ancestor: arithmetic and data structures in types. |
| **ts-pattern** | Exhaustive pattern matching with real narrowing. |
| **expect-type** | Type-level assertions; how you *test* types. |

**Start here:**
- `type-challenges/questions/` — sorted by difficulty. Do the `warm-up` and `easy` sets, then
  jump to `medium`. Each folder has `template.ts`, `test-cases.ts`, and community answers in
  its README.
- `type-fest/source/internal/string.d.ts` and `source/internal/array.d.ts` — the shared
  machinery behind everything else in the library. Read these before the public types.
- `type-fest/source/required-deep.d.ts`, `undefined-on-partial-deep.d.ts` — careful recursion
  over object graphs, including the array/tuple/`Function` edge cases that naive versions miss.
- `hotscript/src/internals/core/Core.ts` — the encoding of a *type-level function value*
  (`Fn`, `apply`, `Pipe`, `Compose`). This one file explains the whole library.
- `hotscript/src/internals/numbers/impl/digits/division.ts` — long division, digit by digit,
  in the type system. Read it as a curiosity, then as proof that types are Turing-complete.
- `ts-pattern/src/types/DistributeUnions.ts` — the hardest problem in narrowing: distributing
  a match over a union of object types without losing correlations between fields.
- `expect-type/src/overloads.ts` — 100+ `infer` sites dedicated to extracting *every* overload
  from a function type, which TypeScript gives you no direct way to do.

**Techniques to extract:** recursive conditional types with accumulator parameters; template
literal parsing; deferring distribution with `[T] extends [U]`; the `Equals<A,B>` trick using
generic function assignability; branding and phantom types.

---

### 02 — Inference at scale

| Repo | Why it's here |
|---|---|
| **tanstack-router** | Type-safe routing: paths, params, search params, loader data. |
| **trpc** | End-to-end inference from server procedures to client calls. |
| **hono** | The same routing/RPC ideas in a much smaller, more readable codebase. |
| **elysia** | Pushes route-level type accumulation about as far as anyone has. |
| **tanstack-query** | A masterclass in overload sets for tuple-shaped arguments. |

**Start here:**
- `hono/src/types.ts` then `hono/src/client/types.ts` — **read this before TanStack Router.**
  It's the clearest existing demonstration of building a route registry as a growing
  intersection type and then walking it to type a client. ~43 `infer` sites in the client
  types alone.
- `tanstack-router/packages/router-core/src/link.ts` (704 lines) — `ParsePathParams` recursively
  splits a route template on `{-` and `{`, returning a *structured* result
  (`{ required, optional, rest }`) rather than a flat union. Note how the parse result is an
  interface, so later stages can consume named fields:
  ```ts
  type ParsePathParamsBoundaryStart<T extends string> =
    T extends `${infer TLeft}{-${infer TRight}` ? /* ... */ : /* ... */
  ```
- `tanstack-router/packages/router-core/src/routeInfo.ts` — how the flat route tree gets turned
  into the lookup maps that make `to="/posts/$postId"` autocomplete.
- `tanstack-router/packages/router-core/src/route.ts` — the builder that accumulates context,
  loader data, and params down the route hierarchy.
- `trpc/packages/server/src/unstable-core-do-not-import/procedureBuilder.ts` — the immutable
  builder pattern: every `.input()` / `.use()` returns a *new type* carrying the accumulated
  context. This is the pattern to steal for your own fluent APIs.
- `trpc/packages/server/src/unstable-core-do-not-import/router.ts` — how a nested record of
  procedures becomes a client proxy type.
- `trpc/packages/server/src/unstable-core-do-not-import/clientish/serialize.ts` — modelling
  "what survives JSON serialization" as a type transformation. Underrated and very practical.
- `tanstack-query/packages/react-query/src/useQueries.ts` — ~30 explicit overloads so that
  `useQueries([a, b, c])` returns a correctly-typed *tuple*. The lesson is negative as much as
  positive: sometimes hand-written overloads beat a clever generic.
- `elysia/src/types.ts` — 44 `infer` sites; aggressive accumulation of route state into a
  single instance type.

**Techniques to extract:** builder types that thread state through method chains; using
`interface` for parse results so fields are nameable; route registries via declaration merging;
when to prefer an overload set over conditional types.

---

### 03 — Schema libraries and type-level parsers

This is the most advanced category in the collection.

| Repo | Why it's here |
|---|---|
| **arktype** | A full shift-reduce parser for its own type syntax, running in the checker. |
| **typebox** | Parses actual TypeScript syntax from a string literal, at compile time. |
| **zod** | The most widely-read inference implementation; v3 and v4 side by side. |
| **valibot** | Modular/tree-shakeable design and unusually rigorous issue typing. |
| **abitype** | Parses Solidity ABI signatures from string literals into TS types. |

**Start here:**
- `arktype/ark/type/parser/reduce/static.ts` (314 lines) — **the crown jewel of this
  collection.** A shift-reduce parser state machine implemented entirely in types. Read it
  alongside its runtime twin `reduce/dynamic.ts`: the two files implement the *same* parser,
  one at compile time and one at runtime, which makes the type-level version legible in a way
  it never would be alone.
- `arktype/ark/type/parser/shift/` — the scanner half: `operand/` and `operator/` shift the
  input string one token at a time. `shift/tokens.ts` is the token table.
- `arktype/ark/util/hkt.ts` — higher-kinded types via an `abstract class` with `declare`d
  indexed members. Explicitly credited to `hotscript`, so read that first.
- `typebox/src/type/script/parser.ts` (296 lines, ~130 `infer` sites) — a parser for
  **TypeScript's own syntax** as a template literal type. `Type.Script('{ x: number }')` gives
  you both a JSON Schema value and the corresponding static type.
- `typebox/src/type/script/mapping.ts` — maps the parsed syntax tree onto TypeBox schema types.
- `typebox/src/type/engine/instantiate.ts` — generic instantiation, reimplemented in types.
- `zod/packages/zod/src/v4/core/schemas.ts` — the v4 inference core. Compare with
  `src/v3/types.ts` to see how the rewrite simplified the internal representation; the two
  versions in one tree make this repo unusually good for studying *design evolution*.
- `zod/packages/zod/src/v3/helpers/partialUtil.ts` — a small, self-contained study in deep
  recursive transformation.
- `valibot/library/src/types/issue.ts` — 54 `infer` sites spent on precisely typing error
  paths. Most schema libraries give up here and type errors as `any`.
- `abitype/packages/abitype/src/human-readable/types/signatures.ts` — parses
  `'function foo(uint256 a) returns (bool)'` into a structured type. The most convincing
  demonstration that template-literal parsing is a *practical* tool, not a party trick.

**Techniques to extract:** tokenizer/scanner patterns over string literals; state machines as
recursive generic types; keeping a runtime implementation and a type-level implementation in
lockstep; error reporting from within type-level code.

---

### 04 — Query builders and ORMs

| Repo | Why it's here |
|---|---|
| **kysely** | The best type-level SQL modelling in existence, and unusually well commented. |
| **drizzle-orm** | Column builders and relational inference across several SQL dialects. |

**Start here:**
- `kysely/src/util/type-utils.ts` — read this file first, top to bottom. It's a compact tour of
  `IsNever`, `IsAny`, `Equals`, `Simplify`, `NarrowPartial`, and crucially:
  ```ts
  // Utility to reduce depth of TypeScript's internal type instantiation stack.
  export type DrainOuterGeneric<T> = [T] extends [unknown] ? T : never
  ```
  The doc comment above it walks through the 24-deep nesting that fails without it and
  succeeds with it. **This is the single most valuable performance trick in the collection** —
  it defers instantiation of an outer generic, and it will eventually save you from a
  *"Type instantiation is excessively deep and possibly infinite"* error of your own.
- `kysely/src/parser/select-parser.ts` (206 lines) — how `.select('user.name as author')`
  produces `{ author: string }`. `ExtractAliasFromStringSelectExpression` and
  `ExtractTypeFromStringSelectExpression` parse the SQL alias syntax out of the string literal
  and then look the column type up in the database interface.
- `kysely/src/parser/join-parser.ts` and `table-parser.ts` — how joins widen the set of
  visible tables and make columns nullable.
- `kysely/src/query-builder/select-query-builder.ts` — the accumulating builder that ties it
  all together.
- `drizzle-orm/src/column-builder.ts` — encoding "has default", "is nullable", and
  "is primary key" into the type so insert vs. select types diverge correctly.
- `drizzle-orm/src/relations.ts` — relational query inference.

**Techniques to extract:** modelling an external schema as a TS interface and querying it with
types; parsing a mini-DSL out of string arguments; `DrainOuterGeneric`-style instantiation
deferral; making one builder produce different input and output types.

---

### 05 — Functional programming, effects, and higher-kinded types

TypeScript has no higher-kinded types. These libraries need them anyway. Read them to learn
what the encodings cost.

| Repo | Why it's here |
|---|---|
| **effect** | The most sophisticated type-level design in any production TS library. |
| **fp-ts** | The original URI-based HKT emulation, and much smaller to read. |
| **neverthrow** | A minimal `Result` type — a good palate cleanser. |

**Start here:**
- `fp-ts/src/HKT.ts` — **read this first.** The classic "lightweight higher-kinded
  polymorphism" encoding: a `URItoKind` registry extended by each data type via declaration
  merging, so `Kind<F, A>` becomes a lookup. Under 100 lines and it will reframe how you think
  about the type system's limits.
- `fp-ts/src/pipeable.ts` and `src/Apply.ts` — the fallout: dozens of arity-specific overloads,
  because `pipe` can't be typed generically over arbitrary composition.
- `effect/packages/effect/src/Types.ts` — the variance toolkit:
  ```ts
  export type Invariant<A> = (_: A) => A
  ```
  plus `Covariant` and `Contravariant`. Phantom fields of these types force the checker to
  treat a type parameter with the variance you intend.
- `effect/packages/effect/src/Effect.ts` (15,563 lines — navigate by symbol, don't read
  linearly). The core declaration is a compact lesson in itself:
  ```ts
  export interface Effect<out A, out E = never, out R = never>
    extends Pipeable, Inspectable {
    readonly [TypeId]: Variance<A, E, R>
    [Unify.unifySymbol]?: EffectUnify<this>
  }
  ```
  Three type parameters (success, error, requirements) with **explicit `out` variance
  annotations**, a phantom variance witness under a unique symbol, and hooks into the Unify
  machinery.
- `effect/packages/effect/src/Unify.ts` — solves a problem you'll hit yourself: when a
  conditional returns `Effect<A,E1,R> | Effect<A,E2,R>`, Unify collapses it back into a single
  `Effect` with unioned parameters, so inference stays usable.
- `effect/packages/effect/src/HKT.ts` and `Pipeable.ts` — the modern take on what `fp-ts`
  pioneered.
- `effect/packages/effect/src/Match.ts` — exhaustiveness-checked matching, comparable to
  `ts-pattern` but integrated with the effect system.
- `neverthrow/src/result.ts` — how far you get with plain discriminated unions and no HKTs.

**Techniques to extract:** declaration-merging registries as type-level maps; explicit
`in`/`out` variance annotations; phantom variance witnesses; unique-symbol nominal typing;
union-collapsing to protect inference.

---

### 06 — State machines and forms

| Repo | Why it's here |
|---|---|
| **xstate** | Inferring a machine's entire state/event graph from a config object literal. |
| **react-hook-form** | The reference implementation of type-safe dotted field paths. |
| **zustand** | Middleware typing — a case study in working around missing HKTs. |
| **redux-toolkit** | Builder callbacks and `createSlice`/RTK Query inference. |

**Start here:**
- `react-hook-form/src/types/path/eager.ts` — generates `"user.address.city"` and
  `"items.0.name"` as literal union types from a nested object type, then resolves a path back
  to its value type. Compact, self-contained, and immediately reusable. Read
  `path/common.ts` next for the lazy/recursive variants that handle unions and cycles.
- `xstate/packages/core/src/types.ts` (2,797 lines, ~60 `infer` sites) — inferring valid state
  names, event types, and transition targets from a config object. Read
  `packages/core/src/setup.ts` first: it shows why XState v5 moved to an explicit `setup()`
  call, because inferring everything from one literal proved too much for the checker.
- `xstate/packages/xstate-store/src/types.ts` — the same ideas at a fraction of the size. Start
  here if `core/types.ts` is overwhelming.
- `zustand/src/vanilla.ts` then `src/middleware/immer.ts` and `middleware/devtools.ts` — why
  `create<T>()(...)` has that odd double-call signature, and how middleware types compose
  without HKTs. A short, practical lesson in TypeScript's actual limits.
- `redux-toolkit/packages/toolkit/src/tsHelpers.ts` — the shared utilities.
- `redux-toolkit/packages/toolkit/src/createSlice.ts` — deriving action creators and their
  payload types from a reducers object.
- `redux-toolkit/packages/toolkit/src/query/endpointDefinitions.ts` — 34 `infer` sites; the
  most type-dense file in the repo.

**Techniques to extract:** recursive path types over object graphs; inferring from object
literals via `const` type parameters and generic defaults; the curried-call workaround for
partial type argument inference.

---

### 07 — Compiler internals

- **typescript** — a sparse checkout of `src/compiler/` only (9 MB instead of ~600 MB).

**Start here:**
- `src/compiler/types.ts` — the AST and type representations. `TypeFlags`, `ObjectFlags`, and
  the `Type` hierarchy are the vocabulary the rest of the compiler thinks in. Skim it as a
  reference, don't read it straight through.
- `src/compiler/checker.ts` (54,434 lines — **navigate by search only**). High-value entry
  points:
  ```bash
  grep -n 'function getConditionalType\|function inferTypes\|function isRelatedTo' src/compiler/checker.ts
  grep -n 'function instantiateType\|instantiationDepth\|instantiationCount' src/compiler/checker.ts
  grep -n 'function getTemplateLiteralType' src/compiler/checker.ts
  ```
  Reading `instantiationDepth` and `instantiationCount` will tell you exactly what
  *"excessively deep"* means and why `DrainOuterGeneric` works.

**Why bother:** once you've seen `getConditionalType` defer evaluation on an unresolved type
parameter, the behaviour of every library above stops being folklore.

---

## Technique → where to see it

| Technique | Best examples |
|---|---|
| Template literal parsing | `arktype/ark/type/parser/shift/`, `abitype/.../signatures.ts`, `tanstack-router/.../link.ts`, `kysely/src/parser/select-parser.ts` |
| Full parser / state machine in types | `arktype/.../reduce/static.ts`, `typebox/src/type/script/parser.ts` |
| Recursive object-graph traversal | `type-fest/source/required-deep.d.ts`, `react-hook-form/src/types/path/eager.ts` |
| Accumulating builder types | `trpc/.../procedureBuilder.ts`, `kysely/src/query-builder/select-query-builder.ts`, `elysia/src/types.ts` |
| Higher-kinded type emulation | `fp-ts/src/HKT.ts`, `arktype/ark/util/hkt.ts`, `hotscript/src/internals/core/Core.ts` |
| Explicit variance / phantom types | `effect/packages/effect/src/Types.ts`, `effect/.../Effect.ts` |
| Union distribution control | `ts-pattern/src/types/DistributeUnions.ts`, `effect/.../Unify.ts` |
| Instantiation-depth performance | `kysely/src/util/type-utils.ts` (`DrainOuterGeneric`), `xstate/packages/core/src/setup.ts` |
| Overload sets over generics | `tanstack-query/.../useQueries.ts`, `fp-ts/src/pipeable.ts`, `expect-type/src/overloads.ts` |
| Testing types | `expect-type/src/index.ts`, any `*.test-d.ts` in these repos |
| Type-level arithmetic | `hotscript/src/internals/numbers/`, `ts-toolbelt/sources/Number/` |

---

## Refreshing

`.git` was removed from each clone to save space, so update by re-cloning:

```bash
./refresh.sh                      # re-clone everything
./refresh.sh kysely effect        # or just the ones you name
```

## Inventory

```
01-type-level-programming/     type-challenges type-fest hotscript ts-toolbelt ts-pattern expect-type
02-inference-at-scale/         tanstack-router trpc hono elysia tanstack-query
03-schema-and-type-level-parsers/  arktype typebox zod valibot abitype
04-query-builders-orm/         kysely drizzle-orm
05-functional-effects-hkt/     effect fp-ts neverthrow
06-state-and-forms/            xstate react-hook-form zustand redux-toolkit
07-compiler-internals/         typescript (src/compiler only)
```
