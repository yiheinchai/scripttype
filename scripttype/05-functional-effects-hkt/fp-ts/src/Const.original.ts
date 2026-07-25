/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/fp-ts/src/Const.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type Const<E, A> = E & { readonly _A: A }
