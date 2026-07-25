/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Number/Greater.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Iteration<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IterationOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _IsPositive<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _Sub<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _Greater<N1 extends Iteration, N2 extends Iteration> =
    _IsPositive<_Sub<N1, N2>>

export type Greater<N1 extends number, N2 extends number> =
    N1 extends unknown
    ? N2 extends unknown
      ? _Greater<IterationOf<N1>, IterationOf<N2>>
      : never
    : never
