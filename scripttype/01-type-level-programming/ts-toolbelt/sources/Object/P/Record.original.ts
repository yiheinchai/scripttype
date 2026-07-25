/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/P/Record.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Iteration<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IterationOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type LastKey<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type List<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Modx<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Next<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Pos<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
