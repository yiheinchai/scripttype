## Round-trip coverage

| repo | aliases | covered | % of all | % judgeable | raw | mismatch | unjudged |
|---|--:|--:|--:|--:|--:|--:|--:|
| 03-schema-and-type-level-parsers/typebox | 910 | 722 | 79.3% | 79.3% | 19 | 0 | 0 |
| 03-schema-and-type-level-parsers/arktype | 759 | 503 | 66.3% | 66.3% | 39 | 36 | 0 |
| 05-functional-effects-hkt/effect | 693 | 274 | 39.5% | 39.5% | 33 | 76 | 0 |
| 01-type-level-programming/type-fest | 624 | 554 | 88.8% | 88.8% | 12 | 4 | 0 |
| 04-query-builders-orm/drizzle-orm | 578 | 503 | 87.0% | 87.0% | 19 | 0 | 0 |
| 02-inference-at-scale/tanstack-router | 512 | 447 | 87.3% | 87.3% | 45 | 5 | 0 |
| 01-type-level-programming/ts-toolbelt | 386 | 309 | 80.1% | 80.1% | 4 | 5 | 0 |
| 06-state-and-forms/redux-toolkit | 357 | 269 | 75.4% | 75.4% | 64 | 13 | 0 |
| 01-type-level-programming/hotscript | 314 | 154 | 49.0% | 49.0% | 1 | 33 | 0 |
| 02-inference-at-scale/trpc | 295 | 254 | 86.1% | 86.1% | 23 | 8 | 0 |
| 02-inference-at-scale/tanstack-query | 258 | 238 | 92.2% | 92.2% | 1 | 10 | 0 |
| 06-state-and-forms/xstate | 245 | 201 | 82.0% | 82.0% | 13 | 9 | 0 |
| 03-schema-and-type-level-parsers/zod | 197 | 119 | 60.4% | 60.4% | 16 | 15 | 0 |
| 01-type-level-programming/type-challenges | 196 | 195 | 99.5% | 99.5% | 1 | 0 | 0 |
| 04-query-builders-orm/kysely | 196 | 194 | 99.0% | 99.0% | 2 | 0 | 0 |
| 03-schema-and-type-level-parsers/valibot | 154 | 134 | 87.0% | 87.0% | 8 | 2 | 0 |
| 06-state-and-forms/react-hook-form | 148 | 118 | 79.7% | 79.7% | 13 | 16 | 0 |
| 02-inference-at-scale/hono | 133 | 111 | 83.5% | 83.5% | 8 | 6 | 0 |
| 01-type-level-programming/ts-pattern | 130 | 111 | 85.4% | 85.4% | 10 | 0 | 0 |
| 02-inference-at-scale/elysia | 122 | 93 | 76.2% | 76.2% | 7 | 0 | 0 |
| 03-schema-and-type-level-parsers/abitype | 110 | 94 | 85.5% | 85.5% | 1 | 1 | 0 |
| 01-type-level-programming/expect-type | 79 | 69 | 87.3% | 87.3% | 6 | 3 | 0 |
| 06-state-and-forms/zustand | 34 | 25 | 73.5% | 73.5% | 9 | 0 | 0 |
| 07-compiler-internals/typescript | 31 | 26 | 83.9% | 83.9% | 1 | 2 | 0 |
| 05-functional-effects-hkt/fp-ts | 29 | 24 | 82.8% | 82.8% | 1 | 0 | 0 |
| 05-functional-effects-hkt/neverthrow | 28 | 28 | 100.0% | 100.0% | 0 | 0 | 0 |
| **TOTAL** | **7518** | **5769** | **76.7%** | **76.7%** | **356** | **244** | **0** |

- **covered**: decompiled to ScriptType, recompiled, and type-identical to the original.
- **raw**: the decompiler hit a construct the language cannot express (356).
- **mismatch**: compiled but not type-identical (244); **compile-error**: 620.
- **unresolvable**: the harness could not typecheck the reference in isolation (cross-file imports, no node_modules in the clones) — 0. A harness limitation, not a language gap.

### Language gaps (raw() fallbacks), most frequent first

- 143 — generic function type
- 106 — index signature
- 87 — type node TypeQuery
- 79 — type node ConstructorType
- 52 — object member CallSignature
- 50 — object member MethodSignature
- 29 — optional tuple element
- 16 — type node FirstTypeNode
- 9 — literal type FirstTemplateToken
- 4 — object member ConstructSignature
