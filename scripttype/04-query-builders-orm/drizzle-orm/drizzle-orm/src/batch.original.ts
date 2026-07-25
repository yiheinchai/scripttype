/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/batch.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Dialect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RunnableQuery<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type BatchItem<TDialect extends Dialect = Dialect> = RunnableQuery<any, TDialect>;

export type BatchResponse<T extends BatchItem[] | readonly BatchItem[]> = {
	[K in keyof T]: T[K]['_']['result'];
};
