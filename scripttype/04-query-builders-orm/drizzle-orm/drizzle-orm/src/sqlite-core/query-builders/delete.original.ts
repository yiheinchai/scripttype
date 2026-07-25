/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/sqlite-core/query-builders/delete.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DrizzleTypeError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQLitePreparedQuery<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQLiteTable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectResultFields<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectedFieldsFlat<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface SQLiteDeleteBase<
	TTable extends SQLiteTable,
	TResultType extends 'sync' | 'async',
	TRunResult,
	TReturning extends Record<string, unknown> | undefined = undefined,
	TDynamic extends boolean = false,
	TExcludedMethods extends string = never,
> extends
	QueryPromise<TReturning extends undefined ? TRunResult : TReturning[]>,
	RunnableQuery<TReturning extends undefined ? TRunResult : TReturning[], 'sqlite'>,
	SQLWrapper
{
	readonly _: {
		dialect: 'sqlite';
		readonly table: TTable;
		readonly resultType: TResultType;
		readonly runResult: TRunResult;
		readonly returning: TReturning;
		readonly dynamic: TDynamic;
		readonly excludedMethods: TExcludedMethods;
		readonly result: TReturning extends undefined ? TRunResult : TReturning[];
	};
}

export type AnySQLiteDeleteBase = SQLiteDeleteBase<any, any, any, any, any, any>;

export type SQLiteDeleteWithout<
	T extends AnySQLiteDeleteBase,
	TDynamic extends boolean,
	K extends keyof T & string,
> = TDynamic extends true ? T
	: Omit<
		SQLiteDeleteBase<
			T['_']['table'],
			T['_']['resultType'],
			T['_']['runResult'],
			T['_']['returning'],
			TDynamic,
			T['_']['excludedMethods'] | K
		>,
		T['_']['excludedMethods'] | K
	>;

export type SQLiteDelete<
	TTable extends SQLiteTable = SQLiteTable,
	TResultType extends 'sync' | 'async' = 'sync' | 'async',
	TRunResult = unknown,
	TReturning extends Record<string, unknown> | undefined = undefined,
> = SQLiteDeleteBase<TTable, TResultType, TRunResult, TReturning, true, never>;

export type SQLiteDeleteReturningAll<
	T extends AnySQLiteDeleteBase,
	TDynamic extends boolean,
> = SQLiteDeleteWithout<
	SQLiteDeleteBase<
		T['_']['table'],
		T['_']['resultType'],
		T['_']['runResult'],
		T['_']['table']['$inferSelect'],
		T['_']['dynamic'],
		T['_']['excludedMethods']
	>,
	TDynamic,
	'returning'
>;

export type SQLiteDeleteReturning<
	T extends AnySQLiteDeleteBase,
	TDynamic extends boolean,
	TSelectedFields extends SelectedFieldsFlat,
> = SQLiteDeleteWithout<
	SQLiteDeleteBase<
		T['_']['table'],
		T['_']['resultType'],
		T['_']['runResult'],
		SelectResultFields<TSelectedFields>,
		T['_']['dynamic'],
		T['_']['excludedMethods']
	>,
	TDynamic,
	'returning'
>;

export type SQLiteDeleteExecute<T extends AnySQLiteDeleteBase> = T['_']['returning'] extends undefined
	? T['_']['runResult']
	: T['_']['returning'][];

export type SQLiteDeletePrepare<T extends AnySQLiteDeleteBase> = SQLitePreparedQuery<{
	type: T['_']['resultType'];
	run: T['_']['runResult'];
	all: T['_']['returning'] extends undefined ? DrizzleTypeError<'.all() cannot be used without .returning()'>
		: T['_']['returning'][];
	get: T['_']['returning'] extends undefined ? DrizzleTypeError<'.get() cannot be used without .returning()'>
		: T['_']['returning'] | undefined;
	values: T['_']['returning'] extends undefined ? DrizzleTypeError<'.values() cannot be used without .returning()'>
		: any[][];
	execute: SQLiteDeleteExecute<T>;
}>;

export type SQLiteDeleteDynamic<T extends AnySQLiteDeleteBase> = SQLiteDelete<
	T['_']['table'],
	T['_']['resultType'],
	T['_']['runResult'],
	T['_']['returning']
>;
