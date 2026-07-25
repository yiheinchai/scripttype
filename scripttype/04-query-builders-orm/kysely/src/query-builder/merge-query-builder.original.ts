/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/query-builder/merge-query-builder.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AliasedExpression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ShallowRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TableExpression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type WheneableMergeQueryBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
