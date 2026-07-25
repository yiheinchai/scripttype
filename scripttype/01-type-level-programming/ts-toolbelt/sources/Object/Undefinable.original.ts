/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/Undefinable.ts, for comparison with the ScriptType alongside.
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
type _Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type UndefinableFlat<O> = {
    [K in keyof O]: O[K] | undefined
} & {}

export type UndefinableDeep<O> = {
    [K in keyof O]: O[K] extends BuiltIn
                    ? O[K]
                    : UndefinableDeep<O[K] | undefined>
}

export type UndefinablePart<O extends object, depth extends Depth> = {
    'flat': UndefinableFlat<O>,
    'deep': UndefinableDeep<O>,
}[depth]

export type _Undefinable<O extends object, K extends Key, depth extends Depth> =
    PatchFlat<UndefinablePart<_Pick<O, K>, depth>, O>

export type Undefinable<O extends object, K extends Key = Key, depth extends Depth = 'flat'> =
    O extends unknown
    ? _Undefinable<O, K, depth>
    : never
