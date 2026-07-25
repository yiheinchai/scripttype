/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/parser/value-parser.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Expression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExpressionOrFactory<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectQueryBuilderExpression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ValueExpression<DB, TB extends keyof DB, V> =
  V | ExpressionOrFactory<DB, TB, V>

export type ValueExpressionOrList<DB, TB extends keyof DB, V> =
  ValueExpression<DB, TB, V> | ReadonlyArray<ValueExpression<DB, TB, V>>

export type ExtractTypeFromValueExpression<VE> =
  VE extends SelectQueryBuilderExpression<Record<string, infer SV>>
    ? SV
    : VE extends Expression<infer V>
      ? V
      : VE

export type ExtractTypeFromValueExpressionOrList<VE> =
  VE extends ReadonlyArray<infer AV>
    ? ExtractTypeFromValueExpression<AV>
    : ExtractTypeFromValueExpression<VE>
