/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/parser/coalesce-parser.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ExtractTypeFromReferenceExpression<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type ExtractTypeFromCoalesce1<
  DB,
  TB extends keyof DB,
  R1,
> = ExtractTypeFromReferenceExpression<DB, TB, R1>

export type NotNull<T> = Exclude<T, null>

export type ExtractTypeFromCoalesceValues2<V1, V2> = null extends V1
  ? null extends V2
    ? V1 | V2
    : NotNull<V1 | V2>
  : NotNull<V1>

export type ExtractTypeFromCoalesce2<
  DB,
  TB extends keyof DB,
  R1,
  R2,
> = ExtractTypeFromCoalesceValues2<
  ExtractTypeFromReferenceExpression<DB, TB, R1>,
  ExtractTypeFromReferenceExpression<DB, TB, R2>
>

export type ExtractTypeFromCoalesceValues3<V1, V2, V3> = null extends V1
  ? null extends V2
    ? null extends V3
      ? V1 | V2 | V3
      : NotNull<V1 | V2 | V3>
    : NotNull<V1 | V2>
  : NotNull<V1>

export type ExtractTypeFromCoalesce3<
  DB,
  TB extends keyof DB,
  R1,
  R2,
  R3,
> = ExtractTypeFromCoalesceValues3<
  ExtractTypeFromReferenceExpression<DB, TB, R1>,
  ExtractTypeFromReferenceExpression<DB, TB, R2>,
  ExtractTypeFromReferenceExpression<DB, TB, R3>
>

export type ExtractTypeFromCoalesceValues4<V1, V2, V3, V4> = null extends V1
  ? null extends V2
    ? null extends V3
      ? null extends V4
        ? V1 | V2 | V3 | V4
        : NotNull<V1 | V2 | V3 | V4>
      : NotNull<V1 | V2 | V3>
    : NotNull<V1 | V2>
  : NotNull<V1>

export type ExtractTypeFromCoalesce4<
  DB,
  TB extends keyof DB,
  R1,
  R2,
  R3,
  R4,
> = ExtractTypeFromCoalesceValues4<
  ExtractTypeFromReferenceExpression<DB, TB, R1>,
  ExtractTypeFromReferenceExpression<DB, TB, R2>,
  ExtractTypeFromReferenceExpression<DB, TB, R3>,
  ExtractTypeFromReferenceExpression<DB, TB, R4>
>

export type ExtractTypeFromCoalesceValues5<V1, V2, V3, V4, V5> = null extends V1
  ? null extends V2
    ? null extends V3
      ? null extends V4
        ? null extends V5
          ? V1 | V2 | V3 | V4 | V5
          : NotNull<V1 | V2 | V3 | V4 | V5>
        : NotNull<V1 | V2 | V3 | V4>
      : NotNull<V1 | V2 | V3>
    : NotNull<V1 | V2>
  : NotNull<V1>

export type ExtractTypeFromCoalesce5<
  DB,
  TB extends keyof DB,
  R1,
  R2,
  R3,
  R4,
  R5,
> = ExtractTypeFromCoalesceValues5<
  ExtractTypeFromReferenceExpression<DB, TB, R1>,
  ExtractTypeFromReferenceExpression<DB, TB, R2>,
  ExtractTypeFromReferenceExpression<DB, TB, R3>,
  ExtractTypeFromReferenceExpression<DB, TB, R4>,
  ExtractTypeFromReferenceExpression<DB, TB, R5>
>
