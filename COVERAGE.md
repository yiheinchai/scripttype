## Round-trip coverage

> **Partial run.** 0 of 7518 generic type aliases were measured; shards that exceeded their wall-clock cap contributed only their completed batches. Percentages below are of what was measured.

| repo | aliases | covered | % of all | % judgeable | raw | mismatch | unjudged |
|---|--:|--:|--:|--:|--:|--:|--:|
| **TOTAL** | **0** | **0** | **—** | **—** | **0** | **0** | **0** |

- **covered**: decompiled to ScriptType, recompiled, and type-identical to the original.
- **raw**: the decompiler hit a construct the language cannot express (0).
- **mismatch**: compiled but not type-identical (0); **compile-error**: 0.
- **unresolvable**: the harness could not typecheck the reference in isolation (cross-file imports, no node_modules in the clones) — 0. A harness limitation, not a language gap.

### Language gaps (raw() fallbacks), most frequent first

