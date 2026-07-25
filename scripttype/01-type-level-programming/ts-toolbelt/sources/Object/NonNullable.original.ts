/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/NonNullable.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BuiltIn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Depth<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PatchFlat<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UNonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type NonNullableFlat<O> = {
    [K in keyof O]: UNonNullable<O[K]>
} & {}

export type NonNullableDeep<O> = {
    [K in keyof O]: O[K] extends BuiltIn
                    ? O[K]
                    : NonNullableDeep<UNonNullable<O[K]>>
}

export type NonNullablePart<O extends object, depth extends Depth> = {
    'flat': NonNullableFlat<O>,
    'deep': NonNullableDeep<O>,
}[depth]

export type _NonNullable<O extends object, K extends Key, depth extends Depth> =
    PatchFlat<NonNullablePart<_Pick<O, K>, depth>, O>

export type NonNullable<O extends object, K extends Key = Key, depth extends Depth = 'flat'> =
    O extends unknown
    ? _NonNullable<O, K, depth>
    : never
