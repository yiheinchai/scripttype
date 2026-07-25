/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Number/Absolute.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Iteration<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IterationOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _IsNegative<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _Negate<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _Absolute<N extends Iteration> = {
    0: N
    1: _Negate<N>
}[_IsNegative<N>]

export type Absolute<N extends number> =
    N extends unknown
    ? _Absolute<IterationOf<N>>[0]
    : never
