/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/Paths.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BuiltIn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Cast<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Keys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Length<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonNullableFlat<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Primitive<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type UnionOf<A> =
    A extends List
    ? A[number]
    : A[keyof A]

export type _Paths<O, P extends List = []> = UnionOf<{
    [K in keyof O]:
    O[K] extends BuiltIn | Primitive ? NonNullableFlat<[...P, K?]> :
    [Keys<O[K]>] extends [never] ? NonNullableFlat<[...P, K?]> :
    12 extends Length<P> ? NonNullableFlat<[...P, K?]> :
    _Paths<O[K], [...P, K?]>
}>

export type Paths<O, P extends List = []> =
    _Paths<O, P> extends infer X
    ? Cast<X, List<Key>>
    : never
