/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/parser/select-from-parser.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ExtractTableAlias<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type From<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type FromTables<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SelectQueryBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ShallowRecord<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TableExpressionOrList<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type SelectFrom<
  DB,
  TB extends keyof DB,
  TE extends TableExpressionOrList<DB, TB>,
> = [TE] extends [keyof DB]
  ? // This branch creates a good-looking type for the most common case:
    // selectFrom('person') --> SelectQueryBuilder<DB, 'person', {}>.
    // ExtractTableAlias is needed for the case where DB == any. Without it:
    // selectFrom('person as p') --> SelectQueryBuilder<DB, 'person as p', {}>
    SelectQueryBuilder<DB, TB | ExtractTableAlias<DB, TE>, {}>
  : // This branch creates a good-looking type for common aliased case:
    // selectFrom('person as p') --> SelectQueryBuilder<DB & { p: Person }, 'p', {}>.
    [TE] extends [`${infer T} as ${infer A}`]
    ? T extends keyof DB
      ? SelectQueryBuilder<DB & ShallowRecord<A, DB[T]>, TB | A, {}>
      : never
    : TE extends ReadonlyArray<infer T>
      ? SelectQueryBuilder<From<DB, T>, FromTables<DB, TB, T>, {}>
      : SelectQueryBuilder<From<DB, TE>, FromTables<DB, TB, TE>, {}>
