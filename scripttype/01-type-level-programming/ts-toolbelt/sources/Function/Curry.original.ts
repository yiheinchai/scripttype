/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Function/Curry.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Cast<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Concat<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extends<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Iteration<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IterationOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Length<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Next<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonNullableFlat<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Parameters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pos<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RequiredKeys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Return<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Tail<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type x<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _SplitParams<P extends List, PSplit extends List[] = [], PRest extends List = Tail<P>> = {
    0: P extends [...infer A, ...PRest]
       ? _SplitParams<Tail<P>, [...PSplit, A], Tail<PRest>>
       : never
    1: PSplit
    2: P[number][][]
}[
    number extends Length<P>
    ? 2
    : P extends []
      ? 1
      : 0
]

export type SplitParams<P extends List> =
    _SplitParams<P> extends infer X
    ? Cast<X, List[]>
    : never

export type _JoinParams<PSplit extends List[], L extends List = []> = {
    0: _JoinParams<Tail<PSplit>, [...L, ...PSplit[0]]>
    1: L
    2: PSplit[number][]
}[
    number extends Length<PSplit>
    ? 2
    : PSplit extends []
      ? 1
      : 0
]

export type JoinParams<P extends List[]> =
    _JoinParams<P> extends infer X
    ? Cast<X, List>
    : never

export type GapOf<L1 extends List, L2 extends List[], LN extends List, I extends Iteration> =
    L1[Pos<I>] extends x
    ? Concat<LN, L2[Pos<I>]>
    : LN

export type _GapsOf<L1 extends List, L2 extends List[], LN extends List = [], L2D extends List[] = L2, I extends Iteration = IterationOf<0>> = {
    0: _GapsOf<L1, L2, GapOf<L1, L2, LN, I>, Tail<L2D>, Next<I>>
    1: Concat<LN, JoinParams<L2D>>
}[Extends<Pos<I>, Length<L1>>]

export type GapsOf<L1 extends List, L2 extends List> =
    _GapsOf<L1, SplitParams<L2>> extends infer X
    ? Cast<X, List>
    : never

export type Gaps<L extends List> = Cast<NonNullableFlat<{
    [K in keyof L]?: L[K] | x
}>, List>

export type Curry<F extends Function> =
    <
        P extends Gaps<Parameters<F>>,
        G extends List = GapsOf<P, Parameters<F>>,
        R extends any = Return<F>
    >(...p: Gaps<Parameters<F>> | P) =>
        // handles optional parameters
        RequiredKeys<G> extends never
        ? R
        : Curry<(...p: G) => R>
