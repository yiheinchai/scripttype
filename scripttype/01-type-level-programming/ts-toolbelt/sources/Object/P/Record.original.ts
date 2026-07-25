/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/P/Record.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Iteration<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IterationOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LastKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Modx<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Next<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pos<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Record_RR<Path extends List<Key>, A, I extends Iteration = IterationOf<0>> = {
    readonly [Key in Path[Pos<I>]]: Pos<I> extends LastKey<Path>
                                    ? A
                                    : Record_RR<Path, A, Next<I>>
} & {}

export type Record_RW<Path extends List<Key>, A, I extends Iteration = IterationOf<0>> = {
    [Key in Path[Pos<I>]]: Pos<I> extends LastKey<Path>
                           ? A
                           : Record_RW<Path, A, Next<I>>
} & {}

export type Record_OR<Path extends List<Key>, A, I extends Iteration = IterationOf<0>> = {
    readonly [Key in Path[Pos<I>]]?: Pos<I> extends LastKey<Path>
                                     ? A
                                     : Record_OR<Path, A, Next<I>>
} & {}

export type Record_OW<Path extends List<Key>, A, I extends Iteration = IterationOf<0>> = {
    [Key in Path[Pos<I>]]?: Pos<I> extends LastKey<Path>
                            ? A
                            : Record_OW<Path, A, Next<I>>
} & {}

export type Record<Path extends List<Key>, A, modx extends Modx = ['!', 'W']> = {
  '!': {
      'R': Record_RR<Path, A>
      'W': Record_RW<Path, A>
  },
  '?': {
      'R': Record_OR<Path, A>
      'W': Record_OW<Path, A>
  }
}[modx[0]][modx[1]]
