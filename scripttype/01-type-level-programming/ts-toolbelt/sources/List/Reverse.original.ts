/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/List/Reverse.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Cast<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extends<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Iteration<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IterationOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Length<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Naked<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Next<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pos<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Prepend<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type __Reverse<L extends List, LO extends List, I extends Iteration = IterationOf<0>> = {
    0: __Reverse<L, Prepend<LO, L[Pos<I>]>, Next<I>>
    1: LO
}[Extends<Pos<I>, Length<L>>]

export type _Reverse<L extends List, LO extends List = []> =
    __Reverse<Naked<L>, LO> extends infer X
    ? Cast<X, List>
    : never

export type Reverse<L extends List> =
    L extends unknown
    ? _Reverse<L>
    : never
