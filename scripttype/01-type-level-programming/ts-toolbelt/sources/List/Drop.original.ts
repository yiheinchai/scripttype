/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/List/Drop.ts, for comparison with the ScriptType alongside.
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
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Naked<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pos<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Prepend<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Prev<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Tail<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Way<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type DropForth<L extends List, N extends Iteration> = {
    0: DropForth<Tail<L>, Prev<N>>
    1: L
}[Extends<0, Pos<N>>]

export type DropBack<L extends List, N extends Iteration, I extends Iteration = Prev<N>, LN extends List = []> = {
    0: DropBack<L, N, Prev<I>, Prepend<LN, L[Pos<I>]>>
    1: LN
}[Extends<-1, Pos<I>>]

export type __Drop<L extends List, N extends Iteration, way extends Way> = {
    '->': DropForth<L, N>
    '<-': DropBack<L, N>
}[way]

export type _Drop<L extends List, N extends number, way extends Way = '->'> =
    __Drop<Naked<L>, IterationOf<N>, way> extends infer X
    ? Cast<X, List>
    : never

export type Drop<L extends List, N extends number, way extends Way = '->'> =
    L extends unknown
    ? N extends unknown
      ? _Drop<L, N, way>
      : never
    : never
