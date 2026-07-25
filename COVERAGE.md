## Round-trip coverage

> **Partial run.** 7375 of 7518 generic type aliases were measured; shards that exceeded their wall-clock cap contributed only their completed batches. Percentages below are of what was measured.


| repo | aliases | covered | % of all | % judgeable | raw | mismatch | unjudged |
|---|--:|--:|--:|--:|--:|--:|--:|
| 03-schema-and-type-level-parsers/typebox | 882 | 852 | 96.6% | 96.6% | 0 | 0 | 0 |
| 03-schema-and-type-level-parsers/arktype | 759 | 663 | 87.4% | 87.4% | 0 | 9 | 0 |
| 05-functional-effects-hkt/effect | 671 | 562 | 83.8% | 83.8% | 0 | 15 | 0 |
| 01-type-level-programming/type-fest | 624 | 583 | 93.4% | 93.4% | 0 | 4 | 0 |
| 04-query-builders-orm/drizzle-orm | 557 | 532 | 95.5% | 95.5% | 0 | 1 | 0 |
| 02-inference-at-scale/tanstack-router | 512 | 495 | 96.7% | 96.7% | 0 | 0 | 0 |
| 01-type-level-programming/ts-toolbelt | 386 | 318 | 82.4% | 82.4% | 0 | 3 | 0 |
| 06-state-and-forms/redux-toolkit | 356 | 339 | 95.2% | 95.2% | 0 | 2 | 0 |
| 01-type-level-programming/hotscript | 314 | 193 | 61.5% | 61.5% | 0 | 20 | 0 |
| 02-inference-at-scale/trpc | 295 | 283 | 95.9% | 95.9% | 0 | 1 | 0 |
| 02-inference-at-scale/tanstack-query | 258 | 250 | 96.9% | 96.9% | 0 | 0 | 0 |
| 06-state-and-forms/xstate | 242 | 231 | 95.5% | 95.5% | 0 | 8 | 0 |
| 01-type-level-programming/type-challenges | 196 | 196 | 100.0% | 100.0% | 0 | 0 | 0 |
| 04-query-builders-orm/kysely | 192 | 192 | 100.0% | 100.0% | 0 | 0 | 0 |
| 03-schema-and-type-level-parsers/zod | 154 | 136 | 88.3% | 88.3% | 0 | 5 | 0 |
| 03-schema-and-type-level-parsers/valibot | 144 | 141 | 97.9% | 97.9% | 0 | 0 | 0 |
| 06-state-and-forms/react-hook-form | 144 | 143 | 99.3% | 99.3% | 0 | 0 | 0 |
| 02-inference-at-scale/hono | 133 | 126 | 94.7% | 94.7% | 0 | 2 | 0 |
| 01-type-level-programming/ts-pattern | 130 | 122 | 93.8% | 93.8% | 0 | 2 | 0 |
| 02-inference-at-scale/elysia | 122 | 98 | 80.3% | 80.3% | 0 | 0 | 0 |
| 03-schema-and-type-level-parsers/abitype | 110 | 101 | 91.8% | 91.8% | 0 | 1 | 0 |
| 01-type-level-programming/expect-type | 79 | 78 | 98.7% | 98.7% | 0 | 1 | 0 |
| 07-compiler-internals/typescript | 30 | 28 | 93.3% | 93.3% | 0 | 1 | 0 |
| 05-functional-effects-hkt/fp-ts | 29 | 29 | 100.0% | 100.0% | 0 | 0 | 0 |
| 06-state-and-forms/zustand | 28 | 28 | 100.0% | 100.0% | 0 | 0 | 0 |
| 05-functional-effects-hkt/neverthrow | 28 | 28 | 100.0% | 100.0% | 0 | 0 | 0 |
| **TOTAL** | **7375** | **6747** | **91.5%** | **91.5%** | **0** | **75** | **0** |

- **covered**: decompiled to ScriptType, recompiled, and type-identical to the original.
- **raw**: the decompiler hit a construct the language cannot express (0).
- **mismatch**: compiled but not type-identical (75); **compile-error**: 420.
- **unresolvable**: the harness could not typecheck the reference in isolation (cross-file imports, no node_modules in the clones) — 0. A harness limitation, not a language gap.

### Language gaps (raw() fallbacks), most frequent first

