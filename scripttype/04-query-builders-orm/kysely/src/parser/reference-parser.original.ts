/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/parser/reference-parser.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyColumn<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyColumnWithTable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type DynamicReferenceBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Expression<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ExpressionOrFactory<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ExtractColumnType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type OrderByDirection<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SelectQueryBuilderExpression<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SelectType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type StringReference<DB, TB extends keyof DB> =
  AnyColumn<DB, TB> | AnyColumnWithTable<DB, TB>

export type SimpleReferenceExpression<DB, TB extends keyof DB> =
  StringReference<DB, TB> | DynamicReferenceBuilder<any>

export type ReferenceExpression<DB, TB extends keyof DB> =
  SimpleReferenceExpression<DB, TB> | ExpressionOrFactory<DB, TB, any>

export type ReferenceExpressionOrList<DB, TB extends keyof DB> =
  ReferenceExpression<DB, TB> | ReadonlyArray<ReferenceExpression<DB, TB>>

export type ExtractTypeFromStringReference<
  DB,
  TB extends keyof DB,
  RE extends string,
  DV = unknown,
> = RE extends `${infer SC}.${infer T}.${infer C}`
  ? `${SC}.${T}` extends TB
    ? C extends keyof DB[`${SC}.${T}`]
      ? DB[`${SC}.${T}`][C]
      : never
    : never
  : RE extends `${infer T}.${infer C}`
    ? T extends TB
      ? C extends keyof DB[T]
        ? DB[T][C]
        : never
      : never
    : RE extends AnyColumn<DB, TB>
      ? ExtractColumnType<DB, TB, RE>
      : DV

export type ExtractRawTypeFromReferenceExpression<
  DB,
  TB extends keyof DB,
  RE,
  DV = unknown,
> = RE extends string
  ? ExtractTypeFromStringReference<DB, TB, RE>
  : RE extends SelectQueryBuilderExpression<infer O>
    ? O[keyof O] | null
    : RE extends (qb: any) => SelectQueryBuilderExpression<infer O>
      ? O[keyof O] | null
      : RE extends Expression<infer O>
        ? O
        : RE extends (qb: any) => Expression<infer O>
          ? O
          : DV

export type ExtractTypeFromReferenceExpression<
  DB,
  TB extends keyof DB,
  RE,
  DV = unknown,
> = SelectType<ExtractRawTypeFromReferenceExpression<DB, TB, RE, DV>>

export type OrderedColumnName<C extends string> =
  C extends `${string} ${infer O}`
    ? O extends OrderByDirection
      ? C
      : never
    : C

export type ExtractColumnNameFromOrderedColumnName<C extends string> =
  C extends `${infer CL} ${infer O}`
    ? O extends OrderByDirection
      ? CL
      : never
    : C
