/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/parser/delete-from-parser.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DeleteQueryBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DeleteResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExtractTableAlias<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type From<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FromTables<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ShallowRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TableExpressionOrList<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type DeleteFrom<DB, TE extends TableExpressionOrList<DB, never>> = [
  TE,
] extends [keyof DB]
  ? // This branch creates a good-looking type for the most common case:
    // deleteFrom('person') --> DeleteQueryBuilder<DB, 'person', {}>.
    // ExtractTableAlias is needed for the case where DB == any. Without it:
    // deleteFrom('person as p') --> DeleteQueryBuilder<DB, 'person as p', {}>
    DeleteQueryBuilder<DB, ExtractTableAlias<DB, TE>, DeleteResult>
  : // This branch creates a good-looking type for common aliased case:
    // deleteFrom('person as p') --> DeleteQueryBuilder<DB & { p: Person }, 'p', {}>.
    [TE] extends [`${infer T} as ${infer A}`]
    ? T extends keyof DB
      ? DeleteQueryBuilder<DB & ShallowRecord<A, DB[T]>, A, DeleteResult>
      : never
    : TE extends ReadonlyArray<infer T>
      ? DeleteQueryBuilder<From<DB, T>, FromTables<DB, never, T>, DeleteResult>
      : DeleteQueryBuilder<
          From<DB, TE>,
          FromTables<DB, never, TE>,
          DeleteResult
        >
