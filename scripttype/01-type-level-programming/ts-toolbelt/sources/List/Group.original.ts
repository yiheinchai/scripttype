/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/List/Group.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Append<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Cast<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extends<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _Drop<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _Take<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type __Group<L extends List, N extends number, LN extends List = []> = {
    0: __Group<_Drop<L, N>, N, Append<LN, _Take<L, N>>>
    1: LN
}[Extends<L, List<never>>]

export type _Group<L extends List, N extends number> =
    __Group<L, N> extends infer X
    ? Cast<X, List>
    : never

export type Group<L extends List, N extends number> =
    L extends unknown
    ? N extends unknown
      ? _Group<L, N>
      : never
    : never
