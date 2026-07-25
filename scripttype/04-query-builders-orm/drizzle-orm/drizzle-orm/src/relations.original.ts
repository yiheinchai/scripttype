/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/relations.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyColumn<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Assume<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Column<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Equal<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InferModelFromColumns<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type One<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Placeholder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Relation<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Relations<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReturnType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SQL<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Simplify<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Table<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ValueOrArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type createTableRelationsHelpers<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type getOperators<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type getOrderByOperators<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type TableRelationsKeysOnly<
	TSchema extends Record<string, unknown>,
	TTableName extends string,
	K extends keyof TSchema,
> = TSchema[K] extends Relations<TTableName> ? K : never;

export type ExtractObjectValues<T> = T[keyof T];

export type ExtractTableRelationsFromSchema<
	TSchema extends Record<string, unknown>,
	TTableName extends string,
> = ExtractObjectValues<
	{
		[
			K in keyof TSchema as TableRelationsKeysOnly<
				TSchema,
				TTableName,
				K
			>
		]: TSchema[K] extends Relations<TTableName, infer TConfig> ? TConfig : never;
	}
>;

export type ExtractRelationsFromTableExtraConfigSchema<
	TConfig extends unknown[],
> = ExtractObjectValues<
	{
		[
			K in keyof TConfig as TConfig[K] extends Relations<any> ? K
				: never
		]: TConfig[K] extends Relations<infer TRelationConfig> ? TRelationConfig
			: never;
	}
>;

export interface TableRelationalConfig {
	tsName: string;
	dbName: string;
	columns: Record<string, Column>;
	relations: Record<string, Relation>;
	primaryKey: AnyColumn[];
	schema?: string;
}

export type TablesRelationalConfig = Record<string, TableRelationalConfig>;

export type FindTableByDBName<
	TSchema extends TablesRelationalConfig,
	TTableName extends string,
> = ExtractObjectValues<
	{
		[
			K in keyof TSchema as TSchema[K]['dbName'] extends TTableName ? K
				: never
		]: TSchema[K];
	}
>;

export type Operators = ReturnType<typeof getOperators>;

export type OrderByOperators = ReturnType<typeof getOrderByOperators>;

export type DBQueryConfig<
	TRelationType extends 'one' | 'many' = 'one' | 'many',
	TIsRoot extends boolean = boolean,
	TSchema extends TablesRelationalConfig = TablesRelationalConfig,
	TTableConfig extends TableRelationalConfig = TableRelationalConfig,
> =
	& {
		columns?:
			| {
				[K in keyof TTableConfig['columns']]?: boolean;
			}
			| undefined;
		with?:
			| {
				[K in keyof TTableConfig['relations']]?:
					| true
					| DBQueryConfig<
						TTableConfig['relations'][K] extends One ? 'one' : 'many',
						false,
						TSchema,
						FindTableByDBName<
							TSchema,
							TTableConfig['relations'][K]['referencedTableName']
						>
					>
					| undefined;
			}
			| undefined;
		extras?:
			| Record<string, SQL.Aliased>
			| ((
				fields: Simplify<
					[TTableConfig['columns']] extends [never] ? {}
						: TTableConfig['columns']
				>,
				operators: { sql: Operators['sql'] },
			) => Record<string, SQL.Aliased>)
			| undefined;
	}
	& (TRelationType extends 'many' ?
			& {
				where?:
					| SQL
					| undefined
					| ((
						fields: Simplify<
							[TTableConfig['columns']] extends [never] ? {}
								: TTableConfig['columns']
						>,
						operators: Operators,
					) => SQL | undefined);
				orderBy?:
					| ValueOrArray<AnyColumn | SQL>
					| ((
						fields: Simplify<
							[TTableConfig['columns']] extends [never] ? {}
								: TTableConfig['columns']
						>,
						operators: OrderByOperators,
					) => ValueOrArray<AnyColumn | SQL>)
					| undefined;
				limit?: number | Placeholder | undefined;
			}
			& (TIsRoot extends true ? {
					offset?: number | Placeholder | undefined;
				}
				: {})
		: {});

export type ExtractTablesWithRelations<
	TSchema extends Record<string, unknown>,
> = {
	[
		K in keyof TSchema as TSchema[K] extends Table ? K
			: never
	]: TSchema[K] extends Table ? {
			tsName: K & string;
			dbName: TSchema[K]['_']['name'];
			columns: TSchema[K]['_']['columns'];
			relations: ExtractTableRelationsFromSchema<
				TSchema,
				TSchema[K]['_']['name']
			>;
			primaryKey: AnyColumn[];
		}
		: never;
};

export type ReturnTypeOrValue<T> = T extends (...args: any[]) => infer R ? R
	: T;

export type NonUndefinedKeysOnly<T> =
	& ExtractObjectValues<
		{
			[K in keyof T as T[K] extends undefined ? never : K]: K;
		}
	>
	& keyof T;

export type BuildQueryResult<
	TSchema extends TablesRelationalConfig,
	TTableConfig extends TableRelationalConfig,
	TFullSelection extends true | Record<string, unknown>,
> = Equal<TFullSelection, true> extends true ? InferModelFromColumns<TTableConfig['columns']>
	: TFullSelection extends Record<string, unknown> ? Simplify<
			& (TFullSelection['columns'] extends Record<string, unknown> ? InferModelFromColumns<
					{
						[
							K in Equal<
								Exclude<
									TFullSelection['columns'][
										& keyof TFullSelection['columns']
										& keyof TTableConfig['columns']
									],
									undefined
								>,
								false
							> extends true ? Exclude<
									keyof TTableConfig['columns'],
									NonUndefinedKeysOnly<TFullSelection['columns']>
								>
								:
									& {
										[K in keyof TFullSelection['columns']]: Equal<
											TFullSelection['columns'][K],
											true
										> extends true ? K
											: never;
									}[keyof TFullSelection['columns']]
									& keyof TTableConfig['columns']
						]: TTableConfig['columns'][K];
					}
				>
				: InferModelFromColumns<TTableConfig['columns']>)
			& (TFullSelection['extras'] extends
				| Record<string, unknown>
				| ((...args: any[]) => Record<string, unknown>) ? {
					[
						K in NonUndefinedKeysOnly<
							ReturnTypeOrValue<TFullSelection['extras']>
						>
					]: Assume<
						ReturnTypeOrValue<TFullSelection['extras']>[K],
						SQL.Aliased
					>['_']['type'];
				}
				: {})
			& (TFullSelection['with'] extends Record<string, unknown> ? BuildRelationResult<
					TSchema,
					TFullSelection['with'],
					TTableConfig['relations']
				>
				: {})
		>
	: never;

export type BuildRelationResult<
	TSchema extends TablesRelationalConfig,
	TInclude,
	TRelations extends Record<string, Relation>,
> = {
	[
		K in
			& NonUndefinedKeysOnly<TInclude>
			& keyof TRelations
	]: TRelations[K] extends infer TRel extends Relation ? BuildQueryResult<
			TSchema,
			FindTableByDBName<TSchema, TRel['referencedTableName']>,
			Assume<TInclude[K], true | Record<string, unknown>>
		> extends infer TResult ? TRel extends One ?
					| TResult
					| (Equal<TRel['isNullable'], false> extends true ? null : never)
			: TResult[]
		: never
		: never;
};

export type TableRelationsHelpers<TTableName extends string> = ReturnType<
	typeof createTableRelationsHelpers<TTableName>
>;
