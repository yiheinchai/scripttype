/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/gel-core/query-builders/select.types.ts, for comparison with the ScriptType alongside.
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
type BuildSubquerySelection<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ColumnsSelection<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type GelColumn<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type GelPreparedQuery<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type GelSelectBase<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type GelSelectQueryBuilderBase<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type GelTable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type GelTableWithColumns<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type GelViewBase<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type GelViewWithSelection<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type GetSelectTableName<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type JoinNullability<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type JoinType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MapColumnsToTableAlias<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Omit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PreparedQueryConfig<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SQL<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SelectMode<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SelectResult<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SelectedFieldsBase<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Subquery<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Table<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TypedQueryBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UpdateTableConfig<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ValidateShape<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type View<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type BuildAliasTable<TTable extends GelTable | View, TAlias extends string> = TTable extends Table
	? GelTableWithColumns<
		UpdateTableConfig<TTable['_']['config'], {
			name: TAlias;
			columns: MapColumnsToTableAlias<TTable['_']['columns'], TAlias, 'gel'>;
		}>
	>
	: TTable extends View ? GelViewWithSelection<
			TAlias,
			TTable['_']['existing'],
			MapColumnsToTableAlias<TTable['_']['selectedFields'], TAlias, 'gel'>
		>
	: never;

export type AnyGelSelectQueryBuilder = GelSelectQueryBuilderBase<any, any, any, any, any, any, any, any, any>;

export interface GelSelectHKTBase {
	tableName: string | undefined;
	selection: unknown;
	selectMode: SelectMode;
	nullabilityMap: unknown;
	dynamic: boolean;
	excludedMethods: string;
	result: unknown;
	selectedFields: unknown;
	_type: unknown;
}

export type GelSelectKind<
	T extends GelSelectHKTBase,
	TTableName extends string | undefined,
	TSelection extends ColumnsSelection,
	TSelectMode extends SelectMode,
	TNullabilityMap extends Record<string, JoinNullability>,
	TDynamic extends boolean,
	TExcludedMethods extends string,
	TResult = SelectResult<TSelection, TSelectMode, TNullabilityMap>[],
	TSelectedFields = BuildSubquerySelection<TSelection, TNullabilityMap>,
> = (T & {
	tableName: TTableName;
	selection: TSelection;
	selectMode: TSelectMode;
	nullabilityMap: TNullabilityMap;
	dynamic: TDynamic;
	excludedMethods: TExcludedMethods;
	result: TResult;
	selectedFields: TSelectedFields;
})['_type'];

export type GelSelectWithout<
	T extends AnyGelSelectQueryBuilder,
	TDynamic extends boolean,
	K extends keyof T & string,
	TResetExcluded extends boolean = false,
> = TDynamic extends true ? T : Omit<
	GelSelectKind<
		T['_']['hkt'],
		T['_']['tableName'],
		T['_']['selection'],
		T['_']['selectMode'],
		T['_']['nullabilityMap'],
		TDynamic,
		TResetExcluded extends true ? K : T['_']['excludedMethods'] | K,
		T['_']['result'],
		T['_']['selectedFields']
	>,
	TResetExcluded extends true ? K : T['_']['excludedMethods'] | K
>;

export type SelectedFields = SelectedFieldsBase<GelColumn, GelTable>;

export type GelSelectJoin<
	T extends AnyGelSelectQueryBuilder,
	TDynamic extends boolean,
	TJoinType extends JoinType,
	TJoinedTable extends GelTable | Subquery | GelViewBase | SQL,
	TJoinedName extends GetSelectTableName<TJoinedTable> = GetSelectTableName<TJoinedTable>,
> = T extends any ? GelSelectWithout<
		GelSelectKind<
			T['_']['hkt'],
			T['_']['tableName'],
			AppendToResult<
				T['_']['tableName'],
				T['_']['selection'],
				TJoinedName,
				TJoinedTable extends Table ? TJoinedTable['_']['columns']
					: TJoinedTable extends Subquery ? Assume<TJoinedTable['_']['selectedFields'], SelectedFields>
					: never,
				T['_']['selectMode']
			>,
			T['_']['selectMode'] extends 'partial' ? T['_']['selectMode'] : 'multiple',
			AppendToNullabilityMap<T['_']['nullabilityMap'], TJoinedName, TJoinType>,
			T['_']['dynamic'],
			T['_']['excludedMethods']
		>,
		TDynamic,
		T['_']['excludedMethods']
	>
	: never;

export type GelSelectJoinFn<
	T extends AnyGelSelectQueryBuilder,
	TDynamic extends boolean,
	TJoinType extends JoinType,
	TIsLateral extends boolean,
> = <
	TJoinedTable extends (TIsLateral extends true ? Subquery | SQL : GelTable | Subquery | GelViewBase | SQL),
	TJoinedName extends GetSelectTableName<TJoinedTable> = GetSelectTableName<TJoinedTable>,
>(
	table: TJoinedTable,
	on: ((aliases: T['_']['selection']) => SQL | undefined) | SQL | undefined,
) => GelSelectJoin<T, TDynamic, TJoinType, TJoinedTable, TJoinedName>;

export type GelSelectCrossJoinFn<
	T extends AnyGelSelectQueryBuilder,
	TDynamic extends boolean,
	TIsLateral extends boolean,
> = <
	TJoinedTable extends (TIsLateral extends true ? Subquery | SQL : GelTable | Subquery | GelViewBase | SQL),
	TJoinedName extends GetSelectTableName<TJoinedTable> = GetSelectTableName<TJoinedTable>,
>(table: TJoinedTable) => GelSelectJoin<T, TDynamic, 'cross', TJoinedTable, TJoinedName>;

export interface GelSelectQueryBuilderHKT extends GelSelectHKTBase {
	_type: GelSelectQueryBuilderBase<
		GelSelectQueryBuilderHKT,
		this['tableName'],
		Assume<this['selection'], ColumnsSelection>,
		this['selectMode'],
		Assume<this['nullabilityMap'], Record<string, JoinNullability>>,
		this['dynamic'],
		this['excludedMethods'],
		Assume<this['result'], any[]>,
		Assume<this['selectedFields'], ColumnsSelection>
	>;
}

export type CreateGelSelectFromBuilderMode<
	TBuilderMode extends 'db' | 'qb',
	TTableName extends string | undefined,
	TSelection extends ColumnsSelection,
	TSelectMode extends SelectMode,
> = TBuilderMode extends 'db' ? GelSelectBase<TTableName, TSelection, TSelectMode>
	: GelSelectQueryBuilderBase<GelSelectQueryBuilderHKT, TTableName, TSelection, TSelectMode>;

export type AnyGelSelect = GelSelectBase<any, any, any, any, any, any, any, any>;

export type GelSelectPrepare<T extends AnyGelSelect> = GelPreparedQuery<
	PreparedQueryConfig & {
		execute: T['_']['result'];
	}
>;

export type GelSelectDynamic<T extends AnyGelSelectQueryBuilder> = GelSelectKind<
	T['_']['hkt'],
	T['_']['tableName'],
	T['_']['selection'],
	T['_']['selectMode'],
	T['_']['nullabilityMap'],
	true,
	never,
	T['_']['result'],
	T['_']['selectedFields']
>;

export type GelSelectQueryBuilder<
	THKT extends GelSelectHKTBase = GelSelectQueryBuilderHKT,
	TTableName extends string | undefined = string | undefined,
	TSelection extends ColumnsSelection = ColumnsSelection,
	TSelectMode extends SelectMode = SelectMode,
	TNullabilityMap extends Record<string, JoinNullability> = Record<string, JoinNullability>,
	TResult extends any[] = unknown[],
	TSelectedFields extends ColumnsSelection = ColumnsSelection,
> = GelSelectQueryBuilderBase<
	THKT,
	TTableName,
	TSelection,
	TSelectMode,
	TNullabilityMap,
	true,
	never,
	TResult,
	TSelectedFields
>;

export interface GelSelectHKT extends GelSelectHKTBase {
	_type: GelSelectBase<
		this['tableName'],
		Assume<this['selection'], ColumnsSelection>,
		this['selectMode'],
		Assume<this['nullabilityMap'], Record<string, JoinNullability>>,
		this['dynamic'],
		this['excludedMethods'],
		Assume<this['result'], any[]>,
		Assume<this['selectedFields'], ColumnsSelection>
	>;
}

export interface GelSetOperatorInterface<
	TTableName extends string | undefined,
	TSelection extends ColumnsSelection,
	TSelectMode extends SelectMode,
	TNullabilityMap extends Record<string, JoinNullability> = TTableName extends string ? Record<TTableName, 'not-null'>
		: {},
	TDynamic extends boolean = false,
	TExcludedMethods extends string = never,
	TResult extends any[] = SelectResult<TSelection, TSelectMode, TNullabilityMap>[],
	TSelectedFields extends ColumnsSelection = BuildSubquerySelection<TSelection, TNullabilityMap>,
> {
	_: {
		readonly hkt: GelSelectHKT;
		readonly tableName: TTableName;
		readonly selection: TSelection;
		readonly selectMode: TSelectMode;
		readonly nullabilityMap: TNullabilityMap;
		readonly dynamic: TDynamic;
		readonly excludedMethods: TExcludedMethods;
		readonly result: TResult;
		readonly selectedFields: TSelectedFields;
	};
}

export type GelSetOperatorWithResult<TResult extends any[]> = GelSetOperatorInterface<
	any,
	any,
	any,
	any,
	any,
	any,
	TResult,
	any
>;

export type GelSelect<
	TTableName extends string | undefined = string | undefined,
	TSelection extends ColumnsSelection = Record<string, any>,
	TSelectMode extends SelectMode = SelectMode,
	TNullabilityMap extends Record<string, JoinNullability> = Record<string, JoinNullability>,
> = GelSelectBase<TTableName, TSelection, TSelectMode, TNullabilityMap, true, never>;

export type GelSetOperatorExcludedMethods =
	| 'leftJoin'
	| 'rightJoin'
	| 'innerJoin'
	| 'fullJoin'
	| 'where'
	| 'having'
	| 'groupBy'
	| 'for';

export type GelSetOperator<
	TTableName extends string | undefined = string | undefined,
	TSelection extends ColumnsSelection = Record<string, any>,
	TSelectMode extends SelectMode = SelectMode,
	TNullabilityMap extends Record<string, JoinNullability> = Record<string, JoinNullability>,
> = GelSelectBase<
	TTableName,
	TSelection,
	TSelectMode,
	TNullabilityMap,
	true,
	GelSetOperatorExcludedMethods
>;

export type SetOperatorRightSelect<
	TValue extends GelSetOperatorWithResult<TResult>,
	TResult extends any[],
> = TValue extends GelSetOperatorInterface<any, any, any, any, any, any, infer TValueResult, any> ? ValidateShape<
		TValueResult[number],
		TResult[number],
		TypedQueryBuilder<any, TValueResult>
	>
	: TValue;

export type AnyGelSetOperatorInterface = GelSetOperatorInterface<any, any, any, any, any, any, any, any>;

export type SetOperatorRestSelect<
	TValue extends readonly GelSetOperatorWithResult<TResult>[],
	TResult extends any[],
> = TValue extends [infer First, ...infer Rest]
	? First extends GelSetOperatorInterface<any, any, any, any, any, any, infer TValueResult, any>
		? Rest extends AnyGelSetOperatorInterface[] ? [
				ValidateShape<TValueResult[number], TResult[number], TypedQueryBuilder<any, TValueResult>>,
				...SetOperatorRestSelect<Rest, TResult>,
			]
		: ValidateShape<TValueResult[number], TResult[number], TypedQueryBuilder<any, TValueResult>[]>
	: never
	: TValue;
