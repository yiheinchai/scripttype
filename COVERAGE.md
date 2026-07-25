## Round-trip coverage



| repo | aliases | covered | % of all | % judgeable | raw | mismatch | unjudged |
|---|--:|--:|--:|--:|--:|--:|--:|
| 03-schema-and-type-level-parsers/typebox | 910 | 829 | 91.1% | 91.1% | 2 | 0 | 0 |
| 03-schema-and-type-level-parsers/arktype | 759 | 590 | 77.7% | 77.7% | 14 | 7 | 0 |
| 05-functional-effects-hkt/effect | 693 | 468 | 67.5% | 67.5% | 9 | 9 | 0 |
| 01-type-level-programming/type-fest | 624 | 573 | 91.8% | 91.8% | 2 | 4 | 0 |
| 04-query-builders-orm/drizzle-orm | 578 | 494 | 85.5% | 85.5% | 0 | 1 | 0 |
| 02-inference-at-scale/tanstack-router | 512 | 497 | 97.1% | 97.1% | 1 | 0 | 0 |
| 01-type-level-programming/ts-toolbelt | 386 | 314 | 81.3% | 81.3% | 1 | 3 | 0 |
| 06-state-and-forms/redux-toolkit | 357 | 297 | 83.2% | 83.2% | 35 | 1 | 0 |
| 01-type-level-programming/hotscript | 314 | 189 | 60.2% | 60.2% | 0 | 20 | 0 |
| 02-inference-at-scale/trpc | 295 | 274 | 92.9% | 92.9% | 7 | 1 | 0 |
| 02-inference-at-scale/tanstack-query | 258 | 248 | 96.1% | 96.1% | 0 | 0 | 0 |
| 06-state-and-forms/xstate | 245 | 208 | 84.9% | 84.9% | 6 | 6 | 0 |
| 03-schema-and-type-level-parsers/zod | 197 | 131 | 66.5% | 66.5% | 2 | 2 | 0 |
| 01-type-level-programming/type-challenges | 196 | 196 | 100.0% | 100.0% | 0 | 0 | 0 |
| 04-query-builders-orm/kysely | 196 | 188 | 95.9% | 95.9% | 0 | 0 | 0 |
| 03-schema-and-type-level-parsers/valibot | 154 | 119 | 77.3% | 77.3% | 2 | 0 | 0 |
| 06-state-and-forms/react-hook-form | 148 | 130 | 87.8% | 87.8% | 2 | 0 | 0 |
| 02-inference-at-scale/hono | 133 | 117 | 88.0% | 88.0% | 2 | 2 | 0 |
| 01-type-level-programming/ts-pattern | 130 | 114 | 87.7% | 87.7% | 8 | 0 | 0 |
| 02-inference-at-scale/elysia | 122 | 94 | 77.0% | 77.0% | 2 | 0 | 0 |
| 03-schema-and-type-level-parsers/abitype | 110 | 96 | 87.3% | 87.3% | 0 | 1 | 0 |
| 01-type-level-programming/expect-type | 79 | 76 | 96.2% | 96.2% | 0 | 1 | 0 |
| 06-state-and-forms/zustand | 34 | 26 | 76.5% | 76.5% | 8 | 0 | 0 |
| 07-compiler-internals/typescript | 31 | 29 | 93.5% | 93.5% | 0 | 1 | 0 |
| 05-functional-effects-hkt/fp-ts | 29 | 23 | 79.3% | 79.3% | 1 | 0 | 0 |
| 05-functional-effects-hkt/neverthrow | 28 | 20 | 71.4% | 71.4% | 0 | 0 | 0 |
| **TOTAL** | **7518** | **6340** | **84.3%** | **84.3%** | **104** | **59** | **0** |

- **covered**: decompiled to ScriptType, recompiled, and type-identical to the original.
- **raw**: the decompiler hit a construct the language cannot express (104).
- **mismatch**: compiled but not type-identical (59); **compile-error**: 535.
- **unresolvable**: the harness could not typecheck the reference in isolation (cross-file imports, no node_modules in the clones) — 0. A harness limitation, not a language gap.

### Language gaps (raw() fallbacks), most frequent first

- 50 — object member CallSignature
- 48 — object member MethodSignature
- 18 — type node FirstTypeNode
- 10 — literal type FirstTemplateToken
- 4 — object member ConstructSignature
- 3 — index signature combined with other members
