/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Union/Replace.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Is<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Match<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Replace<U extends any, M extends any, A extends any, match extends Match = 'default'> =
    U extends unknown
    ? {1: A, 0: U}[Is<U, M, match>]
    : never
