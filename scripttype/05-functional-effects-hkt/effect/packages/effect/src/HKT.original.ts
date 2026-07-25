/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/HKT.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Types<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface TypeLambda {
  readonly In: unknown
  readonly Out2: unknown
  readonly Out1: unknown
  readonly Target: unknown
}

export type Kind<F extends TypeLambda, In, Out2, Out1, Target> = F extends {
  readonly type: unknown
} ? (F & {
    readonly In: In
    readonly Out2: Out2
    readonly Out1: Out1
    readonly Target: Target
  })["type"]
  : {
    readonly F: F
    readonly In: Types.Contravariant<In>
    readonly Out2: Types.Covariant<Out2>
    readonly Out1: Types.Covariant<Out1>
    readonly Target: Types.Invariant<Target>
  }
