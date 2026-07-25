## Round-trip coverage



| repo | aliases | covered | % of all | % judgeable | raw | mismatch | unjudged |
|---|--:|--:|--:|--:|--:|--:|--:|
| 03-schema-and-type-level-parsers/typebox | 910 | 854 | 93.8% | 93.8% | 2 | 0 | 0 |
| 03-schema-and-type-level-parsers/arktype | 759 | 613 | 80.8% | 80.8% | 14 | 7 | 0 |
| 05-functional-effects-hkt/effect | 693 | 548 | 79.1% | 79.1% | 8 | 10 | 0 |
| 01-type-level-programming/type-fest | 624 | 573 | 91.8% | 91.8% | 2 | 4 | 0 |
| 04-query-builders-orm/drizzle-orm | 578 | 530 | 91.7% | 91.7% | 0 | 1 | 0 |
| 02-inference-at-scale/tanstack-router | 512 | 491 | 95.9% | 95.9% | 1 | 0 | 0 |
| 01-type-level-programming/ts-toolbelt | 386 | 314 | 81.3% | 81.3% | 1 | 3 | 0 |
| 06-state-and-forms/redux-toolkit | 357 | 303 | 84.9% | 84.9% | 38 | 1 | 0 |
| 01-type-level-programming/hotscript | 314 | 189 | 60.2% | 60.2% | 0 | 20 | 0 |
| 02-inference-at-scale/trpc | 295 | 274 | 92.9% | 92.9% | 7 | 1 | 0 |
| 02-inference-at-scale/tanstack-query | 258 | 248 | 96.1% | 96.1% | 0 | 0 | 0 |
| 06-state-and-forms/xstate | 245 | 223 | 91.0% | 91.0% | 7 | 6 | 0 |
| 03-schema-and-type-level-parsers/zod | 197 | 168 | 85.3% | 85.3% | 2 | 2 | 0 |
| 01-type-level-programming/type-challenges | 196 | 196 | 100.0% | 100.0% | 0 | 0 | 0 |
| 04-query-builders-orm/kysely | 196 | 195 | 99.5% | 99.5% | 0 | 0 | 0 |
| 03-schema-and-type-level-parsers/valibot | 154 | 139 | 90.3% | 90.3% | 2 | 0 | 0 |
| 06-state-and-forms/react-hook-form | 148 | 143 | 96.6% | 96.6% | 2 | 0 | 0 |
| 02-inference-at-scale/hono | 133 | 118 | 88.7% | 88.7% | 2 | 2 | 0 |
| 01-type-level-programming/ts-pattern | 130 | 114 | 87.7% | 87.7% | 8 | 0 | 0 |
| 02-inference-at-scale/elysia | 122 | 94 | 77.0% | 77.0% | 2 | 0 | 0 |
| 03-schema-and-type-level-parsers/abitype | 110 | 96 | 87.3% | 87.3% | 0 | 1 | 0 |
| 01-type-level-programming/expect-type | 79 | 76 | 96.2% | 96.2% | 0 | 1 | 0 |
| 06-state-and-forms/zustand | 34 | 21 | 61.8% | 61.8% | 7 | 0 | 0 |
| 07-compiler-internals/typescript | 31 | 29 | 93.5% | 93.5% | 0 | 1 | 0 |
| 05-functional-effects-hkt/fp-ts | 29 | 24 | 82.8% | 82.8% | 1 | 0 | 0 |
| 05-functional-effects-hkt/neverthrow | 28 | 28 | 100.0% | 100.0% | 0 | 0 | 0 |
| sweep1_6 | — | — | — | — | — | — | not measured: no output |
| sweep1_7 | — | — | — | — | — | — | not measured: no output |
| sweep1_8 | — | — | — | — | — | — | not measured: no output |
| sweep2_0 | — | — | — | — | — | — | not measured: no output |
| sweep2_3 | — | — | — | — | — | — | not measured: no output |
| **TOTAL** | **7518** | **6601** | **87.8%** | **87.8%** | **106** | **60** | **0** |

- **covered**: decompiled to ScriptType, recompiled, and type-identical to the original.
- **raw**: the decompiler hit a construct the language cannot express (106).
- **mismatch**: compiled but not type-identical (60); **compile-error**: 469.
- **unresolvable**: the harness could not typecheck the reference in isolation (cross-file imports, no node_modules in the clones) — 0. A harness limitation, not a language gap.

### Language gaps (raw() fallbacks), most frequent first

- 51 — object member CallSignature
- 49 — object member MethodSignature
- 17 — type node FirstTypeNode
- 10 — literal type FirstTemplateToken
- 4 — object member ConstructSignature
- 3 — index signature combined with other members
