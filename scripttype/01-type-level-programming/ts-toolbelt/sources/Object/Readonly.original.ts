/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/Readonly.ts, for comparison with the ScriptType alongside.
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
export type ReadonlyFlat<O> = {
    +readonly [K in keyof O]: O[K]
} & {}

export type ReadonlyDeep<O> = {
    +readonly [K in keyof O]: O[K] extends BuiltIn
                              ? O[K]
                              : ReadonlyDeep<O[K]>
}

export type ReadonlyPart<O extends object, depth extends Depth> = {
    'flat': ReadonlyFlat<O>,
    'deep': ReadonlyDeep<O>,
}[depth]

export type _Readonly<O extends object, K extends Key, depth extends Depth> =
    PatchFlat<ReadonlyPart<_Pick<O, K>, depth>, O>

export type Readonly<O extends object, K extends Key = Key, depth extends Depth = 'flat'> =
    O extends unknown
    ? _Readonly<O, K, depth>
    : never
