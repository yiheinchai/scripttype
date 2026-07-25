/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/parser/insert-values-parser.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ExpressionBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InsertType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonNullableInsertKeys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NullableInsertKeys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ValueExpression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type InsertObject<DB, TB extends keyof DB> = {
  [C in NonNullableInsertKeys<DB[TB]>]: ValueExpression<
    DB,
    TB,
    InsertType<DB[TB][C]>
  >
} & {
  [C in NullableInsertKeys<DB[TB]>]?:
    ValueExpression<DB, TB, InsertType<DB[TB][C]>> | undefined
}

export type InsertObjectOrList<DB, TB extends keyof DB> =
  InsertObject<DB, TB> | ReadonlyArray<InsertObject<DB, TB>>

export type InsertObjectOrListFactory<
  DB,
  TB extends keyof DB,
  UT extends keyof DB = never,
> = (eb: ExpressionBuilder<DB, TB | UT>) => InsertObjectOrList<DB, TB>

export type InsertExpression<
  DB,
  TB extends keyof DB,
  UT extends keyof DB = never,
> = InsertObjectOrList<DB, TB> | InsertObjectOrListFactory<DB, TB, UT>
