/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/parser/reference-parser.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyColumnWithTable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DynamicReferenceBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Expression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExpressionOrFactory<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExtractColumnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OrderByDirection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectQueryBuilderExpression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
