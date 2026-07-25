## Round-trip coverage

| repo | aliases | covered | % of all | % judgeable | raw | mismatch | unjudged |
|---|--:|--:|--:|--:|--:|--:|--:|
| 03-schema-and-type-level-parsers/typebox | 910 | 857 | 94.2% | 94.2% | 19 | 0 | 0 |
| 03-schema-and-type-level-parsers/arktype | 759 | 531 | 70.0% | 70.0% | 39 | 62 | 0 |
| 05-functional-effects-hkt/effect | 693 | 374 | 54.0% | 54.0% | 33 | 84 | 0 |
| 01-type-level-programming/type-fest | 624 | 574 | 92.0% | 92.0% | 12 | 3 | 0 |
| 04-query-builders-orm/drizzle-orm | 578 | 540 | 93.4% | 93.4% | 19 | 0 | 0 |
| 02-inference-at-scale/tanstack-router | 512 | 456 | 89.1% | 89.1% | 45 | 5 | 0 |
| 01-type-level-programming/ts-toolbelt | 386 | 325 | 84.2% | 84.2% | 4 | 3 | 0 |
| 06-state-and-forms/redux-toolkit | 357 | 278 | 77.9% | 77.9% | 64 | 13 | 0 |
| 01-type-level-programming/hotscript | 314 | 159 | 50.6% | 50.6% | 1 | 42 | 0 |
| 02-inference-at-scale/trpc | 295 | 250 | 84.7% | 84.7% | 23 | 11 | 0 |
| 02-inference-at-scale/tanstack-query | 258 | 240 | 93.0% | 93.0% | 1 | 10 | 0 |
| 06-state-and-forms/xstate | 245 | 204 | 83.3% | 83.3% | 13 | 12 | 0 |
| 03-schema-and-type-level-parsers/zod | 197 | 143 | 72.6% | 72.6% | 16 | 21 | 0 |
| 01-type-level-programming/type-challenges | 196 | 195 | 99.5% | 99.5% | 1 | 0 | 0 |
| 04-query-builders-orm/kysely | 196 | 194 | 99.0% | 99.0% | 2 | 0 | 0 |
| 03-schema-and-type-level-parsers/valibot | 154 | 143 | 92.9% | 92.9% | 8 | 2 | 0 |
| 06-state-and-forms/react-hook-form | 148 | 118 | 79.7% | 79.7% | 13 | 16 | 0 |
| 02-inference-at-scale/hono | 133 | 114 | 85.7% | 85.7% | 8 | 4 | 0 |
| 01-type-level-programming/ts-pattern | 130 | 117 | 90.0% | 90.0% | 10 | 2 | 0 |
| 02-inference-at-scale/elysia | 122 | 94 | 77.0% | 77.0% | 7 | 0 | 0 |
| 03-schema-and-type-level-parsers/abitype | 110 | 103 | 93.6% | 93.6% | 1 | 1 | 0 |
| 01-type-level-programming/expect-type | 79 | 70 | 88.6% | 88.6% | 6 | 3 | 0 |
| 06-state-and-forms/zustand | 34 | 25 | 73.5% | 73.5% | 9 | 0 | 0 |
| 07-compiler-internals/typescript | 31 | 27 | 87.1% | 87.1% | 1 | 2 | 0 |
| 05-functional-effects-hkt/fp-ts | 29 | 28 | 96.6% | 96.6% | 1 | 0 | 0 |
| 05-functional-effects-hkt/neverthrow | 28 | 28 | 100.0% | 100.0% | 0 | 0 | 0 |
| **TOTAL** | **7518** | **6187** | **82.3%** | **82.3%** | **356** | **296** | **0** |

- **covered**: decompiled to ScriptType, recompiled, and type-identical to the original.
- **raw**: the decompiler hit a construct the language cannot express (356).
- **mismatch**: compiled but not type-identical (296); **compile-error**: 679.
- **unresolvable**: the harness could not typecheck the reference in isolation (cross-file imports, no node_modules in the clones) — 0. A harness limitation, not a language gap.

### Language gaps (raw() fallbacks), most frequent first

- 143 — generic function type
- 114 — index signature
- 87 — type node TypeQuery
- 79 — type node ConstructorType
- 52 — object member CallSignature
- 50 — object member MethodSignature
- 29 — optional tuple element
- 16 — type node FirstTypeNode
- 9 — literal type FirstTemplateToken
- 4 — object member ConstructSignature
