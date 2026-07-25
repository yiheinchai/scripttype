/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/pg-core/query-builders/delete.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ColumnsSelection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgPreparedQuery<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgQueryResultHKT<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgQueryResultKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgTable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PreparedQueryConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectResultFields<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectedFieldsFlat<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface PgDeleteBase<
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

export type AnyPgDeleteBase = PgDeleteBase<any, any, any, any, any, any>;

export type PgDeleteWithout<
	T extends AnyPgDeleteBase,
	TDynamic extends boolean,
	K extends keyof T & string,
> = TDynamic extends true ? T
	: Omit<
		PgDeleteBase<
			T['_']['table'],
			T['_']['queryResult'],
			T['_']['selectedFields'],
			T['_']['returning'],
			TDynamic,
			T['_']['excludedMethods'] | K
		>,
		T['_']['excludedMethods'] | K
	>;

export type PgDelete<
	TTable extends PgTable = PgTable,
	TQueryResult extends PgQueryResultHKT = PgQueryResultHKT,
	TSelectedFields extends ColumnsSelection | undefined = undefined,
	TReturning extends Record<string, unknown> | undefined = Record<string, unknown> | undefined,
> = PgDeleteBase<TTable, TQueryResult, TSelectedFields, TReturning, true, never>;

export type PgDeleteReturningAll<
	T extends AnyPgDeleteBase,
	TDynamic extends boolean,
> = PgDeleteWithout<
	PgDeleteBase<
		T['_']['table'],
		T['_']['queryResult'],
		T['_']['table']['_']['columns'],
		T['_']['table']['$inferSelect'],
		TDynamic,
		T['_']['excludedMethods']
	>,
	TDynamic,
	'returning'
>;

export type PgDeleteReturning<
	T extends AnyPgDeleteBase,
	TDynamic extends boolean,
	TSelectedFields extends SelectedFieldsFlat,
> = PgDeleteWithout<
	PgDeleteBase<
		T['_']['table'],
		T['_']['queryResult'],
		TSelectedFields,
		SelectResultFields<TSelectedFields>,
		TDynamic,
		T['_']['excludedMethods']
	>,
	TDynamic,
	'returning'
>;

export type PgDeletePrepare<T extends AnyPgDeleteBase> = PgPreparedQuery<
	PreparedQueryConfig & {
		execute: T['_']['returning'] extends undefined ? PgQueryResultKind<T['_']['queryResult'], never>
			: T['_']['returning'][];
	}
>;

export type PgDeleteDynamic<T extends AnyPgDeleteBase> = PgDelete<
	T['_']['table'],
	T['_']['queryResult'],
	T['_']['selectedFields'],
	T['_']['returning']
>;
