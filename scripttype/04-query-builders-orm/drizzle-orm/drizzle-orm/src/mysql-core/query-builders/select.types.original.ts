/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/mysql-core/query-builders/select.types.ts, for comparison with the ScriptType alongside.
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
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GetSelectTableName<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IndexConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type JoinNullability<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type JoinType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MapColumnsToTableAlias<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlPreparedQueryConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlSelectBase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlSelectQueryBuilderBase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlTable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlTableWithColumns<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlViewBase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlViewWithSelection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PreparedQueryHKTBase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PreparedQueryKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQL<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectMode<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectedFieldsBase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Subquery<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Table<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypedQueryBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UpdateTableConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ValidateShape<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type View<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type BuildAliasTable<TTable extends MySqlTable | View, TAlias extends string> = TTable extends Table
	? MySqlTableWithColumns<
		UpdateTableConfig<TTable['_']['config'], {
			name: TAlias;
			columns: MapColumnsToTableAlias<TTable['_']['columns'], TAlias, 'mysql'>;
		}>
	>
	: TTable extends View ? MySqlViewWithSelection<
			TAlias,
			TTable['_']['existing'],
			MapColumnsToTableAlias<TTable['_']['selectedFields'], TAlias, 'mysql'>
		>
	: never;

export type AnyMySqlSelectQueryBuilder = MySqlSelectQueryBuilderBase<any, any, any, any, any, any, any, any, any>;

export type MySqlJoinType = Exclude<JoinType, 'full'>;

export interface MySqlSelectHKTBase {
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

export type MySqlSelectKind<
	T extends MySqlSelectHKTBase,
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

export type MySqlSelectWithout<
	T extends AnyMySqlSelectQueryBuilder,
	TDynamic extends boolean,
	K extends keyof T & string,
	TResetExcluded extends boolean = false,
> = TDynamic extends true ? T : Omit<
	MySqlSelectKind<
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

export type SelectedFields = SelectedFieldsBase<MySqlColumn, MySqlTable>;

export type MySqlJoin<
	T extends AnyMySqlSelectQueryBuilder,
	TDynamic extends boolean,
	TJoinType extends MySqlJoinType,
	TJoinedTable extends MySqlTable | Subquery | MySqlViewBase | SQL,
	TJoinedName extends GetSelectTableName<TJoinedTable> = GetSelectTableName<TJoinedTable>,
> = T extends any ? MySqlSelectWithout<
		MySqlSelectKind<
			T['_']['hkt'],
			T['_']['tableName'],
			AppendToResult<
				T['_']['tableName'],
				T['_']['selection'],
				TJoinedName,
				TJoinedTable extends MySqlTable ? TJoinedTable['_']['columns']
					: TJoinedTable extends Subquery | View ? Assume<TJoinedTable['_']['selectedFields'], SelectedFields>
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

export type MySqlJoinFn<
	T extends AnyMySqlSelectQueryBuilder,
	TDynamic extends boolean,
	TJoinType extends MySqlJoinType,
	TIsLateral extends boolean,
> = <
	TJoinedTable extends (TIsLateral extends true ? Subquery | SQL : MySqlTable | Subquery | MySqlViewBase | SQL),
	TJoinedName extends GetSelectTableName<TJoinedTable> = GetSelectTableName<TJoinedTable>,
>(
	table: TJoinedTable,
	on: ((aliases: T['_']['selection']) => SQL | undefined) | SQL | undefined,
	onIndex?:
		| (TJoinedTable extends MySqlTable ? IndexConfig
			: 'Index hint configuration is allowed only for MySqlTable and not for subqueries or views')
		| undefined,
) => MySqlJoin<T, TDynamic, TJoinType, TJoinedTable, TJoinedName>;

export type MySqlCrossJoinFn<
	T extends AnyMySqlSelectQueryBuilder,
	TDynamic extends boolean,
	TIsLateral extends boolean,
> = <
	TJoinedTable extends (TIsLateral extends true ? Subquery | SQL : MySqlTable | Subquery | MySqlViewBase | SQL),
	TJoinedName extends GetSelectTableName<TJoinedTable> = GetSelectTableName<TJoinedTable>,
>(
	table: TJoinedTable,
	onIndex?:
		| (TJoinedTable extends MySqlTable ? IndexConfig
			: 'Index hint configuration is allowed only for MySqlTable and not for subqueries or views')
		| undefined,
) => MySqlJoin<T, TDynamic, 'cross', TJoinedTable, TJoinedName>;

export type AnyMySqlSelect = MySqlSelectBase<any, any, any, any, any, any, any, any>;

export type MySqlSelectPrepare<T extends AnyMySqlSelect> = PreparedQueryKind<
	T['_']['preparedQueryHKT'],
	MySqlPreparedQueryConfig & {
		execute: T['_']['result'];
		iterator: T['_']['result'][number];
	},
	true
>;

export type MySqlSelectDynamic<T extends AnyMySqlSelectQueryBuilder> = MySqlSelectKind<
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

export interface MySqlSelectQueryBuilderHKT extends MySqlSelectHKTBase {
	_type: MySqlSelectQueryBuilderBase<
		MySqlSelectQueryBuilderHKT,
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

export type CreateMySqlSelectFromBuilderMode<
	TBuilderMode extends 'db' | 'qb',
	TTableName extends string | undefined,
	TSelection extends ColumnsSelection,
	TSelectMode extends SelectMode,
	TPreparedQueryHKT extends PreparedQueryHKTBase,
> = TBuilderMode extends 'db' ? MySqlSelectBase<TTableName, TSelection, TSelectMode, TPreparedQueryHKT>
	: MySqlSelectQueryBuilderBase<MySqlSelectQueryBuilderHKT, TTableName, TSelection, TSelectMode, TPreparedQueryHKT>;

export type MySqlSelectQueryBuilder<
	THKT extends MySqlSelectHKTBase = MySqlSelectQueryBuilderHKT,
	TTableName extends string | undefined = string | undefined,
	TSelection extends ColumnsSelection = ColumnsSelection,
	TSelectMode extends SelectMode = SelectMode,
	TPreparedQueryHKT extends PreparedQueryHKTBase = PreparedQueryHKTBase,
	TNullabilityMap extends Record<string, JoinNullability> = Record<string, JoinNullability>,
	TResult extends any[] = unknown[],
	TSelectedFields extends ColumnsSelection = ColumnsSelection,
> = MySqlSelectQueryBuilderBase<
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

export interface MySqlSelectHKT extends MySqlSelectHKTBase {
	_type: MySqlSelectBase<
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

export interface MySqlSetOperatorInterface<
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
		readonly hkt: MySqlSelectHKT;
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

export type MySqlSetOperatorWithResult<TResult extends any[]> = MySqlSetOperatorInterface<
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

export type MySqlSelect<
	TTableName extends string | undefined = string | undefined,
	TSelection extends ColumnsSelection = Record<string, any>,
	TSelectMode extends SelectMode = SelectMode,
	TNullabilityMap extends Record<string, JoinNullability> = Record<string, JoinNullability>,
> = MySqlSelectBase<TTableName, TSelection, TSelectMode, PreparedQueryHKTBase, TNullabilityMap, true, never>;

export type MySqlSetOperatorExcludedMethods =
	| 'where'
	| 'having'
	| 'groupBy'
	| 'session'
	| 'leftJoin'
	| 'rightJoin'
	| 'innerJoin'
	| 'for';

export type MySqlSetOperator<
	TTableName extends string | undefined = string | undefined,
	TSelection extends ColumnsSelection = Record<string, any>,
	TSelectMode extends SelectMode = SelectMode,
	TPreparedQueryHKT extends PreparedQueryHKTBase = PreparedQueryHKTBase,
	TNullabilityMap extends Record<string, JoinNullability> = Record<string, JoinNullability>,
> = MySqlSelectBase<
	TTableName,
	TSelection,
	TSelectMode,
	TPreparedQueryHKT,
	TNullabilityMap,
	true,
	MySqlSetOperatorExcludedMethods
>;

export type SetOperatorRightSelect<
	TValue extends MySqlSetOperatorWithResult<TResult>,
	TResult extends any[],
> = TValue extends MySqlSetOperatorInterface<any, any, any, any, any, any, any, infer TValueResult, any>
	? ValidateShape<
		TValueResult[number],
		TResult[number],
		TypedQueryBuilder<any, TValueResult>
	>
	: TValue;

export type AnyMySqlSetOperatorInterface = MySqlSetOperatorInterface<any, any, any, any, any, any, any, any, any>;

export type SetOperatorRestSelect<
	TValue extends readonly MySqlSetOperatorWithResult<TResult>[],
	TResult extends any[],
> = TValue extends [infer First, ...infer Rest]
	? First extends MySqlSetOperatorInterface<any, any, any, any, any, any, any, infer TValueResult, any>
		? Rest extends AnyMySqlSetOperatorInterface[] ? [
				ValidateShape<TValueResult[number], TResult[number], TypedQueryBuilder<any, TValueResult>>,
				...SetOperatorRestSelect<Rest, TResult>,
			]
		: ValidateShape<TValueResult[number], TResult[number], TypedQueryBuilder<any, TValueResult>[]>
	: never
	: TValue;
