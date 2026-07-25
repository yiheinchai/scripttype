/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/sqlite-core/query-builders/insert.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnySQLiteColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DrizzleTypeError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IndexColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Placeholder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQL<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQLitePreparedQuery<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQLiteTable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQLiteUpdateSetSource<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectResultFields<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectedFieldsFlat<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Simplify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypedQueryBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SQLiteInsertValue<TTable extends SQLiteTable> = Simplify<
	{
		[Key in keyof TTable['$inferInsert']]: TTable['$inferInsert'][Key] | SQL | Placeholder;
	}
>;

export type SQLiteInsertSelectQueryBuilder<TTable extends SQLiteTable> = TypedQueryBuilder<
	{ [K in keyof TTable['$inferInsert']]: AnySQLiteColumn | SQL | SQL.Aliased | TTable['$inferInsert'][K] }
>;

export interface SQLiteInsertBase<
	TTable extends SQLiteTable,
	TResultType extends 'sync' | 'async',
	TRunResult,
	TReturning = undefined,
	TDynamic extends boolean = false,
	TExcludedMethods extends string = never,
> extends
	SQLWrapper,
	QueryPromise<TReturning extends undefined ? TRunResult : TReturning[]>,
	RunnableQuery<TReturning extends undefined ? TRunResult : TReturning[], 'sqlite'>
{
	readonly _: {
		readonly dialect: 'sqlite';
		readonly table: TTable;
		readonly resultType: TResultType;
		readonly runResult: TRunResult;
		readonly returning: TReturning;
		readonly dynamic: TDynamic;
		readonly excludedMethods: TExcludedMethods;
		readonly result: TReturning extends undefined ? TRunResult : TReturning[];
	};
}

export type AnySQLiteInsert = SQLiteInsertBase<any, any, any, any, any, any>;

export type SQLiteInsertWithout<T extends AnySQLiteInsert, TDynamic extends boolean, K extends keyof T & string> =
	TDynamic extends true ? T
		: Omit<
			SQLiteInsertBase<
				T['_']['table'],
				T['_']['resultType'],
				T['_']['runResult'],
				T['_']['returning'],
				TDynamic,
				T['_']['excludedMethods'] | K
			>,
			T['_']['excludedMethods'] | K
		>;

export type SQLiteInsertReturning<
	T extends AnySQLiteInsert,
	TDynamic extends boolean,
	TSelectedFields extends SelectedFieldsFlat,
> = SQLiteInsertWithout<
	SQLiteInsertBase<
		T['_']['table'],
		T['_']['resultType'],
		T['_']['runResult'],
		SelectResultFields<TSelectedFields>,
		TDynamic,
		T['_']['excludedMethods']
	>,
	TDynamic,
	'returning'
>;

export type SQLiteInsertReturningAll<
	T extends AnySQLiteInsert,
	TDynamic extends boolean,
> = SQLiteInsertWithout<
	SQLiteInsertBase<
		T['_']['table'],
		T['_']['resultType'],
		T['_']['runResult'],
		T['_']['table']['$inferSelect'],
		TDynamic,
		T['_']['excludedMethods']
	>,
	TDynamic,
	'returning'
>;

export type SQLiteInsertOnConflictDoUpdateConfig<T extends AnySQLiteInsert> = {
	target: IndexColumn | IndexColumn[];
	/** @deprecated - use either `targetWhere` or `setWhere` */
	where?: SQL;
	// TODO: add tests for targetWhere and setWhere
	targetWhere?: SQL;
	setWhere?: SQL;
	set: SQLiteUpdateSetSource<T['_']['table']>;
};

export type SQLiteInsert<
	TTable extends SQLiteTable = SQLiteTable,
	TResultType extends 'sync' | 'async' = 'sync' | 'async',
	TRunResult = unknown,
	TReturning = any,
> = SQLiteInsertBase<TTable, TResultType, TRunResult, TReturning, true, never>;

export type SQLiteInsertDynamic<T extends AnySQLiteInsert> = SQLiteInsert<
	T['_']['table'],
	T['_']['resultType'],
	T['_']['runResult'],
	T['_']['returning']
>;

export type SQLiteInsertExecute<T extends AnySQLiteInsert> = T['_']['returning'] extends undefined ? T['_']['runResult']
	: T['_']['returning'][];

export type SQLiteInsertPrepare<T extends AnySQLiteInsert> = SQLitePreparedQuery<
	{
		type: T['_']['resultType'];
		run: T['_']['runResult'];
		all: T['_']['returning'] extends undefined ? DrizzleTypeError<'.all() cannot be used without .returning()'>
			: T['_']['returning'][];
		get: T['_']['returning'] extends undefined ? DrizzleTypeError<'.get() cannot be used without .returning()'>
			: T['_']['returning'];
		values: T['_']['returning'] extends undefined ? DrizzleTypeError<'.values() cannot be used without .returning()'>
			: any[][];
		execute: SQLiteInsertExecute<T>;
	}
>;
