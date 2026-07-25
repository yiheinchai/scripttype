/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/parser/partition-by-parser.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DynamicReferenceBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StringReference<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PartitionByExpression<DB, TB extends keyof DB> =
  StringReference<DB, TB> | DynamicReferenceBuilder<any>

export type PartitionByExpressionOrList<DB, TB extends keyof DB> =
  ReadonlyArray<PartitionByExpression<DB, TB>> | PartitionByExpression<DB, TB>
