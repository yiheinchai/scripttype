## Round-trip coverage

| repo | aliases | covered | % of all | % judgeable | raw | mismatch | unjudged |
|---|--:|--:|--:|--:|--:|--:|--:|
| 03-schema-and-type-level-parsers/typebox | 866 | 631 | 72.9% | 72.9% | 2 | 0 | 0 |
| 03-schema-and-type-level-parsers/arktype | 748 | 332 | 44.4% | 44.4% | 13 | 15 | 0 |
| 05-functional-effects-hkt/effect | 661 | 179 | 27.1% | 27.1% | 9 | 42 | 0 |
| 01-type-level-programming/type-fest | 618 | 425 | 68.8% | 68.8% | 2 | 4 | 0 |
| 04-query-builders-orm/drizzle-orm | 547 | 293 | 53.6% | 53.6% | 0 | 1 | 0 |
| 02-inference-at-scale/tanstack-router | 510 | 334 | 65.5% | 65.5% | 1 | 25 | 0 |
| 01-type-level-programming/ts-toolbelt | 372 | 201 | 54.0% | 54.0% | 1 | 5 | 0 |
| 06-state-and-forms/redux-toolkit | 336 | 145 | 43.2% | 43.2% | 34 | 20 | 0 |
| 01-type-level-programming/hotscript | 309 | 58 | 18.8% | 18.8% | 0 | 14 | 0 |
| 02-inference-at-scale/trpc | 292 | 163 | 55.8% | 55.8% | 7 | 8 | 0 |
| 02-inference-at-scale/tanstack-query | 252 | 114 | 45.2% | 45.2% | 0 | 4 | 0 |
| 06-state-and-forms/xstate | 242 | 101 | 41.7% | 41.7% | 6 | 10 | 0 |
| 03-schema-and-type-level-parsers/zod | 197 | 99 | 50.3% | 50.3% | 2 | 6 | 0 |
| 01-type-level-programming/type-challenges | 196 | 136 | 69.4% | 69.4% | 0 | 0 | 0 |
| 04-query-builders-orm/kysely | 189 | 126 | 66.7% | 66.7% | 0 | 0 | 0 |
| 06-state-and-forms/react-hook-form | 146 | 112 | 76.7% | 76.7% | 2 | 22 | 0 |
| 03-schema-and-type-level-parsers/valibot | 134 | 55 | 41.0% | 41.0% | 2 | 2 | 0 |
| 02-inference-at-scale/hono | 133 | 43 | 32.3% | 32.3% | 2 | 3 | 0 |
| 01-type-level-programming/ts-pattern | 130 | 114 | 87.7% | 87.7% | 8 | 0 | 0 |
| 02-inference-at-scale/elysia | 122 | 6 | 4.9% | 4.9% | 2 | 0 | 0 |
| 03-schema-and-type-level-parsers/abitype | 108 | 43 | 39.8% | 39.8% | 0 | 1 | 0 |
| 01-type-level-programming/expect-type | 79 | 72 | 91.1% | 91.1% | 0 | 5 | 0 |
| 06-state-and-forms/zustand | 34 | 12 | 35.3% | 35.3% | 8 | 0 | 0 |
| 07-compiler-internals/typescript | 31 | 24 | 77.4% | 77.4% | 0 | 2 | 0 |
| 05-functional-effects-hkt/fp-ts | 28 | 11 | 39.3% | 39.3% | 1 | 0 | 0 |
| 05-functional-effects-hkt/neverthrow | 20 | 20 | 100.0% | 100.0% | 0 | 0 | 0 |
| shard9 | — | — | — | — | — | — | not measured: no output |
| **TOTAL** | **7300** | **3849** | **52.7%** | **52.7%** | **102** | **189** | **0** |

- **covered**: decompiled to ScriptType, recompiled, and type-identical to the original.
- **raw**: the decompiler hit a construct the language cannot express (102).
- **mismatch**: compiled but not type-identical (189); **compile-error**: 3046.
- **unresolvable**: the harness could not typecheck the reference in isolation (cross-file imports, no node_modules in the clones) — 0. A harness limitation, not a language gap.

### Language gaps (raw() fallbacks), most frequent first

- 50 — object member MethodSignature
- 49 — object member CallSignature
- 16 — type node FirstTypeNode
- 9 — literal type FirstTemplateToken
- 4 — object member ConstructSignature
- 3 — index signature combined with other members
