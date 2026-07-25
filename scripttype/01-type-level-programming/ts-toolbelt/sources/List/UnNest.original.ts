/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/List/UnNest.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type And<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Append<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Cast<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Concat<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extends<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Iteration<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IterationOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Length<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Naked<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Next<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Not<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pos<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnionOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type UnNestLoose<L extends List> =
    (UnionOf<L> extends infer UL    // make `L` a union
    ? UL extends unknown            // for each in union
      ? UL extends List             // if its an array
        ? UnionOf<UL>               // make it a union
        : UL                        // or leave as it is
      : never
    : never
    )[] & {}

export type Flatter<L extends List, LN extends List, I extends Iteration> =
    L[Pos<I>] extends infer LP // handle if undefined
    ? LP extends List
      ? Concat<LN, L[Pos<I>]> // if it's a  list
      : Append<LN, L[Pos<I>]> // if it's an item
    : never

export type UnNestStrict<L extends List, LN extends List = [], I extends Iteration = IterationOf<0>> = {
    0: UnNestStrict<L, Flatter<L, LN, I>, Next<I>>
    1: LN
}[Extends<Pos<I>, Length<L>>]

export type __UnNest<L extends List, strict extends Boolean> = {
    0: UnNestLoose<L>
    1: UnNestStrict<L>
}[And<Not<Extends<number, Length<L>>>, strict>]

export type _UnNest<L extends List, strict extends Boolean> =
    __UnNest<Naked<L>, strict> extends infer X
    ? Cast<X, List>
    : never

export type UnNest<L extends List, strict extends Boolean = 1> =
    L extends unknown
    ? _UnNest<L, strict>
    : never
