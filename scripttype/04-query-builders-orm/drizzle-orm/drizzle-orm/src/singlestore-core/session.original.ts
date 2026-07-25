/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/singlestore-core/session.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Assume<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Equal<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStorePreparedQuery<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface SingleStoreQueryResultHKT {
	readonly $brand: 'SingleStoreQueryResultHKT';
	readonly row: unknown;
	readonly type: unknown;
}

export type SingleStoreQueryResultKind<TKind extends SingleStoreQueryResultHKT, TRow> = (TKind & {
	readonly row: TRow;
})['type'];

export interface SingleStorePreparedQueryHKT {
	readonly $brand: 'SingleStorePreparedQueryHKT';
	readonly config: unknown;
	readonly type: unknown;
}

export interface SingleStorePreparedQueryConfig {
	execute: unknown;
	iterator: unknown;
}

export type PreparedQueryKind<
	TKind extends SingleStorePreparedQueryHKT,
	TConfig extends SingleStorePreparedQueryConfig,
	TAssume extends boolean = false,
> = Equal<TAssume, true> extends true
	? Assume<(TKind & { readonly config: TConfig })['type'], SingleStorePreparedQuery<TConfig>>
	: (TKind & { readonly config: TConfig })['type'];
