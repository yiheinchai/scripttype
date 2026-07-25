/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/dynamicMiddleware/react/index.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Context<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Dispatch<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type DynamicMiddlewareInstance<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type GetDispatch<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type GetState<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Middleware<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MiddlewareApiConfig<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReactReduxContextValue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TSHelpersExtractDispatchExtensions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnknownAction<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type UseDispatchWithMiddlewareHook<
  Middlewares extends Middleware<any, State, DispatchType>[] = [],
  State = any,
  DispatchType extends Dispatch<UnknownAction> = Dispatch<UnknownAction>,
> = () => TSHelpersExtractDispatchExtensions<Middlewares> & DispatchType

export type CreateDispatchWithMiddlewareHook<
  State = any,
  DispatchType extends Dispatch<UnknownAction> = Dispatch<UnknownAction>,
> = {
  <
    Middlewares extends [
      Middleware<any, State, DispatchType>,
      ...Middleware<any, State, DispatchType>[],
    ],
  >(
    ...middlewares: Middlewares
  ): UseDispatchWithMiddlewareHook<Middlewares, State, DispatchType>
  withTypes<
    MiddlewareConfig extends MiddlewareApiConfig,
  >(): CreateDispatchWithMiddlewareHook<
    GetState<MiddlewareConfig>,
    GetDispatch<MiddlewareConfig>
  >
}

export type ActionFromDispatch<DispatchType extends Dispatch<Action>> =
  DispatchType extends Dispatch<infer Action> ? Action : never

export type ReactDynamicMiddlewareInstance<
  State = any,
  DispatchType extends Dispatch<UnknownAction> = Dispatch<UnknownAction>,
> = DynamicMiddlewareInstance<State, DispatchType> & {
  createDispatchWithMiddlewareHookFactory: (
    context?: Context<ReactReduxContextValue<
      State,
      ActionFromDispatch<DispatchType>
    > | null>,
  ) => CreateDispatchWithMiddlewareHook<State, DispatchType>
  createDispatchWithMiddlewareHook: CreateDispatchWithMiddlewareHook<
    State,
    DispatchType
  >
}
