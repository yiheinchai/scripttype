/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/WritableKeys.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Equals<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _WritableKeys<O extends object> = {
    [K in keyof O]-?: {
        1: K
        0: never
    }[Equals<{-readonly [Q in K]: O[K]}, {[Q in K]: O[K]}>]
}[keyof O]

export type WritableKeys<O extends object> =
    O extends unknown
    ? _WritableKeys<O>
    : never
