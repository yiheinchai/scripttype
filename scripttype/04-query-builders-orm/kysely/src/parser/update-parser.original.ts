/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/parser/update-parser.ts, for comparison with the ScriptType alongside.
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
type ShallowRecord<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TableExpressionOrList<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UpdateQueryBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UpdateResult<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type UpdateTable<DB, TE extends TableExpressionOrList<DB, never>> = [
  TE,
] extends [keyof DB]
  ? // This branch creates a good-looking type for the most common case:
    // updateTable('person') --> UpdateQueryBuilder<DB, 'person', 'person', {}>.
    // ExtractTableAlias is needed for the case where DB == any. Without it:
    // updateTable('person as p') --> UpdateQueryBuilder<DB, 'person as p', 'person as p', {}>
    UpdateQueryBuilder<
      DB,
      ExtractTableAlias<DB, TE>,
      ExtractTableAlias<DB, TE>,
      UpdateResult
    >
  : // This branch creates a good-looking type for common aliased case:
    // updateTable('person as p') --> UpdateQueryBuilder<DB & { p: Person }, 'p', 'p', {}>.
    [TE] extends [`${infer T} as ${infer A}`]
    ? T extends keyof DB
      ? UpdateQueryBuilder<DB & ShallowRecord<A, DB[T]>, A, A, UpdateResult>
      : never
    : TE extends ReadonlyArray<infer T>
      ? UpdateQueryBuilder<
          From<DB, T>,
          FromTables<DB, never, T>,
          FromTables<DB, never, T>,
          UpdateResult
        >
      : UpdateQueryBuilder<
          From<DB, TE>,
          FromTables<DB, never, TE>,
          FromTables<DB, never, TE>,
          UpdateResult
        >
