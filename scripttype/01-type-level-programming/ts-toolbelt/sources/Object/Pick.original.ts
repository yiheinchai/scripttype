/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/Pick.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type __Pick<O extends object, K extends keyof O> = {
    [P in K]: O[P]
} & {}

export type _Pick<O extends object, K extends Key> =
    __Pick<O, keyof O & K>

export type Pick<O extends object, K extends Key> =
    O extends unknown
    ? _Pick<O, K>
    : never
