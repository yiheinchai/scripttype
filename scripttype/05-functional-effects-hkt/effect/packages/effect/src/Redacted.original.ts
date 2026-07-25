/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Redacted.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export interface Redacted<out A = string> extends Redacted.Variance<A>, Equal.Equal, Pipeable {
  readonly label: string | undefined
}

export type Value<T extends Redacted<any>> = [T] extends [Redacted<infer _A>] ? _A : never
