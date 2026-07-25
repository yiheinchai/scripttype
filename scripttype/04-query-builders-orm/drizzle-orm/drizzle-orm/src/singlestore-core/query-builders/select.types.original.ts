/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/singlestore-core/query-builders/select.types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AppendToNullabilityMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AppendToResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Assume<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BuildSubquerySelection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ColumnsSelection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GetSelectTableName<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type JoinNullability<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type JoinType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MapColumnsToTableAlias<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PreparedQueryHKTBase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PreparedQueryKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQL<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectMode<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectedFieldsBase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStoreColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStorePreparedQueryConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStoreSelectBase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStoreSelectQueryBuilderBase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStoreTable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStoreTableWithColumns<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Subquery<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Table<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypedQueryBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UpdateTableConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ValidateShape<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type View<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type BuildAliasTable<TTable extends SingleStoreTable | View, TAlias extends string> = TTable extends Table
	? SingleStoreTableWithColumns<
		UpdateTableConfig<TTable['_']['config'], {
			name: TAlias;
			columns: MapColumnsToTableAlias<TTable['_']['columns'], TAlias, 'singlestore'>;
		}>
	>
	/* : TTable extends View ? SingleStoreViewWithSelection<
			TAlias,
			TTable['_']['existing'],
			MapColumnsToTableAlias<TTable['_']['selectedFields'], TAlias, 'singlestore'>
		> */
	: never;

export type AnySingleStoreSelectQueryBuilder = SingleStoreSelectQueryBuilderBase<
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	any
>;

export interface SingleStoreSelectHKTBase {
	tableName: string | undefined;
	selection: unknown;
	selectMode: SelectMode;
	preparedQueryHKT: unknown;
	nullabilityMap: unknown;
	dynamic: boolean;
	excludedMethods: string;
	result: unknown;
	selectedFields: unknown;
	_type: unknown;
}

export type SingleStoreSelectKind<
	T extends SingleStoreSelectHKTBase,
	TTableName extends string | undefined,
	TSelection extends ColumnsSelection,
	TSelectMode extends SelectMode,
	TPreparedQueryHKT extends PreparedQueryHKTBase,
	TNullabilityMap extends Record<string, JoinNullability>,
	TDynamic extends boolean,
	TExcludedMethods extends string,
	TResult = SelectResult<TSelection, TSelectMode, TNullabilityMap>[],
	TSelectedFields = BuildSubquerySelection<TSelection, TNullabilityMap>,
> = (T & {
	tableName: TTableName;
	selection: TSelection;
	selectMode: TSelectMode;
	preparedQueryHKT: TPreparedQueryHKT;
	nullabilityMap: TNullabilityMap;
	dynamic: TDynamic;
	excludedMethods: TExcludedMethods;
	result: TResult;
	selectedFields: TSelectedFields;
})['_type'];

export type SingleStoreSelectWithout<
	T extends AnySingleStoreSelectQueryBuilder,
	TDynamic extends boolean,
	K extends keyof T & string,
	TResetExcluded extends boolean = false,
> = TDynamic extends true ? T : Omit<
	SingleStoreSelectKind<
		T['_']['hkt'],
		T['_']['tableName'],
		T['_']['selection'],
		T['_']['selectMode'],
		T['_']['preparedQueryHKT'],
		T['_']['nullabilityMap'],
		TDynamic,
		TResetExcluded extends true ? K : T['_']['excludedMethods'] | K,
		T['_']['result'],
		T['_']['selectedFields']
	>,
	TResetExcluded extends true ? K : T['_']['excludedMethods'] | K
>;

export type SelectedFields = SelectedFieldsBase<SingleStoreColumn, SingleStoreTable>;

export type SingleStoreJoin<
	T extends AnySingleStoreSelectQueryBuilder,
	TDynamic extends boolean,
	TJoinType extends JoinType,
	TJoinedTable extends SingleStoreTable | Subquery | SQL, // | SingleStoreViewBase
	TJoinedName extends GetSelectTableName<TJoinedTable> = GetSelectTableName<TJoinedTable>,
> = T extends any ? SingleStoreSelectWithout<
		SingleStoreSelectKind<
			T['_']['hkt'],
			T['_']['tableName'],
			AppendToResult<
				T['_']['tableName'],
				T['_']['selection'],
				TJoinedName,
				TJoinedTable extends SingleStoreTable ? TJoinedTable['_']['columns']
					: TJoinedTable extends Subquery ? Assume<TJoinedTable['_']['selectedFields'], SelectedFields>
					: never,
				T['_']['selectMode']
			>,
			T['_']['selectMode'] extends 'partial' ? T['_']['selectMode'] : 'multiple',
			T['_']['preparedQueryHKT'],
			AppendToNullabilityMap<T['_']['nullabilityMap'], TJoinedName, TJoinType>,
			TDynamic,
			T['_']['excludedMethods']
		>,
		TDynamic,
		T['_']['excludedMethods']
	>
	: never;

export type SingleStoreJoinFn<
	T extends AnySingleStoreSelectQueryBuilder,
	TDynamic extends boolean,
	TJoinType extends JoinType,
	TIsLateral extends boolean,
> = <
	TJoinedTable extends (TIsLateral extends true ? Subquery | SQL
		: SingleStoreTable | Subquery | SQL /* | SingleStoreViewBase */),
	TJoinedName extends GetSelectTableName<TJoinedTable> = GetSelectTableName<TJoinedTable>,
>(
	table: TJoinedTable,
	on: ((aliases: T['_']['selection']) => SQL | undefined) | SQL | undefined,
) => SingleStoreJoin<T, TDynamic, TJoinType, TJoinedTable, TJoinedName>;

export type SingleStoreCrossJoinFn<
	T extends AnySingleStoreSelectQueryBuilder,
	TDynamic extends boolean,
	TIsLateral extends boolean,
> = <
	TJoinedTable extends (TIsLateral extends true ? Subquery | SQL
		: SingleStoreTable | Subquery | SQL /* | SingleStoreViewBase */),
	TJoinedName extends GetSelectTableName<TJoinedTable> = GetSelectTableName<TJoinedTable>,
>(table: TJoinedTable) => SingleStoreJoin<T, TDynamic, 'cross', TJoinedTable, TJoinedName>;

export type AnySingleStoreSelect = SingleStoreSelectBase<any, any, any, any, any, any, any, any>;

export type SingleStoreSelectPrepare<T extends AnySingleStoreSelect> = PreparedQueryKind<
	T['_']['preparedQueryHKT'],
	SingleStorePreparedQueryConfig & {
		execute: T['_']['result'];
		iterator: T['_']['result'][number];
	},
	true
>;

export type SingleStoreSelectDynamic<T extends AnySingleStoreSelectQueryBuilder> = SingleStoreSelectKind<
	T['_']['hkt'],
	T['_']['tableName'],
	T['_']['selection'],
	T['_']['selectMode'],
	T['_']['preparedQueryHKT'],
	T['_']['nullabilityMap'],
	true,
	never,
	T['_']['result'],
	T['_']['selectedFields']
>;

export interface SingleStoreSelectQueryBuilderHKT extends SingleStoreSelectHKTBase {
	_type: SingleStoreSelectQueryBuilderBase<
		SingleStoreSelectQueryBuilderHKT,
		this['tableName'],
		Assume<this['selection'], ColumnsSelection>,
		this['selectMode'],
		Assume<this['preparedQueryHKT'], PreparedQueryHKTBase>,
		Assume<this['nullabilityMap'], Record<string, JoinNullability>>,
		this['dynamic'],
		this['excludedMethods'],
		Assume<this['result'], any[]>,
		Assume<this['selectedFields'], ColumnsSelection>
	>;
}

export type CreateSingleStoreSelectFromBuilderMode<
	TBuilderMode extends 'db' | 'qb',
	TTableName extends string | undefined,
	TSelection extends ColumnsSelection,
	TSelectMode extends SelectMode,
	TPreparedQueryHKT extends PreparedQueryHKTBase,
> = TBuilderMode extends 'db' ? SingleStoreSelectBase<TTableName, TSelection, TSelectMode, TPreparedQueryHKT>
	: SingleStoreSelectQueryBuilderBase<
		SingleStoreSelectQueryBuilderHKT,
		TTableName,
		TSelection,
		TSelectMode,
		TPreparedQueryHKT
	>;

export type SingleStoreSelectQueryBuilder<
	THKT extends SingleStoreSelectHKTBase = SingleStoreSelectQueryBuilderHKT,
	TTableName extends string | undefined = string | undefined,
	TSelection extends ColumnsSelection = ColumnsSelection,
	TSelectMode extends SelectMode = SelectMode,
	TPreparedQueryHKT extends PreparedQueryHKTBase = PreparedQueryHKTBase,
	TNullabilityMap extends Record<string, JoinNullability> = Record<string, JoinNullability>,
	TResult extends any[] = unknown[],
	TSelectedFields extends ColumnsSelection = ColumnsSelection,
> = SingleStoreSelectQueryBuilderBase<
	THKT,
	TTableName,
	TSelection,
	TSelectMode,
	TPreparedQueryHKT,
	TNullabilityMap,
	true,
	never,
	TResult,
	TSelectedFields
>;

export interface SingleStoreSelectHKT extends SingleStoreSelectHKTBase {
	_type: SingleStoreSelectBase<
		this['tableName'],
		Assume<this['selection'], ColumnsSelection>,
		this['selectMode'],
		Assume<this['preparedQueryHKT'], PreparedQueryHKTBase>,
		Assume<this['nullabilityMap'], Record<string, JoinNullability>>,
		this['dynamic'],
		this['excludedMethods'],
		Assume<this['result'], any[]>,
		Assume<this['selectedFields'], ColumnsSelection>
	>;
}

export interface SingleStoreSetOperatorInterface<
	TTableName extends string | undefined,
	TSelection extends ColumnsSelection,
	TSelectMode extends SelectMode,
	TPreparedQueryHKT extends PreparedQueryHKTBase = PreparedQueryHKTBase,
	TNullabilityMap extends Record<string, JoinNullability> = TTableName extends string ? Record<TTableName, 'not-null'>
		: {},
	TDynamic extends boolean = false,
	TExcludedMethods extends string = never,
	TResult extends any[] = SelectResult<TSelection, TSelectMode, TNullabilityMap>[],
	TSelectedFields extends ColumnsSelection = BuildSubquerySelection<TSelection, TNullabilityMap>,
> {
	_: {
		readonly hkt: SingleStoreSelectHKT;
		readonly tableName: TTableName;
		readonly selection: TSelection;
		readonly selectMode: TSelectMode;
		readonly preparedQueryHKT: TPreparedQueryHKT;
		readonly nullabilityMap: TNullabilityMap;
		readonly dynamic: TDynamic;
		readonly excludedMethods: TExcludedMethods;
		readonly result: TResult;
		readonly selectedFields: TSelectedFields;
	};
}

export type SingleStoreSetOperatorWithResult<TResult extends any[]> = SingleStoreSetOperatorInterface<
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	TResult,
	any
>;

export type SingleStoreSelect<
	TTableName extends string | undefined = string | undefined,
	TSelection extends ColumnsSelection = Record<string, any>,
	TSelectMode extends SelectMode = SelectMode,
	TNullabilityMap extends Record<string, JoinNullability> = Record<string, JoinNullability>,
> = SingleStoreSelectBase<TTableName, TSelection, TSelectMode, PreparedQueryHKTBase, TNullabilityMap, true, never>;

export type SingleStoreSetOperatorExcludedMethods =
	| 'where'
	| 'having'
	| 'groupBy'
	| 'session'
	| 'leftJoin'
	| 'rightJoin'
	| 'innerJoin'
	| 'fullJoin'
	| 'for';

export type SingleStoreSetOperator<
	TTableName extends string | undefined = string | undefined,
	TSelection extends ColumnsSelection = Record<string, any>,
	TSelectMode extends SelectMode = SelectMode,
	TPreparedQueryHKT extends PreparedQueryHKTBase = PreparedQueryHKTBase,
	TNullabilityMap extends Record<string, JoinNullability> = Record<string, JoinNullability>,
> = SingleStoreSelectBase<
	TTableName,
	TSelection,
	TSelectMode,
	TPreparedQueryHKT,
	TNullabilityMap,
	true,
	SingleStoreSetOperatorExcludedMethods
>;

export type SetOperatorRightSelect<
	TValue extends SingleStoreSetOperatorWithResult<TResult>,
	TResult extends any[],
> = TValue extends SingleStoreSetOperatorInterface<any, any, any, any, any, any, any, infer TValueResult, any>
	? ValidateShape<
		TValueResult[number],
		TResult[number],
		TypedQueryBuilder<any, TValueResult>
	>
	: TValue;

export type AnySingleStoreSetOperatorInterface = SingleStoreSetOperatorInterface<
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	any
>;

export type SetOperatorRestSelect<
	TValue extends readonly SingleStoreSetOperatorWithResult<TResult>[],
	TResult extends any[],
> = TValue extends [infer First, ...infer Rest]
	? First extends SingleStoreSetOperatorInterface<any, any, any, any, any, any, any, infer TValueResult, any>
		? Rest extends AnySingleStoreSetOperatorInterface[] ? [
				ValidateShape<TValueResult[number], TResult[number], TypedQueryBuilder<any, TValueResult>>,
				...SetOperatorRestSelect<Rest, TResult>,
			]
		: ValidateShape<TValueResult[number], TResult[number], TypedQueryBuilder<any, TValueResult>[]>
	: never
	: TValue;
