/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/List/Repeat.ts, for comparison with the ScriptType alongside.
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
type Next<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pos<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Prepend<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type __Repeat<N extends number, A, L extends List = [], I extends Iteration = IterationOf<0>> = {
    0: __Repeat<N, A, Prepend<L, A>, Next<I>>
    1: L
}[Extends<Pos<I>, N>]

export type _Repeat<A extends any, N extends number, L extends List = []> =
    __Repeat<N, A, L> extends infer X
    ? Cast<X, List>
    : never

export type Repeat<A extends any, N extends number, L extends List = []> =
    N extends unknown
    ? L extends unknown
      ? _Repeat<A, N, L>
      : never
    : never
