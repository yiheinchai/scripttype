/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/List/Zip.ts, for comparison with the ScriptType alongside.
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
type Iteration<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IterationOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Length<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Naked<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Next<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pos<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type __Zip<L extends List, L1 extends List, LN extends List = [], I extends Iteration = IterationOf<0>> = {
    0: __Zip<L, L1, Append<LN, [L[Pos<I>], L1[Pos<I>]]>, Next<I>>
    1: LN
}[Extends<Pos<I>, Length<L>>]

export type _Zip<L extends List, L1 extends List> =
    __Zip<Naked<L>, L1> extends infer X
    ? Cast<X, List>
    : never

export type Zip<L extends List, L1 extends List> =
    L extends unknown
    ? L1 extends unknown
      ? _Zip<L, L1>
      : never
    : never
