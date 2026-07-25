/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/AtLeast.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ComputeRaw<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extends<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Keys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OptionalFlat<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RequiredFlat<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type RequiredIfKeys<O extends object, K extends Key> =
    Extends<keyof O & K, K> extends 1
    ? RequiredFlat<O>
    : O

export type __AtLeast<O extends object, K extends Key> =
    K extends keyof O               // if we can operate on it
    ? _Pick<O, K> & OptionalFlat<O> // take entry & make rest optional
    : O

export type _AtLeast<O extends object, K extends Key> =
    ComputeRaw<__AtLeast<RequiredIfKeys<O, K>, K>>

export type AtLeast<O extends object, K extends Key = Keys<O>> =
    O extends unknown
    ? _AtLeast<O, K>
    : never
