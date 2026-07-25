/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Stream.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Arr<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Channel<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Unify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface StreamUnify<A extends { [Unify.typeSymbol]?: any }> extends Effect.EffectUnify<A> {
  Stream?: () => A[Unify.typeSymbol] extends Stream<infer A0, infer E0, infer R0> | infer _ ? Stream<A0, E0, R0> : never
}

export interface StreamUnifyIgnore {
  Effect?: true
}

export interface Stream<out A, out E = never, out R = never> extends Variance<A, E, R>, Pipeable {
  readonly channel: Channel.Channel<Arr.NonEmptyReadonlyArray<A>, E, void, unknown, unknown, unknown, R>
  [Unify.typeSymbol]?: unknown
  [Unify.unifySymbol]?: StreamUnify<this>
  [Unify.ignoreSymbol]?: StreamUnifyIgnore
}

export type Success<T extends Stream<any, any, any>> = [T] extends [Stream<infer _A, infer _E, infer _R>] ? _A : never

export type Error<T extends Stream<any, any, any>> = [T] extends [Stream<infer _A, infer _E, infer _R>] ? _E : never

export type Services<T extends Stream<any, any, any>> = [T] extends [Stream<infer _A, infer _E, infer _R>] ? _R
  : never
