/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/List/Omit.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _ListOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _OOmit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _Omit<L extends List, K extends Key> =
    _ListOf<_OOmit<ObjectOf<L>, `${K & number}` | K>>

export type Omit<L extends List, K extends Key> =
    L extends unknown
    ? _Omit<L, K>
    : never
