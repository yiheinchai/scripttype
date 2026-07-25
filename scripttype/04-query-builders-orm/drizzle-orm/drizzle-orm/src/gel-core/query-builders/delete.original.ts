/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/gel-core/query-builders/delete.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type GelPreparedQuery<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GelQueryResultHKT<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GelQueryResultKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GelTable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PreparedQueryConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectResultFields<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectedFieldsFlat<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface GelDeleteBase<
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
		dialect: 'gel';
		readonly table: TTable;
		readonly queryResult: TQueryResult;
		readonly returning: TReturning;
		readonly dynamic: TDynamic;
		readonly excludedMethods: TExcludedMethods;
		readonly result: TReturning extends undefined ? GelQueryResultKind<TQueryResult, never> : TReturning[];
	};
}

export type AnyGelDeleteBase = GelDeleteBase<any, any, any, any, any>;

export type GelDeleteWithout<
	T extends AnyGelDeleteBase,
	TDynamic extends boolean,
	K extends keyof T & string,
> = TDynamic extends true ? T
	: Omit<
		GelDeleteBase<
			T['_']['table'],
			T['_']['queryResult'],
			T['_']['returning'],
			TDynamic,
			T['_']['excludedMethods'] | K
		>,
		T['_']['excludedMethods'] | K
	>;

export type GelDelete<
	TTable extends GelTable = GelTable,
	TQueryResult extends GelQueryResultHKT = GelQueryResultHKT,
	TReturning extends Record<string, unknown> | undefined = Record<string, unknown> | undefined,
> = GelDeleteBase<TTable, TQueryResult, TReturning, true, never>;

export type GelDeleteReturningAll<
	T extends AnyGelDeleteBase,
	TDynamic extends boolean,
> = GelDeleteWithout<
	GelDeleteBase<
		T['_']['table'],
		T['_']['queryResult'],
		T['_']['table']['$inferSelect'],
		TDynamic,
		T['_']['excludedMethods']
	>,
	TDynamic,
	'returning'
>;

export type GelDeleteReturning<
	T extends AnyGelDeleteBase,
	TDynamic extends boolean,
	TSelectedFields extends SelectedFieldsFlat,
> = GelDeleteWithout<
	GelDeleteBase<
		T['_']['table'],
		T['_']['queryResult'],
		SelectResultFields<TSelectedFields>,
		TDynamic,
		T['_']['excludedMethods']
	>,
	TDynamic,
	'returning'
>;

export type GelDeletePrepare<T extends AnyGelDeleteBase> = GelPreparedQuery<
	PreparedQueryConfig & {
		execute: T['_']['returning'] extends undefined ? GelQueryResultKind<T['_']['queryResult'], never>
			: T['_']['returning'][];
	}
>;

export type GelDeleteDynamic<T extends AnyGelDeleteBase> = GelDelete<
	T['_']['table'],
	T['_']['queryResult'],
	T['_']['returning']
>;
