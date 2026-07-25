/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Number/Sub.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Cast<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Iteration<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IterationOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Next<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pos<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Prev<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _IsNegative<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _SubPositive<N1 extends Iteration, N2 extends Iteration> = {
    0: _SubPositive<Prev<N1>, Prev<N2>> // N1 = -/+, N2 = +
    1: N1
    2: number
}[
    Pos<N2> extends 0        // If successful
    ? 1
    : number extends Pos<N2> // If un-success
      ? 2
      : 0                    // Or continue
]

export type SubPositive<N1 extends Iteration, N2 extends Iteration> =
    _SubPositive<N1, N2> extends infer X
    ? Cast<X, Iteration>
    : never

export type _SubNegative<N1 extends Iteration, N2 extends Iteration> = {
    0: _SubNegative<Next<N1>, Next<N2>> // N1 = -/+, N2 = -
    1: N1
    2: number
}[
    Pos<N2> extends 0        // If successful
    ? 1
    : number extends Pos<N2> // If un-success
      ? 2
      : 0                    // Or continue
]

export type SubNegative<N1 extends Iteration, N2 extends Iteration> =
    _SubNegative<N1, N2> extends infer X
    ? Cast<X, Iteration>
    : never

export type _Sub<N1 extends Iteration, N2 extends Iteration> = {
    0: SubPositive<N1, N2>
    1: SubNegative<N1, N2>
}[_IsNegative<N2>]

export type Sub<N1 extends number, N2 extends number> =
    N1 extends unknown
    ? N2 extends unknown
      ? _Sub<IterationOf<N1>, IterationOf<N2>>[0]
      : never
    : never
