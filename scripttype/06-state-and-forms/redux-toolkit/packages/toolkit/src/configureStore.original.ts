/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/configureStore.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Action<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExtractStateExtensions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExtractStoreExtensions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Middleware<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Store<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StoreEnhancer<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownAction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownIfNonSpecific<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Middlewares<S> = ReadonlyArray<Middleware<{}, S>>

export type Enhancers = ReadonlyArray<StoreEnhancer>

export type EnhancedStore<
  S = any,
  A extends Action = UnknownAction,
  E extends Enhancers = Enhancers,
> = ExtractStoreExtensions<E> &
  Store<S, A, UnknownIfNonSpecific<ExtractStateExtensions<E>>>
