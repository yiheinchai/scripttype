/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/sqlite-core/session.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ExecuteResultSync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQLiteRaw<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ExecuteResult<TType extends 'sync' | 'async', TResult> = TType extends 'async' ? Promise<TResult>
	: ExecuteResultSync<TResult>;

export type Result<TKind extends 'sync' | 'async', TResult> = { sync: TResult; async: Promise<TResult> }[TKind];

export type DBResult<TKind extends 'sync' | 'async', TResult> = { sync: TResult; async: SQLiteRaw<TResult> }[TKind];
