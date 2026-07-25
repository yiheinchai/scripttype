/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/singlestore-core/query-builders/update.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnySingleStoreQueryResultHKT<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GetColumnData<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PreparedQueryHKTBase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PreparedQueryKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQL<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStorePreparedQueryConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStoreQueryResultHKT<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStoreQueryResultKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStoreTable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SingleStoreUpdateSetSource<TTable extends SingleStoreTable> =
	& {
		[Key in keyof TTable['$inferInsert']]?:
			| GetColumnData<TTable['_']['columns'][Key], 'query'>
			| SQL
			| undefined;
	}
	& {};

export interface SingleStoreUpdateBase<
	TTable extends SingleStoreTable,
	TQueryResult extends SingleStoreQueryResultHKT,
	TPreparedQueryHKT extends PreparedQueryHKTBase,
	TDynamic extends boolean = false,
	TExcludedMethods extends string = never,
> extends QueryPromise<SingleStoreQueryResultKind<TQueryResult, never>>, SQLWrapper {
	readonly _: {
		readonly table: TTable;
		readonly queryResult: TQueryResult;
		readonly preparedQueryHKT: TPreparedQueryHKT;
		readonly dynamic: TDynamic;
		readonly excludedMethods: TExcludedMethods;
	};
}

export type AnySingleStoreUpdateBase = SingleStoreUpdateBase<any, any, any, any, any>;

export type SingleStoreUpdateWithout<
	T extends AnySingleStoreUpdateBase,
	TDynamic extends boolean,
	K extends keyof T & string,
> = TDynamic extends true ? T : Omit<
	SingleStoreUpdateBase<
		T['_']['table'],
		T['_']['queryResult'],
		T['_']['preparedQueryHKT'],
		TDynamic,
		T['_']['excludedMethods'] | K
	>,
	T['_']['excludedMethods'] | K
>;

export type SingleStoreUpdatePrepare<T extends AnySingleStoreUpdateBase> = PreparedQueryKind<
	T['_']['preparedQueryHKT'],
	SingleStorePreparedQueryConfig & {
		execute: SingleStoreQueryResultKind<T['_']['queryResult'], never>;
		iterator: never;
	},
	true
>;

export type SingleStoreUpdate<
	TTable extends SingleStoreTable = SingleStoreTable,
	TQueryResult extends SingleStoreQueryResultHKT = AnySingleStoreQueryResultHKT,
	TPreparedQueryHKT extends PreparedQueryHKTBase = PreparedQueryHKTBase,
> = SingleStoreUpdateBase<TTable, TQueryResult, TPreparedQueryHKT, true, never>;

export type SingleStoreUpdateDynamic<T extends AnySingleStoreUpdateBase> = SingleStoreUpdate<
	T['_']['table'],
	T['_']['queryResult'],
	T['_']['preparedQueryHKT']
>;
