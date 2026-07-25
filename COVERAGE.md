## Round-trip coverage

| repo | aliases | covered | % of all | % judgeable | raw | mismatch | unjudged |
|---|--:|--:|--:|--:|--:|--:|--:|
| 03-schema-and-type-level-parsers/typebox | 910 | 722 | 79.3% | 79.3% | 21 | 0 | 0 |
| 03-schema-and-type-level-parsers/arktype | 759 | 490 | 64.6% | 64.6% | 52 | 34 | 0 |
| 05-functional-effects-hkt/effect | 693 | 272 | 39.2% | 39.2% | 45 | 69 | 0 |
| 01-type-level-programming/type-fest | 624 | 541 | 86.7% | 86.7% | 16 | 4 | 0 |
| 04-query-builders-orm/drizzle-orm | 578 | 495 | 85.6% | 85.6% | 27 | 0 | 0 |
| 02-inference-at-scale/tanstack-router | 512 | 415 | 81.1% | 81.1% | 45 | 3 | 0 |
| 01-type-level-programming/ts-toolbelt | 386 | 311 | 80.6% | 80.6% | 4 | 4 | 0 |
| 06-state-and-forms/redux-toolkit | 357 | 260 | 72.8% | 72.8% | 67 | 11 | 0 |
| 01-type-level-programming/hotscript | 314 | 154 | 49.0% | 49.0% | 1 | 33 | 0 |
| 02-inference-at-scale/trpc | 295 | 217 | 73.6% | 73.6% | 40 | 6 | 0 |
| 02-inference-at-scale/tanstack-query | 258 | 228 | 88.4% | 88.4% | 1 | 9 | 0 |
| 06-state-and-forms/xstate | 245 | 196 | 80.0% | 80.0% | 15 | 9 | 0 |
| 03-schema-and-type-level-parsers/zod | 197 | 115 | 58.4% | 58.4% | 19 | 14 | 0 |
| 01-type-level-programming/type-challenges | 196 | 195 | 99.5% | 99.5% | 1 | 0 | 0 |
| 04-query-builders-orm/kysely | 196 | 191 | 97.4% | 97.4% | 2 | 0 | 0 |
| 03-schema-and-type-level-parsers/valibot | 154 | 123 | 79.9% | 79.9% | 11 | 2 | 0 |
| 06-state-and-forms/react-hook-form | 148 | 112 | 75.7% | 75.7% | 13 | 13 | 0 |
| 02-inference-at-scale/hono | 133 | 95 | 71.4% | 71.4% | 8 | 7 | 0 |
| 01-type-level-programming/ts-pattern | 130 | 104 | 80.0% | 80.0% | 13 | 0 | 0 |
| 02-inference-at-scale/elysia | 122 | 86 | 70.5% | 70.5% | 11 | 0 | 0 |
| 03-schema-and-type-level-parsers/abitype | 110 | 98 | 89.1% | 89.1% | 5 | 0 | 0 |
| 01-type-level-programming/expect-type | 79 | 68 | 86.1% | 86.1% | 6 | 3 | 0 |
| 06-state-and-forms/zustand | 34 | 25 | 73.5% | 73.5% | 9 | 0 | 0 |
| 07-compiler-internals/typescript | 31 | 24 | 77.4% | 77.4% | 2 | 2 | 0 |
| 05-functional-effects-hkt/fp-ts | 29 | 24 | 82.8% | 82.8% | 1 | 0 | 0 |
| 05-functional-effects-hkt/neverthrow | 28 | 24 | 85.7% | 85.7% | 4 | 0 | 0 |
| **TOTAL** | **7518** | **5585** | **74.3%** | **74.3%** | **439** | **223** | **0** |

- **covered**: decompiled to ScriptType, recompiled, and type-identical to the original.
- **raw**: the decompiler hit a construct the language cannot express (439).
- **mismatch**: compiled but not type-identical (223); **compile-error**: 611.
- **unresolvable**: the harness could not typecheck the reference in isolation (cross-file imports, no node_modules in the clones) — 0. A harness limitation, not a language gap.

### Language gaps (raw() fallbacks), most frequent first

- 143 — generic function type
- 114 — index signature
- 89 — pattern bindings inside a mapped-type value
- 87 — type node TypeQuery
- 79 — type node ConstructorType
- 52 — object member CallSignature
- 49 — object member MethodSignature
- 29 — optional tuple element
- 16 — type node FirstTypeNode
- 9 — literal type FirstTemplateToken
- 4 — object member ConstructSignature
