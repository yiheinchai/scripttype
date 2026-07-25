/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/fp-ts/src/Option.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export interface None {
  readonly _tag: 'None'
}

export interface Some<A> {
  readonly _tag: 'Some'
  readonly value: A
}

export type Option<A> = None | Some<A>
