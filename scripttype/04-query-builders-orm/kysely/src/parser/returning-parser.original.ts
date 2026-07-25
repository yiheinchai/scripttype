/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/parser/returning-parser.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AllSelection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CallbackSelection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DeleteResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InsertResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MergeResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Selection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UpdateResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ReturningRow<DB, TB extends keyof DB, O, SE> = O extends
  InsertResult | DeleteResult | UpdateResult | MergeResult
  ? Selection<DB, TB, SE>
  : O & Selection<DB, TB, SE>

export type ReturningCallbackRow<DB, TB extends keyof DB, O, CB> = O extends
  InsertResult | DeleteResult | UpdateResult | MergeResult
  ? CallbackSelection<DB, TB, CB>
  : O & CallbackSelection<DB, TB, CB>

export type ReturningAllRow<DB, TB extends keyof DB, O> = O extends
  InsertResult | DeleteResult | UpdateResult | MergeResult
  ? AllSelection<DB, TB>
  : O & AllSelection<DB, TB>
