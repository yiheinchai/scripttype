/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/tools/jsdocs/src/Jsdocs.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type Result<A, E> =
  | { readonly _tag: "Success"; readonly value: A }
  | { readonly _tag: "Failure"; readonly error: E }

export type JSDocResult<A, E> = Result<A, E>
