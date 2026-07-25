/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Newtype.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export interface Newtype<in out Key extends string, out Carrier> {
  readonly [TypeId]: {
    readonly key: Key
    readonly carrier: Carrier
  }
}

export type Any = Newtype<any, unknown>

export type Key<N extends Any> = N extends Newtype<infer Key, unknown> ? Key : never

export type Carrier<N extends Any> = N extends Newtype<infer _Key, infer Carrier> ? Carrier : never
