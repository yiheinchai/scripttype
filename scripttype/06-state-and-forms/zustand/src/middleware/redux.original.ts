/**
 * ORIGINAL TypeScript from 06-state-and-forms/zustand/src/middleware/redux.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Write<T, U> = Omit<T, keyof U> & U

export type StoreRedux<A> = {
  dispatch: (a: A) => A
  dispatchFromDevtools: true
}

export type ReduxState<A> = {
  dispatch: StoreRedux<A>['dispatch']
}

export type WithRedux<S, A> = Write<S, StoreRedux<A>>
