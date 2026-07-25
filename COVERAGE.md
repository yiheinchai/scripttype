## Round-trip coverage

| repo | aliases | covered | % of all | % judgeable | raw | mismatch | unjudged |
|---|--:|--:|--:|--:|--:|--:|--:|
| 03-schema-and-type-level-parsers/typebox | 910 | 726 | 79.8% | 79.8% | 2 | 0 | 0 |
| 03-schema-and-type-level-parsers/arktype | 759 | 516 | 68.0% | 68.0% | 14 | 42 | 0 |
| 05-functional-effects-hkt/effect | 693 | 274 | 39.5% | 39.5% | 9 | 81 | 0 |
| 01-type-level-programming/type-fest | 624 | 560 | 89.7% | 89.7% | 2 | 8 | 0 |
| 04-query-builders-orm/drizzle-orm | 578 | 513 | 88.8% | 88.8% | 0 | 3 | 0 |
| 02-inference-at-scale/tanstack-router | 512 | 463 | 90.4% | 90.4% | 1 | 30 | 0 |
| 01-type-level-programming/ts-toolbelt | 386 | 310 | 80.3% | 80.3% | 1 | 6 | 0 |
| 06-state-and-forms/redux-toolkit | 357 | 277 | 77.6% | 77.6% | 38 | 23 | 0 |
| 01-type-level-programming/hotscript | 314 | 154 | 49.0% | 49.0% | 0 | 33 | 0 |
| 02-inference-at-scale/trpc | 295 | 256 | 86.8% | 86.8% | 7 | 13 | 0 |
| 02-inference-at-scale/tanstack-query | 258 | 238 | 92.2% | 92.2% | 0 | 10 | 0 |
| 06-state-and-forms/xstate | 245 | 202 | 82.4% | 82.4% | 7 | 12 | 0 |
| 03-schema-and-type-level-parsers/zod | 197 | 127 | 64.5% | 64.5% | 2 | 16 | 0 |
| 01-type-level-programming/type-challenges | 196 | 196 | 100.0% | 100.0% | 0 | 0 | 0 |
| 04-query-builders-orm/kysely | 196 | 195 | 99.5% | 99.5% | 0 | 0 | 0 |
| 03-schema-and-type-level-parsers/valibot | 154 | 136 | 88.3% | 88.3% | 2 | 2 | 0 |
| 06-state-and-forms/react-hook-form | 148 | 120 | 81.1% | 81.1% | 2 | 23 | 0 |
| 02-inference-at-scale/hono | 133 | 113 | 85.0% | 85.0% | 2 | 6 | 0 |
| 01-type-level-programming/ts-pattern | 130 | 112 | 86.2% | 86.2% | 8 | 0 | 0 |
| 02-inference-at-scale/elysia | 122 | 93 | 76.2% | 76.2% | 2 | 0 | 0 |
| 03-schema-and-type-level-parsers/abitype | 110 | 95 | 86.4% | 86.4% | 0 | 1 | 0 |
| 01-type-level-programming/expect-type | 79 | 72 | 91.1% | 91.1% | 0 | 5 | 0 |
| 06-state-and-forms/zustand | 34 | 26 | 76.5% | 76.5% | 8 | 0 | 0 |
| 07-compiler-internals/typescript | 31 | 26 | 83.9% | 83.9% | 0 | 3 | 0 |
| 05-functional-effects-hkt/fp-ts | 29 | 24 | 82.8% | 82.8% | 1 | 0 | 0 |
| 05-functional-effects-hkt/neverthrow | 28 | 28 | 100.0% | 100.0% | 0 | 0 | 0 |
| shard{} | — | — | — | — | — | — | not measured: no output |
| **TOTAL** | **7518** | **5852** | **77.8%** | **77.8%** | **108** | **317** | **0** |

- **covered**: decompiled to ScriptType, recompiled, and type-identical to the original.
- **raw**: the decompiler hit a construct the language cannot express (108).
- **mismatch**: compiled but not type-identical (317); **compile-error**: 692.
- **unresolvable**: the harness could not typecheck the reference in isolation (cross-file imports, no node_modules in the clones) — 0. A harness limitation, not a language gap.

### Language gaps (raw() fallbacks), most frequent first

- 52 — object member CallSignature
- 50 — object member MethodSignature
- 18 — type node FirstTypeNode
- 10 — literal type FirstTemplateToken
- 4 — object member ConstructSignature
- 3 — index signature combined with other members
