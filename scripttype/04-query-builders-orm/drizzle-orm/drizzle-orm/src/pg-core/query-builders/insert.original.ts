/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/pg-core/query-builders/insert.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyPgColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ColumnsSelection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferInsertModel<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgPreparedQuery<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgQueryResultHKT<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgQueryResultKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgTable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Placeholder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PreparedQueryConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQL<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectResultFields<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectedFieldsFlat<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TableConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypedQueryBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PgInsertValue<TTable extends PgTable<TableConfig>, OverrideT extends boolean = false> =
	& {
		[Key in keyof InferInsertModel<TTable, { dbColumnNames: false; override: OverrideT }>]:
			| InferInsertModel<TTable, { dbColumnNames: false; override: OverrideT }>[Key]
			| SQL
			| Placeholder;
	}
	& {};

export type PgInsertSelectQueryBuilder<TTable extends PgTable> = TypedQueryBuilder<
	{ [K in keyof TTable['$inferInsert']]: AnyPgColumn | SQL | SQL.Aliased | TTable['$inferInsert'][K] }
>;

export interface PgInsertBase<
	TTable extends PgTable,
	TQueryResult extends PgQueryResultHKT,
	TSelectedFields extends ColumnsSelection | undefined = undefined,
	TReturning extends Record<string, unknown> | undefined = undefined,
	TDynamic extends boolean = false,
	TExcludedMethods extends string = never,
> extends
	TypedQueryBuilder<
		TSelectedFields,
		TReturning extends undefined ? PgQueryResultKind<TQueryResult, never> : TReturning[]
	>,
	QueryPromise<TReturning extends undefined ? PgQueryResultKind<TQueryResult, never> : TReturning[]>,
	RunnableQuery<TReturning extends undefined ? PgQueryResultKind<TQueryResult, never> : TReturning[], 'pg'>,
	SQLWrapper
{
	readonly _: {
		readonly dialect: 'pg';
		readonly table: TTable;
		readonly queryResult: TQueryResult;
		readonly selectedFields: TSelectedFields;
		readonly returning: TReturning;
		readonly dynamic: TDynamic;
		readonly excludedMethods: TExcludedMethods;
		readonly result: TReturning extends undefined ? PgQueryResultKind<TQueryResult, never> : TReturning[];
	};
}

export type AnyPgInsert = PgInsertBase<any, any, any, any, any, any>;

export type PgInsertWithout<T extends AnyPgInsert, TDynamic extends boolean, K extends keyof T & string> =
	TDynamic extends true ? T
		: Omit<
			PgInsertBase<
				T['_']['table'],
				T['_']['queryResult'],
				T['_']['selectedFields'],
				T['_']['returning'],
				TDynamic,
				T['_']['excludedMethods'] | K
			>,
			T['_']['excludedMethods'] | K
		>;

export type PgInsertReturning<
	T extends AnyPgInsert,
	TDynamic extends boolean,
	TSelectedFields extends SelectedFieldsFlat,
> = PgInsertBase<
	T['_']['table'],
	T['_']['queryResult'],
	TSelectedFields,
	SelectResultFields<TSelectedFields>,
	TDynamic,
	T['_']['excludedMethods']
>;

export type PgInsertReturningAll<T extends AnyPgInsert, TDynamic extends boolean> = PgInsertBase<
	T['_']['table'],
	T['_']['queryResult'],
	T['_']['table']['_']['columns'],
	T['_']['table']['$inferSelect'],
	TDynamic,
	T['_']['excludedMethods']
>;

export type PgInsertPrepare<T extends AnyPgInsert> = PgPreparedQuery<
	PreparedQueryConfig & {
		execute: T['_']['returning'] extends undefined ? PgQueryResultKind<T['_']['queryResult'], never>
			: T['_']['returning'][];
	}
>;

export type PgInsert<
	TTable extends PgTable = PgTable,
	TQueryResult extends PgQueryResultHKT = PgQueryResultHKT,
	TSelectedFields extends ColumnsSelection | undefined = ColumnsSelection | undefined,
	TReturning extends Record<string, unknown> | undefined = Record<string, unknown> | undefined,
> = PgInsertBase<TTable, TQueryResult, TSelectedFields, TReturning, true, never>;

export type PgInsertDynamic<T extends AnyPgInsert> = PgInsert<
	T['_']['table'],
	T['_']['queryResult'],
	T['_']['returning']
>;
