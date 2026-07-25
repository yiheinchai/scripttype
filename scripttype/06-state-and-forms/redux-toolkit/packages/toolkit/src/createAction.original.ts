/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/createAction.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type IfMaybeUndefined<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IfVoid<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsUnknownOrNonInferrable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Parameters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PayloadAction<
  P = void,
  T extends string = string,
  M = never,
  E = never,
> = {
  payload: P
  type: T
} & ([M] extends [never]
  ? {}
  : {
      meta: M
    }) &
  ([E] extends [never]
    ? {}
    : {
        error: E
      })

export type PrepareAction<P> =
  | ((...args: any[]) => { payload: P })
  | ((...args: any[]) => { payload: P; meta: any })
  | ((...args: any[]) => { payload: P; error: any })
  | ((...args: any[]) => { payload: P; meta: any; error: any })

export interface ActionCreatorWithPreparedPayload<
  Args extends unknown[],
  P,
  T extends string = string,
  E = never,
  M = never,
> extends BaseActionCreator<P, T, M, E> {
  /**
   * Calling this {@link redux#ActionCreator} with `Args` will return
   * an Action with a payload of type `P` and (depending on the `PrepareAction`
   * method used) a `meta`- and `error` property of types `M` and `E` respectively.
   */
  (...args: Args): PayloadAction<P, T, M, E>
}

export type _ActionCreatorWithPreparedPayload<
  PA extends PrepareAction<any> | void,
  T extends string = string,
> =
  PA extends PrepareAction<infer P>
    ? ActionCreatorWithPreparedPayload<
        Parameters<PA>,
        P,
        T,
        ReturnType<PA> extends {
          error: infer E
        }
          ? E
          : never,
        ReturnType<PA> extends {
          meta: infer M
        }
          ? M
          : never
      >
    : void

export type BaseActionCreator<P, T extends string, M = never, E = never> = {
  type: T
  match: (action: unknown) => action is PayloadAction<P, T, M, E>
}

export type IfPrepareActionMethodProvided<
  PA extends PrepareAction<any> | void,
  True,
  False,
> = PA extends (...args: any[]) => any ? True : False

export interface ActionCreatorWithPayload<P, T extends string = string>
  extends BaseActionCreator<P, T> {
  /**
   * Calling this {@link redux#ActionCreator} with an argument will
   * return a {@link PayloadAction} of type `T` with a payload of `P`
   */
  (payload: P): PayloadAction<P, T>
}

export interface ActionCreatorWithNonInferrablePayload<
  T extends string = string,
> extends BaseActionCreator<unknown, T> {
  /**
   * Calling this {@link redux#ActionCreator} with an argument will
   * return a {@link PayloadAction} of type `T` with a payload
   * of exactly the type of the argument.
   */
  <PT extends unknown>(payload: PT): PayloadAction<PT, T>
}

export interface ActionCreatorWithoutPayload<T extends string = string>
  extends BaseActionCreator<undefined, T> {
  /**
   * Calling this {@link redux#ActionCreator} will
   * return a {@link PayloadAction} of type `T` with a payload of `undefined`
   */
  (noArgument: void): PayloadAction<undefined, T>
}

export interface ActionCreatorWithOptionalPayload<P, T extends string = string>
  extends BaseActionCreator<P, T> {
  /**
   * Calling this {@link redux#ActionCreator} with an argument will
   * return a {@link PayloadAction} of type `T` with a payload of `P`.
   * Calling it without an argument will return a PayloadAction with a payload of `undefined`.
   */
  (payload?: P): PayloadAction<P, T>
}

export type PayloadActionCreator<
  P = void,
  T extends string = string,
  PA extends PrepareAction<P> | void = void,
> = IfPrepareActionMethodProvided<
  PA,
  _ActionCreatorWithPreparedPayload<PA, T>,
  // else
  IsAny<
    P,
    ActionCreatorWithPayload<any, T>,
    IsUnknownOrNonInferrable<
      P,
      ActionCreatorWithNonInferrablePayload<T>,
      // else
      IfVoid<
        P,
        ActionCreatorWithoutPayload<T>,
        // else
        IfMaybeUndefined<
          P,
          ActionCreatorWithOptionalPayload<P, T>,
          // else
          ActionCreatorWithPayload<P, T>
        >
      >
    >
  >
>
