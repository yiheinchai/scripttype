/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/MergeAll.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BuiltIn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Cast<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Depth<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extends<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Iteration<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IterationOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Length<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Merge<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Next<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pos<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type __MergeAll<O extends object, Os extends List<object>, depth extends Depth, ignore extends object, fill extends any, I extends Iteration = IterationOf<0>> = {
    0: __MergeAll<Merge<O, Os[Pos<I>], depth, ignore, fill>, Os, depth, ignore, fill, Next<I>>
    1: O
}[Extends<Pos<I>, Length<Os>>]

export type _MergeAll<O extends object, Os extends List<object>, depth extends Depth, ignore extends object, fill extends any> =
    __MergeAll<O, Os, depth, ignore, fill> extends infer X
    ? Cast<X, object>
    : never

export type MergeAll<O extends object, Os extends List<object>, depth extends Depth = 'flat', ignore extends object = BuiltIn, fill extends any = undefined> =
    O extends unknown
    ? Os extends unknown
      ? _MergeAll<O, Os, depth, ignore, fill>
      : never
    : never
