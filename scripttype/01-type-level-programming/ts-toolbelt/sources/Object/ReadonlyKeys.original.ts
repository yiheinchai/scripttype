/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/ReadonlyKeys.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Equals<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _ReadonlyKeys<O extends object> = {
    [K in keyof O]-?: {
        1: never
        0: K
    }[Equals<{-readonly [Q in K]: O[K]}, {[Q in K]: O[K]}>]
    // for each key, pick only K and compare to see if it is
}[keyof O]

export type ReadonlyKeys<O extends object> =
    O extends unknown
    ? _ReadonlyKeys<O>
    : never
