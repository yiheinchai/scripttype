/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/typetest/unstable/ai/LanguageModel.tst.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type IsExact<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false
