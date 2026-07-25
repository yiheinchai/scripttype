/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/neverthrow/src/result.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Err<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ExtractErrTypes<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ExtractOkTypes<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Ok<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type Result<T, E> = Ok<T, E> | Err<T, E>

export type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  ...0[]
]

export type CollectResults<T, Collected extends unknown[] = [], Depth extends number = 50> = [
  Depth,
] extends [never]
  ? []
  : T extends [infer H, ...infer Rest]
  ? // And test whether the head of the list is a result
    H extends Result<infer L, infer R>
    ? // Continue collecting...
      CollectResults<
        // the rest of the elements
        Rest,
        // The collected
        [...Collected, [L, R]],
        // and one less of the current depth
        Prev[Depth]
      >
    : never // Impossible
  : Collected

export type Transpose<
  A,
  Transposed extends unknown[][] = [],
  Depth extends number = 10
> = A extends [infer T, ...infer Rest]
  ? T extends [infer L, infer R]
    ? Transposed extends [infer PL, infer PR]
      ? PL extends unknown[]
        ? PR extends unknown[]
          ? Transpose<Rest, [[...PL, L], [...PR, R]], Prev[Depth]>
          : never
        : never
      : Transpose<Rest, [[L], [R]], Prev[Depth]>
    : Transposed
  : Transposed

export type UnknownMembersToNever<T> = T extends [infer H, ...infer R]
  ? [[unknown] extends [H] ? never : H, ...UnknownMembersToNever<R>]
  : T

export type Combine<T, Depth extends number = 5> = Transpose<CollectResults<T>, [], Depth> extends [
  infer L,
  infer R,
]
  ? [UnknownMembersToNever<L>, UnknownMembersToNever<R>]
  : Transpose<CollectResults<T>, [], Depth> extends []
  ? [[], []]
  : never

export type Dedup<T> = T extends Result<infer RL, infer RR>
  ? [unknown] extends [RL]
    ? Err<RL, RR>
    : Ok<RL, RR>
  : T

export type MemberListOf<T> = (
  (T extends unknown ? (t: T) => T : never) extends infer U
    ? (U extends unknown ? (u: U) => unknown : never) extends (v: infer V) => unknown
      ? V
      : never
    : never
) extends (_: unknown) => infer W
  ? [...MemberListOf<Exclude<T, W>>, W]
  : []

export type EmptyArrayToNever<T, NeverArrayToNever extends number = 0> = T extends []
  ? never
  : NeverArrayToNever extends 1
  ? T extends [never, ...infer Rest]
    ? [EmptyArrayToNever<Rest>] extends [never]
      ? never
      : T
    : T
  : T

export type MembersToUnion<T> = T extends unknown[] ? T[number] : never

export type IsLiteralArray<T> = T extends { length: infer L }
  ? L extends number
    ? number extends L
      ? 0
      : 1
    : 0
  : 0

export type Traverse<T, Depth extends number = 5> = Combine<T, Depth> extends [infer Oks, infer Errs]
  ? Result<EmptyArrayToNever<Oks, 1>, MembersToUnion<Errs>>
  : never

export type TraverseWithAllErrors<T, Depth extends number = 5> = Traverse<T, Depth> extends Result<
  infer Oks,
  infer Errs
>
  ? Result<Oks, Errs[]>
  : never

export type CombineResults<
  T extends readonly Result<unknown, unknown>[]
> = IsLiteralArray<T> extends 1
  ? Traverse<T>
  : Result<ExtractOkTypes<T>, ExtractErrTypes<T>[number]>

export type CombineResultsWithAllErrorsArray<
  T extends readonly Result<unknown, unknown>[]
> = IsLiteralArray<T> extends 1
  ? TraverseWithAllErrors<T>
  : Result<ExtractOkTypes<T>, ExtractErrTypes<T>[number][]>
