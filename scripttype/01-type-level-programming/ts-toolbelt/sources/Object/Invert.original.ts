/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/Invert.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ComputeRaw<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IntersectOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _Invert<O extends Record<Key, Key>> =
  ComputeRaw<IntersectOf<
    { // swaps the key and the value
      [K in keyof O]: Record<O[K], K>
    }[keyof O]
  >>

export type Invert<O extends Record<keyof O, Key>> =
    O extends unknown
    ? _Invert<O>
    : never
