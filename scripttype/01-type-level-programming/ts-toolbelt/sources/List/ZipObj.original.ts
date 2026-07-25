/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/List/ZipObj.ts, for comparison with the ScriptType alongside.
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
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Length<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Naked<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Next<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PatchFlat<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pos<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type __ZipObj<LKeys extends List<Key>, LFields extends List, O extends object = {}, I extends Iteration = IterationOf<0>> = {
    0: __ZipObj<LKeys, LFields, PatchFlat<O, Record<LKeys[Pos<I>], LFields[Pos<I>]>>, Next<I>>
    1: O
}[Extends<Pos<I>, Length<LKeys>>]

export type _ZipObj<LKeys extends List<Key>, LFields extends List> =
    __ZipObj<Naked<LKeys>, LFields> extends infer X
    ? Cast<X, object>
    : never

export type ZipObj<LKeys extends List<Key>, LFields extends List> =
    LKeys extends unknown
    ? LFields extends unknown
      ? _ZipObj<LKeys, LFields>
      : never
    : never
