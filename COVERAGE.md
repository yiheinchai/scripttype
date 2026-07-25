## Round-trip coverage

> **Partial run.** 6368 of 7518 generic type aliases were measured; shards that exceeded their wall-clock cap contributed only their completed batches. Percentages below are of what was measured.

| repo | aliases | covered | % of all | % judgeable | raw | mismatch | unjudged |
|---|--:|--:|--:|--:|--:|--:|--:|
| 03-schema-and-type-level-parsers/typebox | 815 | 793 | 97.3% | 97.3% | 1 | 0 | 0 |
| 03-schema-and-type-level-parsers/arktype | 625 | 425 | 68.0% | 68.0% | 12 | 39 | 0 |
| 01-type-level-programming/type-fest | 586 | 522 | 89.1% | 89.1% | 2 | 8 | 0 |
| 05-functional-effects-hkt/effect | 561 | 289 | 51.5% | 51.5% | 9 | 72 | 0 |
| 04-query-builders-orm/drizzle-orm | 506 | 467 | 92.3% | 92.3% | 0 | 3 | 0 |
| 02-inference-at-scale/tanstack-router | 477 | 443 | 92.9% | 92.9% | 1 | 23 | 0 |
| 01-type-level-programming/ts-toolbelt | 365 | 293 | 80.3% | 80.3% | 1 | 6 | 0 |
| 01-type-level-programming/hotscript | 314 | 157 | 50.0% | 50.0% | 0 | 33 | 0 |
| 02-inference-at-scale/trpc | 278 | 240 | 86.3% | 86.3% | 7 | 13 | 0 |
| 06-state-and-forms/redux-toolkit | 220 | 167 | 75.9% | 75.9% | 29 | 11 | 0 |
| 01-type-level-programming/type-challenges | 178 | 178 | 100.0% | 100.0% | 0 | 0 | 0 |
| 02-inference-at-scale/tanstack-query | 150 | 138 | 92.0% | 92.0% | 0 | 5 | 0 |
| 04-query-builders-orm/kysely | 149 | 149 | 100.0% | 100.0% | 0 | 0 | 0 |
| 06-state-and-forms/react-hook-form | 144 | 116 | 80.6% | 80.6% | 2 | 23 | 0 |
| 06-state-and-forms/xstate | 141 | 117 | 83.0% | 83.0% | 5 | 12 | 0 |
| 03-schema-and-type-level-parsers/valibot | 140 | 122 | 87.1% | 87.1% | 2 | 2 | 0 |
| 01-type-level-programming/ts-pattern | 130 | 114 | 87.7% | 87.7% | 8 | 0 | 0 |
| 02-inference-at-scale/hono | 128 | 111 | 86.7% | 86.7% | 0 | 5 | 0 |
| 02-inference-at-scale/elysia | 122 | 93 | 76.2% | 76.2% | 2 | 0 | 0 |
| 03-schema-and-type-level-parsers/zod | 101 | 80 | 79.2% | 79.2% | 2 | 7 | 0 |
| 01-type-level-programming/expect-type | 79 | 72 | 91.1% | 91.1% | 0 | 5 | 0 |
| 03-schema-and-type-level-parsers/abitype | 66 | 60 | 90.9% | 90.9% | 0 | 1 | 0 |
| 07-compiler-internals/typescript | 31 | 26 | 83.9% | 83.9% | 0 | 3 | 0 |
| 05-functional-effects-hkt/neverthrow | 28 | 28 | 100.0% | 100.0% | 0 | 0 | 0 |
| 05-functional-effects-hkt/fp-ts | 22 | 19 | 86.4% | 86.4% | 1 | 0 | 0 |
| 06-state-and-forms/zustand | 12 | 8 | 66.7% | 66.7% | 4 | 0 | 0 |
| shard135 | — | — | — | — | — | — | not measured: no output |
| shard136 | — | — | — | — | — | — | not measured: no output |
| shard147 | — | — | — | — | — | — | not measured: no output |
| shard148 | — | — | — | — | — | — | not measured: no output |
| shard149 | — | — | — | — | — | — | not measured: no output |
| **TOTAL** | **6368** | **5227** | **82.1%** | **82.1%** | **88** | **271** | **0** |

- **covered**: decompiled to ScriptType, recompiled, and type-identical to the original.
- **raw**: the decompiler hit a construct the language cannot express (88).
- **mismatch**: compiled but not type-identical (271); **compile-error**: 612.
- **unresolvable**: the harness could not typecheck the reference in isolation (cross-file imports, no node_modules in the clones) — 0. A harness limitation, not a language gap.

### Language gaps (raw() fallbacks), most frequent first

- 42 — object member MethodSignature
- 40 — object member CallSignature
- 17 — type node FirstTypeNode
- 6 — literal type FirstTemplateToken
- 4 — object member ConstructSignature
- 2 — index signature combined with other members
