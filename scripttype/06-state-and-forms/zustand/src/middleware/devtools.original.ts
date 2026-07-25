/**
 * ORIGINAL TypeScript from 06-state-and-forms/zustand/src/middleware/devtools.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StoreApi<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Cast<T, U> = T extends U ? T : U

export type Write<T, U> = Omit<T, keyof U> & U

export type TakeTwo<T> = T extends { length: 0 }
  ? [undefined, undefined]
  : T extends { length: 1 }
    ? [...args0: Cast<T, unknown[]>, arg1: undefined]
    : T extends { length: 0 | 1 }
      ? [...args0: Cast<T, unknown[]>, arg1: undefined]
      : T extends { length: 2 }
        ? T
        : T extends { length: 1 | 2 }
          ? T
          : T extends { length: 0 | 1 | 2 }
            ? T
            : T extends [infer A0, infer A1, ...unknown[]]
              ? [A0, A1]
              : T extends [infer A0, (infer A1)?, ...unknown[]]
                ? [A0, A1?]
                : T extends [(infer A0)?, (infer A1)?, ...unknown[]]
                  ? [A0?, A1?]
                  : never

export type Action =
  | string
  | {
      type: string
      [x: string | number | symbol]: unknown
    }

export type StoreDevtools<S> = S extends {
  setState: {
    // capture both overloads of setState
    (...args: infer Sa1): infer Sr1
    (...args: infer Sa2): infer Sr2
  }
}
  ? {
      setState(...args: [...args: TakeTwo<Sa1>, action?: Action]): Sr1
      setState(...args: [...args: TakeTwo<Sa2>, action?: Action]): Sr2
      devtools: {
        cleanup: () => void
      }
    }
  : never

export type WithDevtools<S> = Write<S, StoreDevtools<S>>

export type NamedSet<T> = WithDevtools<StoreApi<T>>['setState']
