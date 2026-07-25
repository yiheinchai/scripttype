/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/dynamicMiddleware/react/index.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Context<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Dispatch<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DynamicMiddlewareInstance<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GetDispatch<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GetState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Middleware<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MiddlewareApiConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReactReduxContextValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSHelpersExtractDispatchExtensions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownAction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
