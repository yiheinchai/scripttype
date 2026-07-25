/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Number/Range.ts, for comparison with the ScriptType alongside.
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
type Prev<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Way<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type RangeForth<From extends Iteration, To extends Iteration, L extends List = []> = {
    0: RangeForth<Prev<From>, To, Prepend<L, Pos<From>>>
    1: L
}[Extends<From, To>]

export type RangeBack<From extends Iteration, To extends Iteration, L extends List = []> = {
    0: RangeBack<Next<From>, To, Prepend<L, Pos<From>>>
    1: L
}[Extends<From, To>]

export type __Range<From extends Iteration, To extends Iteration, way extends Way> = {
    '->': RangeForth<To, Prev<From>> // Reverse logic to work naturally #`Prepend`
    '<-': RangeBack<From, Next<To>>  // Works in reverse mode (default) #`Prepend`
}[way]

export type _Range<From extends number, To extends number, way extends Way> =
    __Range<IterationOf<From>, IterationOf<To>, way> extends infer X
    ? Cast<X, (string | number)[]>
    : never

export type Range<From extends number, To extends number, way extends Way = '->'> =
    From extends unknown
    ? To extends unknown
      ? _Range<From, To, way>
      : never
    : never
