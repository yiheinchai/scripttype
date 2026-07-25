/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/singlestore-core/query-builders/delete.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnySingleStoreQueryResultHKT<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PreparedQueryHKTBase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PreparedQueryKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStorePreparedQueryConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStoreQueryResultHKT<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStoreQueryResultKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStoreTable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface SingleStoreDeleteBase<
	TTable extends SingleStoreTable,
	TQueryResult extends SingleStoreQueryResultHKT,
	TPreparedQueryHKT extends PreparedQueryHKTBase,
	TDynamic extends boolean = false,
	TExcludedMethods extends string = never,
> extends QueryPromise<SingleStoreQueryResultKind<TQueryResult, never>> {
	readonly _: {
		readonly table: TTable;
		readonly queryResult: TQueryResult;
		readonly preparedQueryHKT: TPreparedQueryHKT;
		readonly dynamic: TDynamic;
		readonly excludedMethods: TExcludedMethods;
	};
}

export type AnySingleStoreDeleteBase = SingleStoreDeleteBase<any, any, any, any, any>;

export type SingleStoreDeleteWithout<
	T extends AnySingleStoreDeleteBase,
	TDynamic extends boolean,
	K extends keyof T & string,
> = TDynamic extends true ? T
	: Omit<
		SingleStoreDeleteBase<
			T['_']['table'],
			T['_']['queryResult'],
			T['_']['preparedQueryHKT'],
			TDynamic,
			T['_']['excludedMethods'] | K
		>,
		T['_']['excludedMethods'] | K
	>;

export type SingleStoreDelete<
	TTable extends SingleStoreTable = SingleStoreTable,
	TQueryResult extends SingleStoreQueryResultHKT = AnySingleStoreQueryResultHKT,
	TPreparedQueryHKT extends PreparedQueryHKTBase = PreparedQueryHKTBase,
> = SingleStoreDeleteBase<TTable, TQueryResult, TPreparedQueryHKT, true, never>;

export type SingleStoreDeletePrepare<T extends AnySingleStoreDeleteBase> = PreparedQueryKind<
	T['_']['preparedQueryHKT'],
	SingleStorePreparedQueryConfig & {
		execute: SingleStoreQueryResultKind<T['_']['queryResult'], never>;
		iterator: never;
	},
	true
>;

export type SingleStoreDeleteDynamic<T extends AnySingleStoreDeleteBase> = SingleStoreDelete<
	T['_']['table'],
	T['_']['queryResult'],
	T['_']['preparedQueryHKT']
>;
