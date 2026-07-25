/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/parser/expression-parser.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AliasedExpression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Expression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExpressionBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectQueryBuilderExpression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type OperandExpression<V> =
  // SQL treats a subquery with a single selection as a scalar. That's
  // why we need to explicitly allow `SelectQueryBuilder` here with a
  // `Record<string, V>` output type, even though `SelectQueryBuilder`
  // is also an `Expression`.
  Expression<V> | SelectQueryBuilderExpression<Record<string, V>>

export type OperandExpressionFactory<DB, TB extends keyof DB, V> = (
  eb: ExpressionBuilder<DB, TB>,
) => OperandExpression<V>

export type ExpressionOrFactory<DB, TB extends keyof DB, V> =
  OperandExpression<V> | OperandExpressionFactory<DB, TB, V>

export type AliasedExpressionFactory<DB, TB extends keyof DB> = (
  eb: ExpressionBuilder<DB, TB>,
) => AliasedExpression<any, any>

export type AliasedExpressionOrFactory<DB, TB extends keyof DB> =
  AliasedExpression<any, any> | AliasedExpressionFactory<DB, TB>

export type ExpressionFactory<DB, TB extends keyof DB, V> = (
  eb: ExpressionBuilder<DB, TB>,
) => Expression<V>
