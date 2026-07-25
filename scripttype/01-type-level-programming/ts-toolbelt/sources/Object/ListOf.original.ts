/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/ListOf.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Append<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Cast<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extends<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Iteration<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IterationOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Next<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pos<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Select<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type AppendExists<O extends object, LN extends List, I extends Iteration> =
    Key<I> extends keyof O ? Append<LN, O[Key<I>]> :
    Pos<I> extends keyof O ? Append<LN, O[Pos<I>]> :
    LN

export type ___ListOf<O extends object, K, LN extends List = [], I extends Iteration = IterationOf<0>> = {
    0: ___ListOf<O, Exclude<K, Key<I>>, AppendExists<O, LN, I>, Next<I>>
    1: LN
}[Extends<[K], [never]>]

export type __ListOf<O extends object> =
    number extends keyof O ? O[number][] :
    string extends keyof O ? O[string][] :
    symbol extends keyof O ? O[symbol][] :
    ___ListOf<O, Select<keyof O, number | `${number}`>>

export type _ListOf<O extends object> =
    __ListOf<O> extends infer X
    ? Cast<X, List>
    : never

export type ListOf<O extends object> =
    O extends unknown
    ? _ListOf<O>
    : never
