/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/gel-core/query-builders/insert.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyGelColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GelPreparedQuery<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GelQueryResultHKT<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GelQueryResultKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GelTable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferInsertModel<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Placeholder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PreparedQueryConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQL<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectResultFields<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectedFieldsFlat<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TableConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypedQueryBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type GelInsertValue<TTable extends GelTable<TableConfig>, OverrideT extends boolean = false> =
	& {
		[Key in keyof InferInsertModel<TTable, { dbColumnNames: false; override: OverrideT }>]:
			| InferInsertModel<TTable, { dbColumnNames: false; override: OverrideT }>[Key]
			| SQL
			| Placeholder;
	}
	& {};

export type GelInsertSelectQueryBuilder<TTable extends GelTable> = TypedQueryBuilder<
	{ [K in keyof TTable['$inferInsert']]: AnyGelColumn | SQL | SQL.Aliased | TTable['$inferInsert'][K] }
>;

export interface GelInsertBase<
	TTable extends GelTable,
	TQueryResult extends GelQueryResultHKT,
	TReturning extends Record<string, unknown> | undefined = undefined,
	TDynamic extends boolean = false,
	TExcludedMethods extends string = never,
> extends
	QueryPromise<TReturning extends undefined ? GelQueryResultKind<TQueryResult, never> : TReturning[]>,
	RunnableQuery<TReturning extends undefined ? GelQueryResultKind<TQueryResult, never> : TReturning[], 'gel'>,
	SQLWrapper
{
	readonly _: {
		readonly dialect: 'gel';
		readonly table: TTable;
		readonly queryResult: TQueryResult;
		readonly returning: TReturning;
		readonly dynamic: TDynamic;
		readonly excludedMethods: TExcludedMethods;
		readonly result: TReturning extends undefined ? GelQueryResultKind<TQueryResult, never> : TReturning[];
	};
}

export type AnyGelInsert = GelInsertBase<any, any, any, any, any>;

export type GelInsertWithout<T extends AnyGelInsert, TDynamic extends boolean, K extends keyof T & string> =
	TDynamic extends true ? T
		: Omit<
			GelInsertBase<
				T['_']['table'],
				T['_']['queryResult'],
				T['_']['returning'],
				TDynamic,
				T['_']['excludedMethods'] | K
			>,
			T['_']['excludedMethods'] | K
		>;

export type GelInsertReturning<
	T extends AnyGelInsert,
	TDynamic extends boolean,
	TSelectedFields extends SelectedFieldsFlat,
> = GelInsertBase<
	T['_']['table'],
	T['_']['queryResult'],
	SelectResultFields<TSelectedFields>,
	TDynamic,
	T['_']['excludedMethods']
>;

export type GelInsertReturningAll<T extends AnyGelInsert, TDynamic extends boolean> = GelInsertBase<
	T['_']['table'],
	T['_']['queryResult'],
	T['_']['table']['$inferSelect'],
	TDynamic,
	T['_']['excludedMethods']
>;

export type GelInsertPrepare<T extends AnyGelInsert> = GelPreparedQuery<
	PreparedQueryConfig & {
		execute: T['_']['returning'] extends undefined ? GelQueryResultKind<T['_']['queryResult'], never>
			: T['_']['returning'][];
	}
>;

export type GelInsert<
	TTable extends GelTable = GelTable,
	TQueryResult extends GelQueryResultHKT = GelQueryResultHKT,
	TReturning extends Record<string, unknown> | undefined = Record<string, unknown> | undefined,
> = GelInsertBase<TTable, TQueryResult, TReturning, true, never>;

export type GelInsertDynamic<T extends AnyGelInsert> = GelInsert<
	T['_']['table'],
	T['_']['queryResult'],
	T['_']['returning']
>;
