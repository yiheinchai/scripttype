/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Union/Merge.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type At<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ComputeRaw<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IntersectOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Overwrite<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Strict<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>
}>>

export type Merge<U extends object> =
    ComputeRaw<_Merge<Strict<U>>>
