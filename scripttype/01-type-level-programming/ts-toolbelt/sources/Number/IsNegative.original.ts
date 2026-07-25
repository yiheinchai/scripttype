/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Number/IsNegative.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Iteration<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IterationOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _IsNegative<N extends Iteration> = {
    '-': 1
    '+': 0
    '0': 0
}[N[1]]

export type IsNegative<N extends number> =
    _IsNegative<IterationOf<N>>
