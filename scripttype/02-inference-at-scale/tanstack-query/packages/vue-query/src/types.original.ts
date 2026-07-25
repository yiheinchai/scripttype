/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-query/packages/vue-query/src/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ComputedRef<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DefaultError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutationObserverOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OmitKeyof<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Ref<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnwrapRef<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type MaybeGetter<T> = T | (() => T)

export type MaybeRef<T> = Ref<T> | ComputedRef<T> | T

export type MaybeRefOrGetter<T> = MaybeRef<T> | (() => T)

export type MaybeRefDeep<T> = MaybeRef<
  T extends Function
    ? T
    : T extends object
      ? {
          [Property in keyof T]: MaybeRefDeep<T[Property]>
        }
      : T
>

export type Equal<TTargetA, TTargetB> =
  (<T>() => T extends TTargetA ? 1 : 2) extends <T>() => T extends TTargetB
    ? 1
    : 2
    ? true
    : false

export type NoUnknown<T> = Equal<unknown, T> extends true ? never : T

export type Primitive = string | number | boolean | bigint | symbol | undefined | null

export type UnwrapLeaf =
  | Primitive
  | Function
  | Date
  | Error
  | RegExp
  | Map<any, any>
  | WeakMap<any, any>
  | Set<any>
  | WeakSet<any>

export type DeepUnwrapRef<T> = T extends UnwrapLeaf
  ? T
  : T extends Ref<infer U>
    ? DeepUnwrapRef<U>
    : T extends {}
      ? {
          [Property in keyof T]: DeepUnwrapRef<T[Property]>
        }
      : UnwrapRef<T>

export type ShallowOption = {
  /**
   * Return data in a shallow ref object (it is `false` by default). It can be set to `true` to return data in a shallow ref object, which can improve performance if your data does not need to be deeply reactive.
   */
  shallow?: boolean
}

export type MutationOptions<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TOnMutateResult = unknown,
> = OmitKeyof<
  MutationObserverOptions<TData, TError, TVariables, TOnMutateResult>,
  '_defaulted'
> &
  ShallowOption
