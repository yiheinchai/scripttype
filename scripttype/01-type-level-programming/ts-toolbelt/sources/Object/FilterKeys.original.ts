/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/FilterKeys.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Is<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Match<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _FilterKeys<O extends object, M extends any, match extends Match> = {
    [K in keyof O]-?: {
        1: never
        0: K
    }[Is<O[K], M, match>]
}[keyof O]

export type FilterKeys<O extends object, M extends any, match extends Match = 'default'> =
    O extends unknown
    ? _FilterKeys<O, M, match>
    : never
