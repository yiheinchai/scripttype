/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Number/Sub.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Cast<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Iteration<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IterationOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Next<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Pos<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Prev<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type _IsNegative<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
