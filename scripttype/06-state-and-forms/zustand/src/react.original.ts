/**
 * ORIGINAL TypeScript from 06-state-and-forms/zustand/src/react.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ExtractState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StoreApi<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ReadonlyStoreApi<T> = Pick<
  StoreApi<T>,
  'getState' | 'getInitialState' | 'subscribe'
>

export type UseBoundStore<S extends ReadonlyStoreApi<unknown>> = {
  (): ExtractState<S>
  <U>(selector: (state: ExtractState<S>) => U): U
} & S
