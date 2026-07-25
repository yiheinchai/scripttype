/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/List/NonNullable.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BuiltIn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Cast<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Depth<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UNonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type NonNullableFlat<O, K extends Key = Key> = {
    [P in keyof O]: P extends K
                    ? UNonNullable<O[P]>
                    : O[P]
} & {}

export type NonNullableDeep<O, K extends Key = Key> =
    _NonNullableDeep<NonNullableFlat<O, K>>

export type _NonNullableDeep<O> = {
    [K in keyof O]: O[K] extends BuiltIn
                    ? O[K]
                    : NonNullableDeep<O[K], Key>
}

export type NonNullablePart<O extends object, K extends Key, depth extends Depth> = {
    'flat': NonNullableFlat<O, K>
    'deep': NonNullableDeep<O, K>
}[depth]

export type NonNullable<L extends List, K extends Key = Key, depth extends Depth = 'flat'> =
    Cast<NonNullablePart<L, `${K & number}` | K, depth>, List>
