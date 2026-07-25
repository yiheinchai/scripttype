/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/pg-core/query-builders/update.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AppendToNullabilityMap<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AppendToResult<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Assume<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ColumnsSelection<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type DrizzleTypeError<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Equal<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type GetColumnData<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type GetSelectTableName<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type GetSelectTableSelection<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type JoinNullability<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type JoinType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Omit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PgColumn<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PgPreparedQuery<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PgQueryResultHKT<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PgQueryResultKind<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PgTable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PgViewBase<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PreparedQueryConfig<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SQL<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SelectMode<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SelectResult<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SelectedFields<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Simplify<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Subquery<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Table<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TableLikeHasEmptySelection<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type PgUpdateSetSource<TTable extends PgTable> =
	& {
		[Key in keyof TTable['$inferInsert']]?:
			| GetColumnData<TTable['_']['columns'][Key]>
			| SQL
			| PgColumn
			| undefined;
	}
	& {};

export type Join = {
	name: string | undefined;
	joinType: JoinType;
	table: PgTable | Subquery | PgViewBase | SQL;
};

export interface PgUpdateBase<
	TTable extends PgTable,
	TQueryResult extends PgQueryResultHKT,
	TFrom extends PgTable | Subquery | PgViewBase | SQL | undefined = undefined,
	TSelectedFields extends ColumnsSelection | undefined = undefined,
	TReturning extends Record<string, unknown> | undefined = undefined,
	TNullabilityMap extends Record<string, JoinNullability> = Record<TTable['_']['name'], 'not-null'>,
	TJoins extends Join[] = [],
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
		readonly joins: TJoins;
		readonly nullabilityMap: TNullabilityMap;
		readonly queryResult: TQueryResult;
		readonly from: TFrom;
		readonly selectedFields: TSelectedFields;
		readonly returning: TReturning;
		readonly dynamic: TDynamic;
		readonly excludedMethods: TExcludedMethods;
		readonly result: TReturning extends undefined ? PgQueryResultKind<TQueryResult, never> : TReturning[];
	};
}

export type AnyPgUpdate = PgUpdateBase<any, any, any, any, any, any, any, any, any>;

export type PgUpdateWithout<
	T extends AnyPgUpdate,
	TDynamic extends boolean,
	K extends keyof T & string,
> = TDynamic extends true ? T : Omit<
	PgUpdateBase<
		T['_']['table'],
		T['_']['queryResult'],
		T['_']['from'],
		T['_']['selectedFields'],
		T['_']['returning'],
		T['_']['nullabilityMap'],
		T['_']['joins'],
		TDynamic,
		T['_']['excludedMethods'] | K
	>,
	T['_']['excludedMethods'] | K
>;

export type PgUpdateWithJoins<
	T extends AnyPgUpdate,
	TDynamic extends boolean,
	TFrom extends PgTable | Subquery | PgViewBase | SQL,
> = TDynamic extends true ? T : Omit<
	PgUpdateBase<
		T['_']['table'],
		T['_']['queryResult'],
		TFrom,
		T['_']['selectedFields'],
		T['_']['returning'],
		AppendToNullabilityMap<T['_']['nullabilityMap'], GetSelectTableName<TFrom>, 'inner'>,
		[...T['_']['joins'], {
			name: GetSelectTableName<TFrom>;
			joinType: 'inner';
			table: TFrom;
		}],
		TDynamic,
		Exclude<T['_']['excludedMethods'] | 'from', 'leftJoin' | 'rightJoin' | 'innerJoin' | 'fullJoin'>
	>,
	Exclude<T['_']['excludedMethods'] | 'from', 'leftJoin' | 'rightJoin' | 'innerJoin' | 'fullJoin'>
>;

export type PgUpdateJoin<
	T extends AnyPgUpdate,
	TDynamic extends boolean,
	TJoinType extends JoinType,
	TJoinedTable extends PgTable | Subquery | PgViewBase | SQL,
> = TDynamic extends true ? T : PgUpdateBase<
	T['_']['table'],
	T['_']['queryResult'],
	T['_']['from'],
	T['_']['selectedFields'],
	T['_']['returning'],
	AppendToNullabilityMap<T['_']['nullabilityMap'], GetSelectTableName<TJoinedTable>, TJoinType>,
	[...T['_']['joins'], {
		name: GetSelectTableName<TJoinedTable>;
		joinType: TJoinType;
		table: TJoinedTable;
	}],
	TDynamic,
	T['_']['excludedMethods']
>;

export type PgUpdateJoinFn<
	T extends AnyPgUpdate,
	TDynamic extends boolean,
	TJoinType extends JoinType,
> = <
	TJoinedTable extends PgTable | Subquery | PgViewBase | SQL,
>(
	table: TableLikeHasEmptySelection<TJoinedTable> extends true ? DrizzleTypeError<
			"Cannot reference a data-modifying statement subquery if it doesn't contain a `returning` clause"
		>
		: TJoinedTable,
	on:
		| (
			(
				updateTable: T['_']['table']['_']['columns'],
				from: T['_']['from'] extends PgTable ? T['_']['from']['_']['columns']
					: T['_']['from'] extends Subquery | PgViewBase ? T['_']['from']['_']['selectedFields']
					: never,
			) => SQL | undefined
		)
		| SQL
		| undefined,
) => PgUpdateJoin<T, TDynamic, TJoinType, TJoinedTable>;

export type AccumulateToResult<
	T extends AnyPgUpdate,
	TSelectMode extends SelectMode,
	TJoins extends Join[],
	TSelectedFields extends ColumnsSelection,
> = TJoins extends [infer TJoin extends Join, ...infer TRest extends Join[]] ? AccumulateToResult<
		T,
		TSelectMode extends 'partial' ? TSelectMode : 'multiple',
		TRest,
		AppendToResult<
			T['_']['table']['_']['name'],
			TSelectedFields,
			TJoin['name'],
			TJoin['table'] extends Table ? TJoin['table']['_']['columns']
				: TJoin['table'] extends Subquery ? Assume<TJoin['table']['_']['selectedFields'], SelectedFields>
				: never,
			TSelectMode extends 'partial' ? TSelectMode : 'multiple'
		>
	>
	: TSelectedFields;

export type PgUpdateReturningAll<T extends AnyPgUpdate, TDynamic extends boolean> = PgUpdateWithout<
	PgUpdateBase<
		T['_']['table'],
		T['_']['queryResult'],
		T['_']['from'],
		Equal<T['_']['joins'], []> extends true ? T['_']['table']['_']['columns'] : Simplify<
			& Record<T['_']['table']['_']['name'], T['_']['table']['_']['columns']>
			& {
				[K in keyof T['_']['joins'] as T['_']['joins'][K]['table']['_']['name']]:
					T['_']['joins'][K]['table']['_']['columns'];
			}
		>,
		SelectResult<
			AccumulateToResult<
				T,
				'single',
				T['_']['joins'],
				GetSelectTableSelection<T['_']['table']>
			>,
			'partial',
			T['_']['nullabilityMap']
		>,
		T['_']['nullabilityMap'],
		T['_']['joins'],
		TDynamic,
		T['_']['excludedMethods']
	>,
	TDynamic,
	'returning'
>;

export type PgUpdateReturning<
	T extends AnyPgUpdate,
	TDynamic extends boolean,
	TSelectedFields extends SelectedFields,
> = PgUpdateWithout<
	PgUpdateBase<
		T['_']['table'],
		T['_']['queryResult'],
		T['_']['from'],
		TSelectedFields,
		SelectResult<
			AccumulateToResult<
				T,
				'partial',
				T['_']['joins'],
				TSelectedFields
			>,
			'partial',
			T['_']['nullabilityMap']
		>,
		T['_']['nullabilityMap'],
		T['_']['joins'],
		TDynamic,
		T['_']['excludedMethods']
	>,
	TDynamic,
	'returning'
>;

export type PgUpdatePrepare<T extends AnyPgUpdate> = PgPreparedQuery<
	PreparedQueryConfig & {
		execute: T['_']['returning'] extends undefined ? PgQueryResultKind<T['_']['queryResult'], never>
			: T['_']['returning'][];
	}
>;

export type PgUpdate<
	TTable extends PgTable = PgTable,
	TQueryResult extends PgQueryResultHKT = PgQueryResultHKT,
	TFrom extends PgTable | Subquery | PgViewBase | SQL | undefined = undefined,
	TSelectedFields extends ColumnsSelection | undefined = undefined,
	TReturning extends Record<string, unknown> | undefined = Record<string, unknown> | undefined,
	TNullabilityMap extends Record<string, JoinNullability> = Record<TTable['_']['name'], 'not-null'>,
	TJoins extends Join[] = [],
> = PgUpdateBase<TTable, TQueryResult, TFrom, TSelectedFields, TReturning, TNullabilityMap, TJoins, true, never>;

export type PgUpdateDynamic<T extends AnyPgUpdate> = PgUpdate<
	T['_']['table'],
	T['_']['queryResult'],
	T['_']['from'],
	T['_']['returning'],
	T['_']['nullabilityMap']
>;
