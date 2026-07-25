/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/readonly/readonly-with-parser.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Expression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExtractRowFromCommonTableExpressionName<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExtractTableFromCommonTableExpressionName<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyQueryCreator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectQueryBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
