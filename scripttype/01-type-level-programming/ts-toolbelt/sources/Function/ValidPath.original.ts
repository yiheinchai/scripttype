/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Function/ValidPath.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type At<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Cast<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extends<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Iteration<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IterationOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Length<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Next<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pos<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Update<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ValidatePath<O, Path extends List<AKey>, I extends Iteration> =
    Update<
        Path,
        Key<I>,
        [At<O & {}, Path[Pos<I>]>] extends [never]
        ? keyof O
        : Path[Pos<I>]
    >

export type __ValidPath<O, Path extends List<AKey>, I extends Iteration = IterationOf<0>> = {
    0: __ValidPath<NonNullable<At<O & {}, Path[Pos<I>]>>, ValidatePath<O, Path, I>, Next<I>>
    1: Path
}[Extends<Pos<I>, Length<Path>>]

export type _ValidPath<O extends object, Path extends List<AKey>> =
    __ValidPath<O, Path> extends infer X
    ? Cast<X, List<AKey>>
    : never

export type ValidPath<O extends object, Path extends List<AKey>> =
    O extends unknown
    ? Path extends unknown
      ? _ValidPath<O, Path>
      : never
    : never
