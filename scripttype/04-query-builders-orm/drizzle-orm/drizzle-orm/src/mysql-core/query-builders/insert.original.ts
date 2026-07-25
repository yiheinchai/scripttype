/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/mysql-core/query-builders/insert.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyMySqlColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyMySqlQueryResultHKT<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferModelFromColumns<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlPreparedQueryConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlQueryResultHKT<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlQueryResultKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlTable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlUpdateSetSource<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Placeholder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PreparedQueryHKTBase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PreparedQueryKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQL<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypedQueryBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type MySqlInsertValue<TTable extends MySqlTable> =
	& {
		[Key in keyof TTable['$inferInsert']]: TTable['$inferInsert'][Key] | SQL | Placeholder;
	}
	& {};

export type MySqlInsertSelectQueryBuilder<TTable extends MySqlTable> = TypedQueryBuilder<
	{ [K in keyof TTable['$inferInsert']]: AnyMySqlColumn | SQL | SQL.Aliased | TTable['$inferInsert'][K] }
>;

export interface MySqlInsertBase<
	TTable extends MySqlTable,
	TQueryResult extends MySqlQueryResultHKT,
	TPreparedQueryHKT extends PreparedQueryHKTBase,
	TReturning extends Record<string, unknown> | undefined = undefined,
	TDynamic extends boolean = false,
	TExcludedMethods extends string = never,
> extends
	QueryPromise<TReturning extends undefined ? MySqlQueryResultKind<TQueryResult, never> : TReturning[]>,
	RunnableQuery<TReturning extends undefined ? MySqlQueryResultKind<TQueryResult, never> : TReturning[], 'mysql'>,
	SQLWrapper
{
	readonly _: {
		readonly dialect: 'mysql';
		readonly table: TTable;
		readonly queryResult: TQueryResult;
		readonly preparedQueryHKT: TPreparedQueryHKT;
		readonly dynamic: TDynamic;
		readonly excludedMethods: TExcludedMethods;
		readonly returning: TReturning;
		readonly result: TReturning extends undefined ? MySqlQueryResultKind<TQueryResult, never> : TReturning[];
	};
}

export type AnyMySqlInsert = MySqlInsertBase<any, any, any, any, any, any>;

export type MySqlInsertWithout<T extends AnyMySqlInsert, TDynamic extends boolean, K extends keyof T & string> =
	TDynamic extends true ? T
		: Omit<
			MySqlInsertBase<
				T['_']['table'],
				T['_']['queryResult'],
				T['_']['preparedQueryHKT'],
				T['_']['returning'],
				TDynamic,
				T['_']['excludedMethods'] | '$returning'
			>,
			T['_']['excludedMethods'] | K
		>;

export type MySqlInsert<
	TTable extends MySqlTable = MySqlTable,
	TQueryResult extends MySqlQueryResultHKT = AnyMySqlQueryResultHKT,
	TPreparedQueryHKT extends PreparedQueryHKTBase = PreparedQueryHKTBase,
	TReturning extends Record<string, unknown> | undefined = Record<string, unknown> | undefined,
> = MySqlInsertBase<TTable, TQueryResult, TPreparedQueryHKT, TReturning, true, never>;

export type MySqlInsertDynamic<T extends AnyMySqlInsert> = MySqlInsert<
	T['_']['table'],
	T['_']['queryResult'],
	T['_']['preparedQueryHKT'],
	T['_']['returning']
>;

export type MySqlInsertPrepare<
	T extends AnyMySqlInsert,
	TReturning extends Record<string, unknown> | undefined = undefined,
> = PreparedQueryKind<
	T['_']['preparedQueryHKT'],
	MySqlPreparedQueryConfig & {
		execute: TReturning extends undefined ? MySqlQueryResultKind<T['_']['queryResult'], never> : TReturning[];
		iterator: never;
	},
	true
>;

export type MySqlInsertOnDuplicateKeyUpdateConfig<T extends AnyMySqlInsert> = {
	set: MySqlUpdateSetSource<T['_']['table']>;
};

export type PrimaryKeyKeys<T extends Record<string, AnyMySqlColumn>> = {
	[K in keyof T]: T[K]['_']['isPrimaryKey'] extends true ? T[K]['_']['isAutoincrement'] extends true ? K
		: T[K]['_']['hasRuntimeDefault'] extends true ? T[K]['_']['isPrimaryKey'] extends true ? K : never
		: never
		: T[K]['_']['hasRuntimeDefault'] extends true ? T[K]['_']['isPrimaryKey'] extends true ? K : never
		: never;
}[keyof T];

export type GetPrimarySerialOrDefaultKeys<T extends Record<string, AnyMySqlColumn>> = {
	[K in PrimaryKeyKeys<T>]: T[K];
};

export type MySqlInsertReturning<
	T extends AnyMySqlInsert,
	TDynamic extends boolean,
> = MySqlInsertBase<
	T['_']['table'],
	T['_']['queryResult'],
	T['_']['preparedQueryHKT'],
	InferModelFromColumns<GetPrimarySerialOrDefaultKeys<T['_']['table']['_']['columns']>>,
	TDynamic,
	T['_']['excludedMethods'] | '$returning'
>;
