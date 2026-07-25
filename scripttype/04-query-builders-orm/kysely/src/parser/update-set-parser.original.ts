/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/parser/update-set-parser.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyColumn<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type DrainOuterGeneric<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ExpressionBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ExtractRawTypeFromReferenceExpression<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UpdateType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ValueExpression<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type UpdateObject<
  DB,
  TB extends keyof DB,
  UT extends keyof DB = TB,
> = DrainOuterGeneric<{
  [C in AnyColumn<DB, UT>]?: {
    [T in UT]: C extends keyof DB[T]
      ? ValueExpression<DB, TB, UpdateType<DB[T][C]>> | undefined
      : never
  }[UT]
}>

export type UpdateObjectFactory<
  DB,
  TB extends keyof DB,
  UT extends keyof DB,
> = (eb: ExpressionBuilder<DB, TB>) => UpdateObject<DB, TB, UT>

export type UpdateObjectExpression<
  DB,
  TB extends keyof DB,
  UT extends keyof DB = TB,
> = UpdateObject<DB, TB, UT> | UpdateObjectFactory<DB, TB, UT>

export type ExtractUpdateTypeFromReferenceExpression<
  DB,
  TB extends keyof DB,
  RE,
  DV = unknown,
> = UpdateType<ExtractRawTypeFromReferenceExpression<DB, TB, RE, DV>>
