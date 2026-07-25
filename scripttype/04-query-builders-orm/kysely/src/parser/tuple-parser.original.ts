/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/parser/tuple-parser.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DrainOuterGeneric<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExtractTypeFromReferenceExpression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExtractTypeFromValueExpression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type RefTuple2<DB, TB extends keyof DB, R1, R2> = DrainOuterGeneric<
  [
    ExtractTypeFromReferenceExpression<DB, TB, R1>,
    ExtractTypeFromReferenceExpression<DB, TB, R2>,
  ]
>

export type RefTuple3<DB, TB extends keyof DB, R1, R2, R3> = DrainOuterGeneric<
  [
    ExtractTypeFromReferenceExpression<DB, TB, R1>,
    ExtractTypeFromReferenceExpression<DB, TB, R2>,
    ExtractTypeFromReferenceExpression<DB, TB, R3>,
  ]
>

export type RefTuple4<
  DB,
  TB extends keyof DB,
  R1,
  R2,
  R3,
  R4,
> = DrainOuterGeneric<
  [
    ExtractTypeFromReferenceExpression<DB, TB, R1>,
    ExtractTypeFromReferenceExpression<DB, TB, R2>,
    ExtractTypeFromReferenceExpression<DB, TB, R3>,
    ExtractTypeFromReferenceExpression<DB, TB, R4>,
  ]
>

export type RefTuple5<
  DB,
  TB extends keyof DB,
  R1,
  R2,
  R3,
  R4,
  R5,
> = DrainOuterGeneric<
  [
    ExtractTypeFromReferenceExpression<DB, TB, R1>,
    ExtractTypeFromReferenceExpression<DB, TB, R2>,
    ExtractTypeFromReferenceExpression<DB, TB, R3>,
    ExtractTypeFromReferenceExpression<DB, TB, R4>,
    ExtractTypeFromReferenceExpression<DB, TB, R5>,
  ]
>

export type ValTuple2<V1, V2> = DrainOuterGeneric<
  [ExtractTypeFromValueExpression<V1>, ExtractTypeFromValueExpression<V2>]
>

export type ValTuple3<V1, V2, V3> = DrainOuterGeneric<
  [
    ExtractTypeFromValueExpression<V1>,
    ExtractTypeFromValueExpression<V2>,
    ExtractTypeFromValueExpression<V3>,
  ]
>

export type ValTuple4<V1, V2, V3, V4> = DrainOuterGeneric<
  [
    ExtractTypeFromValueExpression<V1>,
    ExtractTypeFromValueExpression<V2>,
    ExtractTypeFromValueExpression<V3>,
    ExtractTypeFromValueExpression<V4>,
  ]
>

export type ValTuple5<V1, V2, V3, V4, V5> = DrainOuterGeneric<
  [
    ExtractTypeFromValueExpression<V1>,
    ExtractTypeFromValueExpression<V2>,
    ExtractTypeFromValueExpression<V3>,
    ExtractTypeFromValueExpression<V4>,
    ExtractTypeFromValueExpression<V5>,
  ]
>
