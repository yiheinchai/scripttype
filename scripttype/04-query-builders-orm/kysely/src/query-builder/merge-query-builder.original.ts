/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/query-builder/merge-query-builder.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AliasedExpression<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ShallowRecord<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TableExpression<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type WheneableMergeQueryBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type UsingBuilder<
  DB,
  TT extends keyof DB,
  A extends string,
  R,
  O,
> = A extends keyof DB
  ? WheneableMergeQueryBuilder<DB, TT, A, O>
  : WheneableMergeQueryBuilder<DB & ShallowRecord<A, R>, TT, A, O>

export type ExtractWheneableMergeQueryBuilder<
  DB,
  TT extends keyof DB,
  TE extends TableExpression<DB, TT>,
  O,
> = TE extends `${infer T} as ${infer A}`
  ? T extends keyof DB
    ? UsingBuilder<DB, TT, A, DB[T], O>
    : never
  : TE extends keyof DB
    ? WheneableMergeQueryBuilder<DB, TT, TE, O>
    : TE extends AliasedExpression<infer QO, infer QA>
      ? UsingBuilder<DB, TT, QA, QO, O>
      : TE extends (qb: any) => AliasedExpression<infer QO, infer QA>
        ? UsingBuilder<DB, TT, QA, QO, O>
        : never
