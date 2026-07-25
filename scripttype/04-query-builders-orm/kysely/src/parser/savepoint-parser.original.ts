/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/parser/savepoint-parser.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type RollbackToSavepoint<
  S extends string[],
  SN extends S[number],
> = S extends [...infer L, infer R]
  ? R extends SN
    ? S
    : RollbackToSavepoint<L extends string[] ? L : never, SN>
  : never

export type ReleaseSavepoint<
  S extends string[],
  SN extends S[number],
> = S extends [...infer L, infer R]
  ? R extends SN
    ? L
    : ReleaseSavepoint<L extends string[] ? L : never, SN>
  : never
