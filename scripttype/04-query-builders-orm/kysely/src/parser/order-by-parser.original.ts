/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/parser/order-by-parser.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DynamicReferenceBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExpressionOrFactory<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReferenceExpression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StringReference<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type OrderByExpression<DB, TB extends keyof DB, O> =
  | StringReference<DB, TB>
  | (keyof O & string)
  | ExpressionOrFactory<DB, TB, any>
  | DynamicReferenceBuilder<any>

export type OrderByDirection = 'asc' | 'desc'

export type DirectedOrderByStringReference<DB, TB extends keyof DB, O> = `${
  StringReference<DB, TB> | (keyof O & string)} ${OrderByDirection}`

export type UndirectedOrderByExpression<DB, TB extends keyof DB, O> =
  ReferenceExpression<DB, TB> | (keyof O & string)
