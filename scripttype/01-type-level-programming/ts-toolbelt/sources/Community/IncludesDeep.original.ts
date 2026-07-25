/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Community/IncludesDeep.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Cast<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Is<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Iteration<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IterationOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Match<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Next<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pos<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Prev<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnionOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _IncludesDeep<O, M extends any, match extends Match, limit extends number, I extends Iteration = IterationOf<0>> = {
    0: _IncludesDeep<O extends object ? UnionOf<O> : O, M, match, limit, Next<I>>
    1: 1
    2: 0
}[
    Pos<Prev<I>> extends limit // if we go past the limit
    ? 2                        // end the loop here
    : Is<O, M, match>          // if 0 => continue, if 1 => end
]

export type IncludesDeep<O extends object, M extends any, match extends Match = 'default', limit extends number = 10> =
    _IncludesDeep<O, M, match, limit> extends infer X
    ? Cast<X, Boolean>
    : never
