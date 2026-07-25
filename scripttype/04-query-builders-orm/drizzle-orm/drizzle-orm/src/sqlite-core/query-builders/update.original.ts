/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/sqlite-core/query-builders/update.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DrizzleTypeError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GetColumnData<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQL<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQLiteColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQLitePreparedQuery<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQLiteTable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQLiteViewBase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectResultFields<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectedFields<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Subquery<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SQLiteUpdateSetSource<TTable extends SQLiteTable> =
	& {
		[Key in keyof TTable['$inferInsert']]?:
			| GetColumnData<TTable['_']['columns'][Key], 'query'>
			| SQL
			| SQLiteColumn
			| undefined;
	}
	& {};

export interface SQLiteUpdateBase<
	TTable extends SQLiteTable = SQLiteTable,
	TResultType extends 'sync' | 'async' = 'sync' | 'async',
	TRunResult = unknown,
	TFrom extends SQLiteTable | Subquery | SQLiteViewBase | SQL | undefined = undefined,
	TReturning = undefined,
	TDynamic extends boolean = false,
	TExcludedMethods extends string = never,
> extends SQLWrapper, QueryPromise<TReturning extends undefined ? TRunResult : TReturning[]> {
	readonly _: {
		readonly dialect: 'sqlite';
		readonly table: TTable;
		readonly resultType: TResultType;
		readonly runResult: TRunResult;
		readonly from: TFrom;
		readonly returning: TReturning;
		readonly dynamic: TDynamic;
		readonly excludedMethods: TExcludedMethods;
		readonly result: TReturning extends undefined ? TRunResult : TReturning[];
	};
}

export type AnySQLiteUpdate = SQLiteUpdateBase<any, any, any, any, any, any, any>;

export type SQLiteUpdateWithout<
	T extends AnySQLiteUpdate,
	TDynamic extends boolean,
	K extends keyof T & string,
> = TDynamic extends true ? T : Omit<
	SQLiteUpdateBase<
		T['_']['table'],
		T['_']['resultType'],
		T['_']['runResult'],
		T['_']['from'],
		T['_']['returning'],
		TDynamic,
		T['_']['excludedMethods'] | K
	>,
	T['_']['excludedMethods'] | K
>;

export type SQLiteUpdateWithJoins<
	T extends AnySQLiteUpdate,
	TDynamic extends boolean,
	TFrom extends SQLiteTable | Subquery | SQLiteViewBase | SQL,
> = TDynamic extends true ? T : Omit<
	SQLiteUpdateBase<
		T['_']['table'],
		T['_']['resultType'],
		T['_']['runResult'],
		TFrom,
		T['_']['returning'],
		TDynamic,
		Exclude<T['_']['excludedMethods'] | 'from', 'leftJoin' | 'rightJoin' | 'innerJoin' | 'fullJoin'>
	>,
	Exclude<T['_']['excludedMethods'] | 'from', 'leftJoin' | 'rightJoin' | 'innerJoin' | 'fullJoin'>
>;

export type SQLiteUpdateReturningAll<T extends AnySQLiteUpdate, TDynamic extends boolean> = SQLiteUpdateWithout<
	SQLiteUpdateBase<
		T['_']['table'],
		T['_']['resultType'],
		T['_']['runResult'],
		T['_']['from'],
		T['_']['table']['$inferSelect'],
		TDynamic,
		T['_']['excludedMethods']
	>,
	TDynamic,
	'returning'
>;

export type SQLiteUpdateReturning<
	T extends AnySQLiteUpdate,
	TDynamic extends boolean,
	TSelectedFields extends SelectedFields,
> = SQLiteUpdateWithout<
	SQLiteUpdateBase<
		T['_']['table'],
		T['_']['resultType'],
		T['_']['runResult'],
		T['_']['from'],
		SelectResultFields<TSelectedFields>,
		TDynamic,
		T['_']['excludedMethods']
	>,
	TDynamic,
	'returning'
>;

export type SQLiteUpdateExecute<T extends AnySQLiteUpdate> = T['_']['returning'] extends undefined ? T['_']['runResult']
	: T['_']['returning'][];

export type SQLiteUpdatePrepare<T extends AnySQLiteUpdate> = SQLitePreparedQuery<
	{
		type: T['_']['resultType'];
		run: T['_']['runResult'];
		all: T['_']['returning'] extends undefined ? DrizzleTypeError<'.all() cannot be used without .returning()'>
			: T['_']['returning'][];
		get: T['_']['returning'] extends undefined ? DrizzleTypeError<'.get() cannot be used without .returning()'>
			: T['_']['returning'];
		values: T['_']['returning'] extends undefined ? DrizzleTypeError<'.values() cannot be used without .returning()'>
			: any[][];
		execute: SQLiteUpdateExecute<T>;
	}
>;

export type SQLiteUpdateJoinFn<
	T extends AnySQLiteUpdate,
> = <
	TJoinedTable extends SQLiteTable | Subquery | SQLiteViewBase | SQL,
>(
	table: TJoinedTable,
	on:
		| (
			(
				updateTable: T['_']['table']['_']['columns'],
				from: T['_']['from'] extends SQLiteTable ? T['_']['from']['_']['columns']
					: T['_']['from'] extends Subquery | SQLiteViewBase ? T['_']['from']['_']['selectedFields']
					: never,
			) => SQL | undefined
		)
		| SQL
		| undefined,
) => T;

export type SQLiteUpdate<
	TTable extends SQLiteTable = SQLiteTable,
	TResultType extends 'sync' | 'async' = 'sync' | 'async',
	TRunResult = any,
	TFrom extends SQLiteTable | Subquery | SQLiteViewBase | SQL | undefined = undefined,
	TReturning extends Record<string, unknown> | undefined = Record<string, unknown> | undefined,
> = SQLiteUpdateBase<TTable, TResultType, TRunResult, TFrom, TReturning, true, never>;

export type SQLiteUpdateDynamic<T extends AnySQLiteUpdate> = SQLiteUpdate<
	T['_']['table'],
	T['_']['resultType'],
	T['_']['runResult'],
	T['_']['returning']
>;
