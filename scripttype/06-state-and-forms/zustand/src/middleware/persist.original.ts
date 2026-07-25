/**
 * ORIGINAL TypeScript from 06-state-and-forms/zustand/src/middleware/persist.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Omit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Partial<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type StorageValue<S> = {
  state: S
  version?: number
}

export type PersistListener<S> = (state: S) => void

export interface PersistStorage<S, R = unknown> {
  getItem: (
    name: string,
  ) => StorageValue<S> | null | Promise<StorageValue<S> | null>
  setItem: (name: string, value: StorageValue<S>) => R
  removeItem: (name: string) => R
}

export interface PersistOptions<
  S,
  PersistedState = S,
  PersistReturn = unknown,
> {
  /** Name of the storage (must be unique) */
  name: string
  /**
   * Use a custom persist storage.
   *
   * Combining `createJSONStorage` helps creating a persist storage
   * with JSON.parse and JSON.stringify.
   *
   * @default createJSONStorage(() => window.localStorage)
   */
  storage?: PersistStorage<PersistedState, PersistReturn> | undefined
  /**
   * Filter the persisted value.
   *
   * @params state The state's value
   */
  partialize?: (state: S) => PersistedState
  /**
   * A function returning another (optional) function.
   * The main function will be called before the state rehydration.
   * The returned function will be called after the state rehydration or when an error occurred.
   */
  onRehydrateStorage?: (
    state: S,
  ) => ((state?: S, error?: unknown) => void) | void
  /**
   * If the stored state's version mismatch the one specified here, the storage will not be used.
   * This is useful when adding a breaking change to your store.
   */
  version?: number
  /**
   * A function to perform persisted state migration.
   * This function will be called when persisted state versions mismatch with the one specified here.
   */
  migrate?: (
    persistedState: unknown,
    version: number,
  ) => PersistedState | Promise<PersistedState>
  /**
   * A function to perform custom hydration merges when combining the stored state with the current one.
   * By default, this function does a shallow merge.
   */
  merge?: (persistedState: unknown, currentState: S) => S

  /**
   * An optional boolean that will prevent the persist middleware from triggering hydration on initialization,
   * This allows you to call `rehydrate()` at a specific point in your apps rendering life-cycle.
   *
   * This is useful in SSR application.
   *
   * @default false
   */
  skipHydration?: boolean
}

export type StorePersist<S, Ps, Pr> = S extends {
  getState: () => infer T
  setState: {
    // capture both overloads of setState
    (...args: infer Sa1): infer Sr1
    (...args: infer Sa2): infer Sr2
  }
}
  ? {
      setState(...args: Sa1): Sr1 | Pr
      setState(...args: Sa2): Sr2 | Pr
      persist: {
        setOptions: (options: Partial<PersistOptions<T, Ps, Pr>>) => void
        clearStorage: () => void
        rehydrate: () => Promise<void> | void
        hasHydrated: () => boolean
        onHydrate: (fn: PersistListener<T>) => () => void
        onFinishHydration: (fn: PersistListener<T>) => () => void
        getOptions: () => Partial<PersistOptions<T, Ps, Pr>>
      }
    }
  : never

export type Thenable<Value> = {
  then<V>(
    onFulfilled: (value: Value) => V | Promise<V> | Thenable<V>,
  ): Thenable<V>
  catch<V>(
    onRejected: (reason: Error) => V | Promise<V> | Thenable<V>,
  ): Thenable<V>
}

export type Write<T, U> = Omit<T, keyof U> & U

export type WithPersist<S, A> = Write<S, StorePersist<S, A, unknown>>
