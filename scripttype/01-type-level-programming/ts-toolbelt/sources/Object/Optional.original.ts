/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/Optional.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Depth<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Equals<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PatchFlat<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K]
} & {}

export type OptionalDeep<O> = {
    [K in keyof O]?: OptionalDeep<O[K]>
}

export type OptionalPart<O extends object, depth extends Depth> = {
    'flat': OptionalFlat<O>,
    'deep': OptionalDeep<O>,
}[depth]

export type Optional<O extends object, K extends Key = Key, depth extends Depth = 'flat'> = {
    1: OptionalPart<O, depth>
    0: PatchFlat<OptionalPart<Pick<O, K>, depth>, O>
}[Equals<Key, K>]
