/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/dynamicMiddleware/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseActionCreator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Dispatch<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExtractDispatchExtensions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FallbackIfUnknown<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GetState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Middleware<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MiddlewareAPI<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PayloadAction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownAction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type GetDispatchType<MiddlewareApiConfig> = MiddlewareApiConfig extends {
  dispatch: infer DispatchType
}
  ? FallbackIfUnknown<DispatchType, Dispatch>
  : Dispatch

export type GetMiddlewareApi<MiddlewareApiConfig> = MiddlewareAPI<
  GetDispatchType<MiddlewareApiConfig>,
  GetState<MiddlewareApiConfig>
>

export type MiddlewareApiConfig = {
  state?: unknown
  dispatch?: Dispatch
}

export type AddMiddleware<
  State = any,
  DispatchType extends Dispatch<UnknownAction> = Dispatch<UnknownAction>,
> = {
  (...middlewares: Middleware<any, State, DispatchType>[]): void
  withTypes<MiddlewareConfig extends MiddlewareApiConfig>(): AddMiddleware<
    GetState<MiddlewareConfig>,
    GetDispatchType<MiddlewareConfig>
  >
}

export type WithMiddleware<
  State = any,
  DispatchType extends Dispatch<UnknownAction> = Dispatch<UnknownAction>,
> = BaseActionCreator<
  Middleware<any, State, DispatchType>[],
  'dynamicMiddleware/add',
  { instanceId: string }
> & {
  <Middlewares extends Middleware<any, State, DispatchType>[]>(
    ...middlewares: Middlewares
  ): PayloadAction<Middlewares, 'dynamicMiddleware/add', { instanceId: string }>
  withTypes<MiddlewareConfig extends MiddlewareApiConfig>(): WithMiddleware<
    GetState<MiddlewareConfig>,
    GetDispatchType<MiddlewareConfig>
  >
}

export type MiddlewareEntry<
  State = unknown,
  DispatchType extends Dispatch<UnknownAction> = Dispatch<UnknownAction>,
> = {
  middleware: Middleware<any, State, DispatchType>
  applied: Map<
    MiddlewareAPI<DispatchType, State>,
    ReturnType<Middleware<any, State, DispatchType>>
  >
}

export interface DynamicDispatch {
  // return a version of dispatch that knows about middleware
  <Middlewares extends Middleware<any>[]>(
    action: PayloadAction<Middlewares, 'dynamicMiddleware/add'>,
  ): ExtractDispatchExtensions<Middlewares> & this
}

export type DynamicMiddleware<
  State = unknown,
  DispatchType extends Dispatch<UnknownAction> = Dispatch<UnknownAction>,
> = Middleware<DynamicDispatch, State, DispatchType>

export type DynamicMiddlewareInstance<
  State = unknown,
  DispatchType extends Dispatch<UnknownAction> = Dispatch<UnknownAction>,
> = {
  middleware: DynamicMiddleware<State, DispatchType>
  addMiddleware: AddMiddleware<State, DispatchType>
  withMiddleware: WithMiddleware<State, DispatchType>
  instanceId: string
}
