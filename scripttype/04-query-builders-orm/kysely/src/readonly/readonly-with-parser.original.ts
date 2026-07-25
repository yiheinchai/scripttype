/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/readonly/readonly-with-parser.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Expression<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ExtractRowFromCommonTableExpressionName<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ExtractTableFromCommonTableExpressionName<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyQueryCreator<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SelectQueryBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type ReadonlyCommonTableExpressionOutput<DB, CN> =
  | SelectQueryBuilder<DB, any, any>
  | Expression<ExtractRowFromCommonTableExpressionName<CN>>

export type ReadonlyCommonTableExpressionFactory<DB, CN> = (
  creator: ReadonlyQueryCreator<DB>,
) => ReadonlyCommonTableExpressionOutput<DB, CN>

export type ReadonlyCommonTableExpression<DB, CN> =
  | ReadonlyCommonTableExpressionOutput<DB, CN>
  | ReadonlyCommonTableExpressionFactory<DB, CN>

export type ReadonlyRecursiveCommonTableExpression<DB, CN extends string> = (
  creator: ReadonlyQueryCreator<
    // Recursive CTE can select from itself.
    DB & {
      [
        K in ExtractTableFromCommonTableExpressionName<CN>
      ]: ExtractRowFromCommonTableExpressionName<CN>
    }
  >,
) => ReadonlyCommonTableExpressionOutput<DB, CN>

export type ReadonlyExtractRowFromCommonTableExpression<CTE> =
  CTE extends Expression<infer O>
    ? O
    : CTE extends (creator: ReadonlyQueryCreator<any>) => infer Q
      ? Q extends Expression<infer O>
        ? O
        : never
      : never

export type ReadonlyQueryCreatorWithCommonTableExpression<
  DB,
  CN extends string,
  CTE,
> = ReadonlyQueryCreator<
  DB & {
    [
      K in ExtractTableFromCommonTableExpressionName<CN>
    ]: ReadonlyExtractRowFromCommonTableExpression<CTE>
  }
>
