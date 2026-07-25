/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/query-builder/delete-query-builder.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AliasedExpression<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type DeleteQueryBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type DrainOuterGeneric<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Nullable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ShallowRecord<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TableExpression<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type InnerJoinedDB<DB, A extends string, R> = DrainOuterGeneric<{
  [C in keyof DB | A]: C extends A ? R : C extends keyof DB ? DB[C] : never
}>

export type InnerJoinedBuilder<
  DB,
  TB extends keyof DB,
  O,
  A extends string,
  R,
> = A extends keyof DB
  ? DeleteQueryBuilder<InnerJoinedDB<DB, A, R>, TB | A, O>
  : // Much faster non-recursive solution for the simple case.
    DeleteQueryBuilder<DB & ShallowRecord<A, R>, TB | A, O>

export type DeleteQueryBuilderWithInnerJoin<
  DB,
  TB extends keyof DB,
  O,
  TE extends TableExpression<DB, TB>,
> = TE extends `${infer T} as ${infer A}`
  ? T extends keyof DB
    ? InnerJoinedBuilder<DB, TB, O, A, DB[T]>
    : never
  : TE extends keyof DB
    ? DeleteQueryBuilder<DB, TB | TE, O>
    : TE extends AliasedExpression<infer QO, infer QA>
      ? InnerJoinedBuilder<DB, TB, O, QA, QO>
      : TE extends (qb: any) => AliasedExpression<infer QO, infer QA>
        ? InnerJoinedBuilder<DB, TB, O, QA, QO>
        : never

export type LeftJoinedDB<DB, A extends keyof any, R> = DrainOuterGeneric<{
  [C in keyof DB | A]: C extends A
    ? Nullable<R>
    : C extends keyof DB
      ? DB[C]
      : never
}>

export type LeftJoinedBuilder<
  DB,
  TB extends keyof DB,
  O,
  A extends keyof any,
  R,
> = A extends keyof DB
  ? DeleteQueryBuilder<LeftJoinedDB<DB, A, R>, TB | A, O>
  : // Much faster non-recursive solution for the simple case.
    DeleteQueryBuilder<DB & ShallowRecord<A, Nullable<R>>, TB | A, O>

export type DeleteQueryBuilderWithLeftJoin<
  DB,
  TB extends keyof DB,
  O,
  TE extends TableExpression<DB, TB>,
> = TE extends `${infer T} as ${infer A}`
  ? T extends keyof DB
    ? LeftJoinedBuilder<DB, TB, O, A, DB[T]>
    : never
  : TE extends keyof DB
    ? LeftJoinedBuilder<DB, TB, O, TE, DB[TE]>
    : TE extends AliasedExpression<infer QO, infer QA>
      ? LeftJoinedBuilder<DB, TB, O, QA, QO>
      : TE extends (qb: any) => AliasedExpression<infer QO, infer QA>
        ? LeftJoinedBuilder<DB, TB, O, QA, QO>
        : never

export type RightJoinedDB<
  DB,
  TB extends keyof DB,
  A extends keyof any,
  R,
> = DrainOuterGeneric<{
  [C in keyof DB | A]: C extends A
    ? R
    : C extends TB
      ? Nullable<DB[C]>
      : C extends keyof DB
        ? DB[C]
        : never
}>

export type RightJoinedBuilder<
  DB,
  TB extends keyof DB,
  O,
  A extends keyof any,
  R,
> = DeleteQueryBuilder<RightJoinedDB<DB, TB, A, R>, TB | A, O>

export type DeleteQueryBuilderWithRightJoin<
  DB,
  TB extends keyof DB,
  O,
  TE extends TableExpression<DB, TB>,
> = TE extends `${infer T} as ${infer A}`
  ? T extends keyof DB
    ? RightJoinedBuilder<DB, TB, O, A, DB[T]>
    : never
  : TE extends keyof DB
    ? RightJoinedBuilder<DB, TB, O, TE, DB[TE]>
    : TE extends AliasedExpression<infer QO, infer QA>
      ? RightJoinedBuilder<DB, TB, O, QA, QO>
      : TE extends (qb: any) => AliasedExpression<infer QO, infer QA>
        ? RightJoinedBuilder<DB, TB, O, QA, QO>
        : never

export type OuterJoinedBuilderDB<
  DB,
  TB extends keyof DB,
  A extends keyof any,
  R,
> = DrainOuterGeneric<{
  [C in keyof DB | A]: C extends A
    ? Nullable<R>
    : C extends TB
      ? Nullable<DB[C]>
      : C extends keyof DB
        ? DB[C]
        : never
}>

export type OuterJoinedBuilder<
  DB,
  TB extends keyof DB,
  O,
  A extends keyof any,
  R,
> = DeleteQueryBuilder<OuterJoinedBuilderDB<DB, TB, A, R>, TB | A, O>

export type DeleteQueryBuilderWithFullJoin<
  DB,
  TB extends keyof DB,
  O,
  TE extends TableExpression<DB, TB>,
> = TE extends `${infer T} as ${infer A}`
  ? T extends keyof DB
    ? OuterJoinedBuilder<DB, TB, O, A, DB[T]>
    : never
  : TE extends keyof DB
    ? OuterJoinedBuilder<DB, TB, O, TE, DB[TE]>
    : TE extends AliasedExpression<infer QO, infer QA>
      ? OuterJoinedBuilder<DB, TB, O, QA, QO>
      : TE extends (qb: any) => AliasedExpression<infer QO, infer QA>
        ? OuterJoinedBuilder<DB, TB, O, QA, QO>
        : never
