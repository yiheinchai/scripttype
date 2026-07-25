/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/tsHelpers.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Middleware<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Omit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Partial<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Pick<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Required<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReturnType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StoreEnhancer<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Tuple<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type IsAny<T, True, False = never> =
  // test if we are going the left AND right path in the condition
  true | false extends (T extends never ? true : false) ? True : False

export type CastAny<T, CastTo> = IsAny<T, CastTo, T>

export type IsUnknown<T, True, False = never> = unknown extends T
  ? IsAny<T, False, True>
  : False

export type FallbackIfUnknown<T, Fallback> = IsUnknown<T, Fallback, T>

export type IfMaybeUndefined<P, True, False> = [undefined] extends [P]
  ? True
  : False

export type IfVoid<P, True, False> = [void] extends [P] ? True : False

export type IsEmptyObj<T, True, False = never> = T extends any
  ? keyof T extends never
    ? IsUnknown<T, False, IfMaybeUndefined<T, False, IfVoid<T, False, True>>>
    : False
  : never

export type AtLeastTS35<True, False> = [True, False][IsUnknown<
  ReturnType<<T>() => T>,
  0,
  1
>]

export type IsUnknownOrNonInferrable<T, True, False> = AtLeastTS35<
  IsUnknown<T, True, False>,
  IsEmptyObj<T, True, IsUnknown<T, True, False>>
>

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never

export type ExcludeFromTuple<T, E, Acc extends unknown[] = []> = T extends [
  infer Head,
  ...infer Tail,
]
  ? ExcludeFromTuple<Tail, E, [...Acc, ...([Head] extends [E] ? [] : [Head])]>
  : Acc

export type ExtractDispatchFromMiddlewareTuple<
  MiddlewareTuple extends readonly any[],
  Acc extends {},
> = MiddlewareTuple extends [infer Head, ...infer Tail]
  ? ExtractDispatchFromMiddlewareTuple<
      Tail,
      Acc & (Head extends Middleware<infer D> ? IsAny<D, {}, D> : {})
    >
  : Acc

export type ExtractDispatchExtensions<M> =
  M extends Tuple<infer MiddlewareTuple>
    ? ExtractDispatchFromMiddlewareTuple<MiddlewareTuple, {}>
    : M extends ReadonlyArray<Middleware>
      ? ExtractDispatchFromMiddlewareTuple<[...M], {}>
      : never

export type ExtractStoreExtensionsFromEnhancerTuple<
  EnhancerTuple extends readonly any[],
  Acc extends {},
> = EnhancerTuple extends [infer Head, ...infer Tail]
  ? ExtractStoreExtensionsFromEnhancerTuple<
      Tail,
      Acc & (Head extends StoreEnhancer<infer Ext> ? IsAny<Ext, {}, Ext> : {})
    >
  : Acc

export type ExtractStoreExtensions<E> =
  E extends Tuple<infer EnhancerTuple>
    ? ExtractStoreExtensionsFromEnhancerTuple<EnhancerTuple, {}>
    : E extends ReadonlyArray<StoreEnhancer>
      ? UnionToIntersection<
          E[number] extends StoreEnhancer<infer Ext>
            ? Ext extends {}
              ? IsAny<Ext, {}, Ext>
              : {}
            : {}
        >
      : never

export type ExtractStateExtensionsFromEnhancerTuple<
  EnhancerTuple extends readonly any[],
  Acc extends {},
> = EnhancerTuple extends [infer Head, ...infer Tail]
  ? ExtractStateExtensionsFromEnhancerTuple<
      Tail,
      Acc &
        (Head extends StoreEnhancer<any, infer StateExt>
          ? IsAny<StateExt, {}, StateExt>
          : {})
    >
  : Acc

export type ExtractStateExtensions<E> =
  E extends Tuple<infer EnhancerTuple>
    ? ExtractStateExtensionsFromEnhancerTuple<EnhancerTuple, {}>
    : E extends ReadonlyArray<StoreEnhancer>
      ? UnionToIntersection<
          E[number] extends StoreEnhancer<any, infer StateExt>
            ? StateExt extends {}
              ? IsAny<StateExt, {}, StateExt>
              : {}
            : {}
        >
      : never

export type NonUndefined<T> = T extends undefined ? never : T

export type WithRequiredProp<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>

export type WithOptionalProp<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>

export interface TypeGuard<T> {
  (value: any): value is T
}

export interface HasMatchFunction<T> {
  match: TypeGuard<T>
}

export type Matcher<T> = HasMatchFunction<T> | TypeGuard<T>

export type ActionFromMatcher<M extends Matcher<any>> =
  M extends Matcher<infer T> ? T : never

export type Id<T> = { [K in keyof T]: T[K] } & {}

export type Tail<T extends any[]> = T extends [any, ...infer Tail]
  ? Tail
  : never

export type UnknownIfNonSpecific<T> = {} extends T ? unknown : T

export type SafePromise<T> = Promise<T> & {
  __linterBrands: 'SafePromise'
}
