/**
 * ORIGINAL TypeScript from 06-state-and-forms/zustand/src/middleware/immer.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Draft<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Omit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Partial<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type Write<T, U> = Omit<T, keyof U> & U

export type SkipTwo<T> = T extends { length: 0 }
  ? []
  : T extends { length: 1 }
    ? []
    : T extends { length: 0 | 1 }
      ? []
      : T extends [unknown, unknown, ...infer A]
        ? A
        : T extends [unknown, unknown?, ...infer A]
          ? A
          : T extends [unknown?, unknown?, ...infer A]
            ? A
            : never

export type SetStateType<T extends unknown[]> = Exclude<T[0], (...args: any[]) => any>

export type StoreImmer<S> = S extends {
  setState: infer SetState
}
  ? SetState extends {
      (...args: infer A1): infer Sr1
      (...args: infer A2): infer Sr2
    }
    ? {
        // Ideally, we would want to infer the `nextStateOrUpdater` `T` type from the
        // `A1` type, but this is infeasible since it is an intersection with
        // a partial type.
        setState(
          nextStateOrUpdater:
            | SetStateType<A2>
            | Partial<SetStateType<A2>>
            | ((state: Draft<SetStateType<A2>>) => void),
          shouldReplace?: false,
          ...args: SkipTwo<A1>
        ): Sr1
        setState(
          nextStateOrUpdater:
            | SetStateType<A2>
            | ((state: Draft<SetStateType<A2>>) => void),
          shouldReplace: true,
          ...args: SkipTwo<A2>
        ): Sr2
      }
    : never
  : never

export type WithImmer<S> = Write<S, StoreImmer<S>>
