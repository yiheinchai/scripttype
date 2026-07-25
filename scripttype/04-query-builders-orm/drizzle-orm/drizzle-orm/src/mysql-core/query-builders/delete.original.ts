/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/mysql-core/query-builders/delete.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyMySqlQueryResultHKT<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlPreparedQueryConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlQueryResultHKT<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlQueryResultKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlTable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PreparedQueryHKTBase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PreparedQueryKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface MySqlDeleteBase<
	TTable extends MySqlTable,
	TQueryResult extends MySqlQueryResultHKT,
	TPreparedQueryHKT extends PreparedQueryHKTBase,
	TDynamic extends boolean = false,
	TExcludedMethods extends string = never,
> extends QueryPromise<MySqlQueryResultKind<TQueryResult, never>> {
	readonly _: {
		readonly table: TTable;
		readonly queryResult: TQueryResult;
		readonly preparedQueryHKT: TPreparedQueryHKT;
		readonly dynamic: TDynamic;
		readonly excludedMethods: TExcludedMethods;
	};
}

export type AnyMySqlDeleteBase = MySqlDeleteBase<any, any, any, any, any>;

export type MySqlDeleteWithout<
	T extends AnyMySqlDeleteBase,
	TDynamic extends boolean,
	K extends keyof T & string,
> = TDynamic extends true ? T
	: Omit<
		MySqlDeleteBase<
			T['_']['table'],
			T['_']['queryResult'],
			T['_']['preparedQueryHKT'],
			TDynamic,
			T['_']['excludedMethods'] | K
		>,
		T['_']['excludedMethods'] | K
	>;

export type MySqlDelete<
	TTable extends MySqlTable = MySqlTable,
	TQueryResult extends MySqlQueryResultHKT = AnyMySqlQueryResultHKT,
	TPreparedQueryHKT extends PreparedQueryHKTBase = PreparedQueryHKTBase,
> = MySqlDeleteBase<TTable, TQueryResult, TPreparedQueryHKT, true, never>;

export type MySqlDeletePrepare<T extends AnyMySqlDeleteBase> = PreparedQueryKind<
	T['_']['preparedQueryHKT'],
	MySqlPreparedQueryConfig & {
		execute: MySqlQueryResultKind<T['_']['queryResult'], never>;
		iterator: never;
	},
	true
>;

export type MySqlDeleteDynamic<T extends AnyMySqlDeleteBase> = MySqlDelete<
	T['_']['table'],
	T['_']['queryResult'],
	T['_']['preparedQueryHKT']
>;
