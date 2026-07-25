/**
 * ORIGINAL TypeScript from 06-state-and-forms/zustand/src/vanilla.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Partial<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type SetStateInternal<T> = {
  _(
    partial: T | Partial<T> | { _(state: T): T | Partial<T> }['_'],
    replace?: false,
  ): void
  _(state: T | { _(state: T): T }['_'], replace: true): void
}['_']

export type ExtractState<S> = S extends { getState: () => infer T } ? T : never

export type Get<T, K, F> = K extends keyof T ? T[K] : F

export interface StoreMutators<S, A> {}

export type StoreMutatorIdentifier = keyof StoreMutators<unknown, unknown>

export type Mutate<S, Ms> = number extends Ms['length' & keyof Ms]
  ? S
  : Ms extends []
    ? S
    : Ms extends [[infer Mi, infer Ma], ...infer Mrs]
      ? Mutate<StoreMutators<S, Ma>[Mi & StoreMutatorIdentifier], Mrs>
      : never

export interface StoreApi<T> {
  setState: SetStateInternal<T>
  getState: () => T
  getInitialState: () => T
  subscribe: (listener: (state: T, prevState: T) => void) => () => void
}

export type StateCreator<
  T,
  Mis extends [StoreMutatorIdentifier, unknown][] = [],
  Mos extends [StoreMutatorIdentifier, unknown][] = [],
  U = T,
> = ((
  setState: Get<Mutate<StoreApi<T>, Mis>, 'setState', never>,
  getState: Get<Mutate<StoreApi<T>, Mis>, 'getState', never>,
  store: Mutate<StoreApi<T>, Mis>,
) => U) & { $$storeMutators?: Mos }
