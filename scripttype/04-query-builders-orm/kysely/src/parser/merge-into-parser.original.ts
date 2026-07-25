/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/parser/merge-into-parser.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ExtractTableAlias<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MergeQueryBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MergeResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ShallowRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SimpleTableReference<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type MergeInto<DB, TE extends SimpleTableReference<DB>> = [TE] extends [
  keyof DB,
]
  ? MergeQueryBuilder<DB, ExtractTableAlias<DB, TE>, MergeResult>
  : [TE] extends [`${infer T} as ${infer A}`]
    ? T extends keyof DB
      ? MergeQueryBuilder<DB & ShallowRecord<A, DB[T]>, A, MergeResult>
      : never
    : never
