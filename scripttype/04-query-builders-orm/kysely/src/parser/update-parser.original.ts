/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/parser/update-parser.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ExtractTableAlias<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type From<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FromTables<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ShallowRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TableExpressionOrList<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UpdateQueryBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UpdateResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
