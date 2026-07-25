/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Layer.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Channel<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Context<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Effect<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Extract<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MemoMapTypeId<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Scope<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Stream<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Types<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Unify<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface Any {
  readonly [TypeId]: {
    readonly _ROut: any
    readonly _E: any
    readonly _RIn: any
  }
}

export interface MemoMap {
  readonly [MemoMapTypeId]: typeof MemoMapTypeId
  readonly get: <RIn, E, ROut>(
    layer: Layer<ROut, E, RIn>,
    scope: Scope.Scope
  ) => Effect<Context.Context<ROut>, E, RIn> | undefined
  readonly getOrElseMemoize: <RIn, E, ROut>(
    layer: Layer<ROut, E, RIn>,
    scope: Scope.Scope,
    build: (memoMap: MemoMap, scope: Scope.Scope) => Effect<Context.Context<ROut>, E, RIn>
  ) => Effect<Context.Context<ROut>, E, RIn>
}

export type Success<T extends Any> = T extends Layer<infer _ROut, infer _E, infer _RIn> ? _ROut : never

export type Error<T extends Any> = T extends Layer<infer _ROut, infer _E, infer _RIn> ? _E : never

export interface LayerUnify<A extends { [Unify.typeSymbol]?: any }> {
  Layer?: () => A[Unify.typeSymbol] extends Layer<any, any, any> | infer _ ? Layer<
      Success<Extract<A[Unify.typeSymbol], Any>>,
      Error<Extract<A[Unify.typeSymbol], Any>>,
      Services<Extract<A[Unify.typeSymbol], Any>>
    >
    : never
}

export interface LayerUnifyIgnore {}

export interface Layer<in ROut, out E = never, out RIn = never> extends Variance<ROut, E, RIn>, Pipeable {
  /** @internal */
  build(memoMap: MemoMap, scope: Scope.Scope): Effect<Context.Context<ROut>, E, RIn>
  [Unify.typeSymbol]?: unknown
  [Unify.unifySymbol]?: LayerUnify<this>
  [Unify.ignoreSymbol]?: LayerUnifyIgnore
}

export type Services<T extends Any> = T extends infer L
  ? L extends Layer<infer _ROut, infer _E, infer _RIn> ? _RIn : never
  : never

export type AnyEffectOrStream =
  | Effect<any, any, any>
  | Stream.Stream<any, any, any>
  | Channel.Channel<any, any, any, any, any, any, any>
  | ((...args: any) => Effect<any, any, any>)
  | ((...args: any) => Stream.Stream<any, any, any>)
  | ((...args: any) => Channel.Channel<any, any, any, any, any, any, any>)

export type PartialEffectful<A extends object> = Types.Simplify<
  & {
    [K in keyof A as A[K] extends AnyEffectOrStream ? K : never]?: A[K]
  }
  & {
    [K in keyof A as A[K] extends AnyEffectOrStream ? never : K]: A[K]
  }
>
