/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Union/ListOf.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Cast<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extends<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Last<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Prepend<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _ListOf<U, LN extends List = [], LastU = Last<U>> = {
    0: _ListOf<Exclude<U, LastU>, Prepend<LN, LastU>>
    1: LN
}[Extends<[U], [never]>]

export type ListOf<U extends any> =
    _ListOf<U> extends infer X
    ? Cast<X, List>
    : never
