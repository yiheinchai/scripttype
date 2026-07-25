/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/Required.ts, for comparison with the ScriptType alongside.
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
export type RequiredFlat<O> = {
    [K in keyof O]-?: O[K]
} & {}

export type RequiredDeep<O> = {
    [K in keyof O]-?: O[K] extends BuiltIn
                      ? O[K]
                      : RequiredDeep<O[K]>
}

export type RequiredPart<O extends object, depth extends Depth> = {
    'flat': RequiredFlat<O>,
    'deep': RequiredDeep<O>,
}[depth]

export type _Required<O extends object, K extends Key, depth extends Depth> =
    PatchFlat<RequiredPart<_Pick<O, K>, depth>, O>

export type Required<O extends object, K extends Key = Key, depth extends Depth = 'flat'> =
    O extends unknown
    ? _Required<O, K, depth>
    : never
