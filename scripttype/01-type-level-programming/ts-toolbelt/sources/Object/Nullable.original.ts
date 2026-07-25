/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/Nullable.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Depth<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PatchFlat<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type NullableFlat<O> = {
    [K in keyof O]: UNullable<O[K]>
} & {}

export type NullableDeep<O> = {
    [K in keyof O]: NullableDeep<UNullable<O[K]>>
}

export type NullablePart<O extends object, depth extends Depth> = {
    'flat': NullableFlat<O>,
    'deep': NullableDeep<O>,
}[depth]

export type _Nullable<O extends object, K extends Key, depth extends Depth> =
    PatchFlat<NullablePart<_Pick<O, K>, depth>, O>

export type Nullable<O extends object, K extends Key = Key, depth extends Depth = 'flat'> =
    O extends unknown
    ? _Nullable<O, K, depth>
    : never
