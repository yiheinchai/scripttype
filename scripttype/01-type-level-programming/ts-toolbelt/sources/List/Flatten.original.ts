/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/List/Flatten.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Cast<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Equals<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extends<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Iteration<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IterationOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Next<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Or<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _UnNest<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type __Flatten<L extends List, LO extends List, strict extends Boolean, limit extends Iteration, I extends Iteration = IterationOf<0>> = {
    0: __Flatten<_UnNest<L, strict>, L, strict, limit, Next<I>>
    1: L
}[Or<Equals<L, LO>, Extends<limit, I>>]

export type _Flatten<L extends List, strict extends Boolean, limit extends number = number> =
    __Flatten<L, [], strict, IterationOf<limit>> extends infer X
    ? Cast<X, List>
    : never

export type Flatten<L extends List, strict extends Boolean = 1, limit extends number = number> =
    L extends unknown
    ? _Flatten<L, strict, limit>
    : never
