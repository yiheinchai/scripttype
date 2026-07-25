/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/Compulsory.ts, for comparison with the ScriptType alongside.
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
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PatchFlat<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type CompulsoryFlat<O> = {
    [K in keyof O]-?: NonNullable<O[K]>
} & {}

export type CompulsoryDeep<O> = {
    [K in keyof O]-?: O[K] extends BuiltIn
                      ? O[K]
                      : CompulsoryDeep<NonNullable<O[K]>>
}

export type CompulsoryPart<O extends object, depth extends Depth> = {
    'flat': CompulsoryFlat<O>,
    'deep': CompulsoryDeep<O>,
}[depth]

export type _Compulsory<O extends object, K extends Key, depth extends Depth> =
    PatchFlat<CompulsoryPart<_Pick<O, K>, depth>, O>

export type Compulsory<O extends object, K extends Key = Key, depth extends Depth = 'flat'> =
    O extends unknown
    ? _Compulsory<O, K, depth>
    : never
