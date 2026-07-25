/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/Replace.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Is<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Match<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _Replace<O extends object, M extends any, A extends any, match extends Match> = {
    [K in keyof O]: {
        1: A
        0: O[K]
    }[Is<M, O[K], match>]
} & {}

export type Replace<O extends object, M extends any, A extends any, match extends Match = 'default'> =
    O extends unknown
    ? _Replace<O, M, A, match>
    : never
