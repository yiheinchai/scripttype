/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/singlestore-core/query-builders/insert.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnySingleStoreColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnySingleStoreQueryResultHKT<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferModelFromColumns<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Placeholder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PreparedQueryHKTBase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PreparedQueryKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQL<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStorePreparedQueryConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStoreQueryResultHKT<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStoreQueryResultKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStoreTable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStoreUpdateSetSource<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SingleStoreInsertValue<TTable extends SingleStoreTable> =
	& {
		[Key in keyof TTable['$inferInsert']]: TTable['$inferInsert'][Key] | SQL | Placeholder;
	}
	& {};

export interface SingleStoreInsertBase<
	TTable extends SingleStoreTable,
	TQueryResult extends SingleStoreQueryResultHKT,
	TPreparedQueryHKT extends PreparedQueryHKTBase,
	TReturning extends Record<string, unknown> | undefined = undefined,
	TDynamic extends boolean = false,
	TExcludedMethods extends string = never,
> extends
	QueryPromise<TReturning extends undefined ? SingleStoreQueryResultKind<TQueryResult, never> : TReturning[]>,
	RunnableQuery<
		TReturning extends undefined ? SingleStoreQueryResultKind<TQueryResult, never> : TReturning[],
		'singlestore'
	>,
	SQLWrapper
{
	readonly _: {
		readonly dialect: 'singlestore';
		readonly table: TTable;
		readonly queryResult: TQueryResult;
		readonly preparedQueryHKT: TPreparedQueryHKT;
		readonly dynamic: TDynamic;
		readonly excludedMethods: TExcludedMethods;
		readonly returning: TReturning;
		readonly result: TReturning extends undefined ? SingleStoreQueryResultKind<TQueryResult, never> : TReturning[];
	};
}

export type AnySingleStoreInsert = SingleStoreInsertBase<any, any, any, any, any, any>;

export type SingleStoreInsertWithout<
	T extends AnySingleStoreInsert,
	TDynamic extends boolean,
	K extends keyof T & string,
> = TDynamic extends true ? T
	: Omit<
		SingleStoreInsertBase<
			T['_']['table'],
			T['_']['queryResult'],
			T['_']['preparedQueryHKT'],
			T['_']['returning'],
			TDynamic,
			T['_']['excludedMethods'] | '$returning'
		>,
		T['_']['excludedMethods'] | K
	>;

export type SingleStoreInsert<
	TTable extends SingleStoreTable = SingleStoreTable,
	TQueryResult extends SingleStoreQueryResultHKT = AnySingleStoreQueryResultHKT,
	TPreparedQueryHKT extends PreparedQueryHKTBase = PreparedQueryHKTBase,
	TReturning extends Record<string, unknown> | undefined = Record<string, unknown> | undefined,
> = SingleStoreInsertBase<TTable, TQueryResult, TPreparedQueryHKT, TReturning, true, never>;

export type SingleStoreInsertDynamic<T extends AnySingleStoreInsert> = SingleStoreInsert<
	T['_']['table'],
	T['_']['queryResult'],
	T['_']['preparedQueryHKT'],
	T['_']['returning']
>;

export type SingleStoreInsertPrepare<
	T extends AnySingleStoreInsert,
	TReturning extends Record<string, unknown> | undefined = undefined,
> = PreparedQueryKind<
	T['_']['preparedQueryHKT'],
	SingleStorePreparedQueryConfig & {
		execute: TReturning extends undefined ? SingleStoreQueryResultKind<T['_']['queryResult'], never> : TReturning[];
		iterator: never;
	},
	true
>;

export type SingleStoreInsertOnDuplicateKeyUpdateConfig<T extends AnySingleStoreInsert> = {
	set: SingleStoreUpdateSetSource<T['_']['table']>;
};

export type PrimaryKeyKeys<T extends Record<string, AnySingleStoreColumn>> = {
	[K in keyof T]: T[K]['_']['isPrimaryKey'] extends true ? T[K]['_']['isAutoincrement'] extends true ? K
		: T[K]['_']['hasRuntimeDefault'] extends true ? T[K]['_']['isPrimaryKey'] extends true ? K : never
		: never
		: T[K]['_']['hasRuntimeDefault'] extends true ? T[K]['_']['isPrimaryKey'] extends true ? K : never
		: never;
}[keyof T];

export type GetPrimarySerialOrDefaultKeys<T extends Record<string, AnySingleStoreColumn>> = {
	[K in PrimaryKeyKeys<T>]: T[K];
};

export type SingleStoreInsertReturning<
	T extends AnySingleStoreInsert,
	TDynamic extends boolean,
> = SingleStoreInsertBase<
	T['_']['table'],
	T['_']['queryResult'],
	T['_']['preparedQueryHKT'],
	InferModelFromColumns<GetPrimarySerialOrDefaultKeys<T['_']['table']['_']['columns']>>,
	TDynamic,
	T['_']['excludedMethods'] | '$returning'
>;
