/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/parser/with-parser.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Compilable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DeleteQueryBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Expression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InsertQueryBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryCreator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ShallowRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UpdateQueryBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ExtractColumnNamesFromColumnList<R> = R extends `${infer C}, ${infer RS}`
  ? C | ExtractColumnNamesFromColumnList<RS>
  : R

export type ExtractRowFromCommonTableExpressionName<CN> =
  CN extends `${string}(${infer CL})`
    ? { [C in ExtractColumnNamesFromColumnList<CL>]: any }
    : ShallowRecord<string, any>

export type CommonTableExpressionOutput<DB, CN> =
  | Expression<ExtractRowFromCommonTableExpressionName<CN>>
  | InsertQueryBuilder<DB, any, ExtractRowFromCommonTableExpressionName<CN>>
  | UpdateQueryBuilder<
      DB,
      any,
      any,
      ExtractRowFromCommonTableExpressionName<CN>
    >
  | DeleteQueryBuilder<DB, any, ExtractRowFromCommonTableExpressionName<CN>>

export type CommonTableExpressionFactory<DB, CN> = (
  creator: QueryCreator<DB>,
) => CommonTableExpressionOutput<DB, CN>

export type CommonTableExpression<DB, CN> =
  CommonTableExpressionOutput<DB, CN> | CommonTableExpressionFactory<DB, CN>

export type ExtractTableFromCommonTableExpressionName<CN> =
  CN extends `${infer TB}(${string})` ? TB : CN

export type RecursiveCommonTableExpression<DB, CN extends string> = (
  creator: QueryCreator<
    DB & {
      // Recursive CTE can select from itself.
      [
        K in ExtractTableFromCommonTableExpressionName<CN>
      ]: ExtractRowFromCommonTableExpressionName<CN>
    }
  >,
) => CommonTableExpressionOutput<DB, CN>

export type ExtractRowFromCommonTableExpression<CTE> = CTE extends
  Expression<infer O> | Compilable<infer O>
  ? O
  : CTE extends (creator: QueryCreator<any>) => infer Q
    ? Q extends Expression<infer O> | Compilable<infer O>
      ? O
      : never
    : never

export type QueryCreatorWithCommonTableExpression<
  DB,
  CN extends string,
  CTE,
> = QueryCreator<
  DB & {
    [
      K in ExtractTableFromCommonTableExpressionName<CN>
    ]: ExtractRowFromCommonTableExpression<CTE>
  }
>
