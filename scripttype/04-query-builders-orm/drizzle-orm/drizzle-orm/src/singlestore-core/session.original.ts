/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/singlestore-core/session.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Assume<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Equal<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SingleStorePreparedQuery<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
