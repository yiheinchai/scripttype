/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/getDefaultMiddleware.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ActionCreatorInvariantMiddlewareOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExcludeFromTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ImmutableStateInvariantMiddlewareOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SerializableStateInvariantMiddlewareOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ThunkMiddleware<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Tuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownAction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface ThunkOptions<E = any> {
  extraArgument: E
}

export interface GetDefaultMiddlewareOptions {
  thunk?: boolean | ThunkOptions
  immutableCheck?: boolean | ImmutableStateInvariantMiddlewareOptions
  serializableCheck?: boolean | SerializableStateInvariantMiddlewareOptions
  actionCreatorCheck?: boolean | ActionCreatorInvariantMiddlewareOptions
}

export type ThunkMiddlewareFor<
  S,
  O extends GetDefaultMiddlewareOptions = {},
> = O extends {
  thunk: false
}
  ? never
  : O extends { thunk: { extraArgument: infer E } }
    ? ThunkMiddleware<S, UnknownAction, E>
    : ThunkMiddleware<S, UnknownAction>

export type GetDefaultMiddleware<S = any> = <
  O extends GetDefaultMiddlewareOptions = {
    thunk: true
    immutableCheck: true
    serializableCheck: true
    actionCreatorCheck: true
  },
>(
  options?: O,
) => Tuple<ExcludeFromTuple<[ThunkMiddlewareFor<S, O>], never>>
