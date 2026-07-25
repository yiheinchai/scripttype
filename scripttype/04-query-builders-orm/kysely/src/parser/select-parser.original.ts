/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/parser/select-parser.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AliasedExpression<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AliasedExpressionOrFactory<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AliasedSelectQueryBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyAliasedColumn<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyAliasedColumnWithTable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyColumn<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyColumnWithTable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type DrainOuterGeneric<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type DynamicReferenceBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ExpressionBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ExtractColumnType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SelectType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type SelectExpression<DB, TB extends keyof DB> =
  | AnyAliasedColumnWithTable<DB, TB>
  | AnyAliasedColumn<DB, TB>
  | AnyColumnWithTable<DB, TB>
  | AnyColumn<DB, TB>
  | DynamicReferenceBuilder<any>
  | AliasedExpressionOrFactory<DB, TB>

export type SelectCallback<DB, TB extends keyof DB> = (
  eb: ExpressionBuilder<DB, TB>,
) => ReadonlyArray<SelectExpression<DB, TB>>

export type FlattenSelectExpression<SE> =
  SE extends DynamicReferenceBuilder<infer RA>
    ? { [R in RA]: DynamicReferenceBuilder<R> }[RA]
    : SE

export type ExtractAliasFromStringSelectExpression<SE extends string> =
  SE extends `${string}.${string}.${string} as ${infer A}`
    ? A
    : SE extends `${string}.${string} as ${infer A}`
      ? A
      : SE extends `${string} as ${infer A}`
        ? A
        : SE extends `${string}.${string}.${infer C}`
          ? C
          : SE extends `${string}.${infer C}`
            ? C
            : SE

export type ExtractAliasFromSelectExpression<SE> = SE extends string
  ? ExtractAliasFromStringSelectExpression<SE>
  : SE extends AliasedExpression<any, infer EA>
    ? EA
    : SE extends (qb: any) => AliasedExpression<any, infer EA>
      ? EA
      : SE extends DynamicReferenceBuilder<infer RA>
        ? ExtractAliasFromStringSelectExpression<RA>
        : never

export type ExtractTypeFromStringSelectExpression<
  DB,
  TB extends keyof DB,
  SE extends string,
> = SE extends `${infer SC}.${infer T}.${infer C} as ${string}`
  ? `${SC}.${T}` extends TB
    ? C extends keyof DB[`${SC}.${T}`]
      ? DB[`${SC}.${T}`][C]
      : never
    : never
  : SE extends `${infer T}.${infer C} as ${string}`
    ? T extends TB
      ? C extends keyof DB[T]
        ? DB[T][C]
        : never
      : never
    : SE extends `${infer C} as ${string}`
      ? C extends AnyColumn<DB, TB>
        ? ExtractColumnType<DB, TB, C>
        : never
      : SE extends `${infer SC}.${infer T}.${infer C}`
        ? `${SC}.${T}` extends TB
          ? C extends keyof DB[`${SC}.${T}`]
            ? DB[`${SC}.${T}`][C]
            : never
          : never
        : SE extends `${infer T}.${infer C}`
          ? T extends TB
            ? C extends keyof DB[T]
              ? DB[T][C]
              : never
            : never
          : SE extends AnyColumn<DB, TB>
            ? ExtractColumnType<DB, TB, SE>
            : never

export type ExtractTypeFromSelectExpression<
  DB,
  TB extends keyof DB,
  SE,
> = SE extends string
  ? ExtractTypeFromStringSelectExpression<DB, TB, SE>
  : SE extends AliasedSelectQueryBuilder<infer O, any>
    ? O[keyof O] | null
    : SE extends (eb: any) => AliasedSelectQueryBuilder<infer O, any>
      ? O[keyof O] | null
      : SE extends AliasedExpression<infer O, any>
        ? O
        : SE extends (eb: any) => AliasedExpression<infer O, any>
          ? O
          : SE extends DynamicReferenceBuilder<infer RA>
            ? ExtractTypeFromStringSelectExpression<DB, TB, RA> | undefined
            : never

export type Selection<
  DB,
  TB extends keyof DB,
  SE,
  // Inline version of DrainOuterGeneric for performance reasons.
  // Don't replace with DrainOuterGeneric!
> = [DB] extends [unknown]
  ? {
      [
        E in FlattenSelectExpression<SE> as ExtractAliasFromSelectExpression<E>
      ]: SelectType<ExtractTypeFromSelectExpression<DB, TB, E>>
    }
  : {}

export type CallbackSelection<DB, TB extends keyof DB, CB> = CB extends (
  eb: any,
) => ReadonlyArray<infer SE>
  ? Selection<DB, TB, SE>
  : never

export type SelectArg<
  DB,
  TB extends keyof DB,
  SE extends SelectExpression<DB, TB>,
> =
  | SE
  | ReadonlyArray<SE>
  | ((eb: ExpressionBuilder<DB, TB>) => ReadonlyArray<SE>)

export type AllSelection<DB, TB extends keyof DB> = DrainOuterGeneric<{
  [C in AnyColumn<DB, TB>]: {
    [T in TB]: SelectType<C extends keyof DB[T] ? DB[T][C] : never>
  }[TB]
}>
