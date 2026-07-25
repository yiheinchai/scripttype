/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/parser/join-parser.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyColumnWithTable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DrainOuterGeneric<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type From<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FromTables<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type JoinBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type AnyJoinColumn<DB, TB extends keyof DB, TE> = AnyColumn<
  From<DB, TE>,
  FromTables<DB, TB, TE>
>

export type AnyJoinColumnWithTable<DB, TB extends keyof DB, TE> = AnyColumnWithTable<
  From<DB, TE>,
  FromTables<DB, TB, TE>
>

export type JoinReferenceExpression<
  DB,
  TB extends keyof DB,
  TE,
> = DrainOuterGeneric<
  AnyJoinColumn<DB, TB, TE> | AnyJoinColumnWithTable<DB, TB, TE>
>

export type JoinCallbackExpression<DB, TB extends keyof DB, TE> = (
  join: JoinBuilder<From<DB, TE>, FromTables<DB, TB, TE>>,
) => JoinBuilder<any, any>
