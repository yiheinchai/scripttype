/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/query-builder/update-query-builder.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AliasedExpression<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type DrainOuterGeneric<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Nullable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ShallowRecord<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TableExpression<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UpdateQueryBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type InnerJoinedDB<DB, A extends string, R> = DrainOuterGeneric<{
  [C in keyof DB | A]: C extends A ? R : C extends keyof DB ? DB[C] : never
}>

export type InnerJoinedBuilder<
  DB,
  UT extends keyof DB,
  TB extends keyof DB,
  O,
  A extends string,
  R,
> = A extends keyof DB
  ? UpdateQueryBuilder<InnerJoinedDB<DB, A, R>, UT, TB | A, O>
  : // Much faster non-recursive solution for the simple case.
    UpdateQueryBuilder<DB & ShallowRecord<A, R>, UT, TB | A, O>

export type UpdateQueryBuilderWithInnerJoin<
  DB,
  UT extends keyof DB,
  TB extends keyof DB,
  O,
  TE extends TableExpression<DB, TB>,
> = TE extends `${infer T} as ${infer A}`
  ? T extends keyof DB
    ? InnerJoinedBuilder<DB, UT, TB, O, A, DB[T]>
    : never
  : TE extends keyof DB
    ? UpdateQueryBuilder<DB, UT, TB | TE, O>
    : TE extends AliasedExpression<infer QO, infer QA>
      ? InnerJoinedBuilder<DB, UT, TB, O, QA, QO>
      : TE extends (qb: any) => AliasedExpression<infer QO, infer QA>
        ? InnerJoinedBuilder<DB, UT, TB, O, QA, QO>
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
  UT extends keyof DB,
  TB extends keyof DB,
  O,
  A extends keyof any,
  R,
> = A extends keyof DB
  ? UpdateQueryBuilder<LeftJoinedDB<DB, A, R>, UT, TB | A, O>
  : // Much faster non-recursive solution for the simple case.
    UpdateQueryBuilder<DB & ShallowRecord<A, Nullable<R>>, UT, TB | A, O>

export type UpdateQueryBuilderWithLeftJoin<
  DB,
  UT extends keyof DB,
  TB extends keyof DB,
  O,
  TE extends TableExpression<DB, TB>,
> = TE extends `${infer T} as ${infer A}`
  ? T extends keyof DB
    ? LeftJoinedBuilder<DB, UT, TB, O, A, DB[T]>
    : never
  : TE extends keyof DB
    ? LeftJoinedBuilder<DB, UT, TB, O, TE, DB[TE]>
    : TE extends AliasedExpression<infer QO, infer QA>
      ? LeftJoinedBuilder<DB, UT, TB, O, QA, QO>
      : TE extends (qb: any) => AliasedExpression<infer QO, infer QA>
        ? LeftJoinedBuilder<DB, UT, TB, O, QA, QO>
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
  UT extends keyof DB,
  TB extends keyof DB,
  O,
  A extends keyof any,
  R,
> = UpdateQueryBuilder<RightJoinedDB<DB, TB, A, R>, UT, TB | A, O>

export type UpdateQueryBuilderWithRightJoin<
  DB,
  UT extends keyof DB,
  TB extends keyof DB,
  O,
  TE extends TableExpression<DB, TB>,
> = TE extends `${infer T} as ${infer A}`
  ? T extends keyof DB
    ? RightJoinedBuilder<DB, UT, TB, O, A, DB[T]>
    : never
  : TE extends keyof DB
    ? RightJoinedBuilder<DB, UT, TB, O, TE, DB[TE]>
    : TE extends AliasedExpression<infer QO, infer QA>
      ? RightJoinedBuilder<DB, UT, TB, O, QA, QO>
      : TE extends (qb: any) => AliasedExpression<infer QO, infer QA>
        ? RightJoinedBuilder<DB, UT, TB, O, QA, QO>
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
  UT extends keyof DB,
  TB extends keyof DB,
  O,
  A extends keyof any,
  R,
> = UpdateQueryBuilder<OuterJoinedBuilderDB<DB, TB, A, R>, UT, TB | A, O>

export type UpdateQueryBuilderWithFullJoin<
  DB,
  UT extends keyof DB,
  TB extends keyof DB,
  O,
  TE extends TableExpression<DB, TB>,
> = TE extends `${infer T} as ${infer A}`
  ? T extends keyof DB
    ? OuterJoinedBuilder<DB, UT, TB, O, A, DB[T]>
    : never
  : TE extends keyof DB
    ? OuterJoinedBuilder<DB, UT, TB, O, TE, DB[TE]>
    : TE extends AliasedExpression<infer QO, infer QA>
      ? OuterJoinedBuilder<DB, UT, TB, O, QA, QO>
      : TE extends (qb: any) => AliasedExpression<infer QO, infer QA>
        ? OuterJoinedBuilder<DB, UT, TB, O, QA, QO>
        : never
