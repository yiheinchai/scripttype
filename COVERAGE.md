## Round-trip coverage

| repo | aliases | covered | % of all | % judgeable | raw | mismatch | unjudged |
|---|--:|--:|--:|--:|--:|--:|--:|
| 03-schema-and-type-level-parsers/typebox | 910 | 722 | 79.3% | 79.3% | 21 | 0 | 0 |
| 03-schema-and-type-level-parsers/arktype | 759 | 491 | 64.7% | 64.7% | 52 | 34 | 0 |
| 05-functional-effects-hkt/effect | 693 | 271 | 39.1% | 39.1% | 45 | 71 | 0 |
| 01-type-level-programming/type-fest | 624 | 550 | 88.1% | 88.1% | 16 | 4 | 0 |
| 04-query-builders-orm/drizzle-orm | 578 | 496 | 85.8% | 85.8% | 27 | 0 | 0 |
| 02-inference-at-scale/tanstack-router | 512 | 447 | 87.3% | 87.3% | 45 | 5 | 0 |
| 01-type-level-programming/ts-toolbelt | 386 | 309 | 80.1% | 80.1% | 4 | 5 | 0 |
| 06-state-and-forms/redux-toolkit | 357 | 266 | 74.5% | 74.5% | 67 | 13 | 0 |
| 01-type-level-programming/hotscript | 314 | 154 | 49.0% | 49.0% | 1 | 33 | 0 |
| 02-inference-at-scale/trpc | 295 | 237 | 80.3% | 80.3% | 40 | 8 | 0 |
| 02-inference-at-scale/tanstack-query | 258 | 238 | 92.2% | 92.2% | 1 | 10 | 0 |
| 06-state-and-forms/xstate | 245 | 198 | 80.8% | 80.8% | 15 | 9 | 0 |
| 03-schema-and-type-level-parsers/zod | 197 | 118 | 59.9% | 59.9% | 19 | 14 | 0 |
| 01-type-level-programming/type-challenges | 196 | 195 | 99.5% | 99.5% | 1 | 0 | 0 |
| 04-query-builders-orm/kysely | 196 | 192 | 98.0% | 98.0% | 2 | 0 | 0 |
| 03-schema-and-type-level-parsers/valibot | 154 | 131 | 85.1% | 85.1% | 11 | 2 | 0 |
| 06-state-and-forms/react-hook-form | 148 | 117 | 79.1% | 79.1% | 13 | 16 | 0 |
| 02-inference-at-scale/hono | 133 | 105 | 78.9% | 78.9% | 8 | 10 | 0 |
| 01-type-level-programming/ts-pattern | 130 | 108 | 83.1% | 83.1% | 13 | 0 | 0 |
| 02-inference-at-scale/elysia | 122 | 90 | 73.8% | 73.8% | 11 | 0 | 0 |
| 03-schema-and-type-level-parsers/abitype | 110 | 94 | 85.5% | 85.5% | 5 | 0 | 0 |
| 01-type-level-programming/expect-type | 79 | 68 | 86.1% | 86.1% | 6 | 3 | 0 |
| 06-state-and-forms/zustand | 34 | 25 | 73.5% | 73.5% | 9 | 0 | 0 |
| 07-compiler-internals/typescript | 31 | 25 | 80.6% | 80.6% | 2 | 2 | 0 |
| 05-functional-effects-hkt/fp-ts | 29 | 24 | 82.8% | 82.8% | 1 | 0 | 0 |
| 05-functional-effects-hkt/neverthrow | 28 | 24 | 85.7% | 85.7% | 4 | 0 | 0 |
| **TOTAL** | **7518** | **5695** | **75.8%** | **75.8%** | **439** | **239** | **0** |

- **covered**: decompiled to ScriptType, recompiled, and type-identical to the original.
- **raw**: the decompiler hit a construct the language cannot express (439).
- **mismatch**: compiled but not type-identical (239); **compile-error**: 616.
- **unresolvable**: the harness could not typecheck the reference in isolation (cross-file imports, no node_modules in the clones) — 0. A harness limitation, not a language gap.

### Language gaps (raw() fallbacks), most frequent first

- 143 — generic function type
- 106 — index signature
- 89 — pattern bindings inside a mapped-type value
- 87 — type node TypeQuery
- 79 — type node ConstructorType
- 52 — object member CallSignature
- 49 — object member MethodSignature
- 29 — optional tuple element
- 16 — type node FirstTypeNode
- 9 — literal type FirstTemplateToken
- 4 — object member ConstructSignature
