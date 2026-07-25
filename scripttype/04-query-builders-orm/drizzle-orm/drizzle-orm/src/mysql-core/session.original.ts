/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/mysql-core/session.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Assume<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Equal<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlPreparedQuery<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface MySqlQueryResultHKT {
	readonly $brand: 'MySqlQueryResultHKT';
	readonly row: unknown;
	readonly type: unknown;
}

export type MySqlQueryResultKind<TKind extends MySqlQueryResultHKT, TRow> = (TKind & {
	readonly row: TRow;
})['type'];

export interface MySqlPreparedQueryHKT {
	readonly $brand: 'MySqlPreparedQueryHKT';
	readonly config: unknown;
	readonly type: unknown;
}

export interface MySqlPreparedQueryConfig {
	execute: unknown;
	iterator: unknown;
}

export type PreparedQueryKind<
	TKind extends MySqlPreparedQueryHKT,
	TConfig extends MySqlPreparedQueryConfig,
	TAssume extends boolean = false,
> = Equal<TAssume, true> extends true
	? Assume<(TKind & { readonly config: TConfig })['type'], MySqlPreparedQuery<TConfig>>
	: (TKind & { readonly config: TConfig })['type'];
