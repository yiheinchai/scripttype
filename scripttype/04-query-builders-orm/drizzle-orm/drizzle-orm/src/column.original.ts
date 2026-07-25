/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/column.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ColumnBuilderRuntimeConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ColumnDataType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GeneratedColumnConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Update<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface ColumnBaseConfig<
	TDataType extends ColumnDataType,
	TColumnType extends string,
> extends ColumnBuilderBaseConfig<TDataType, TColumnType> {
	tableName: string;
	notNull: boolean;
	hasDefault: boolean;
	isPrimaryKey: boolean;
	isAutoincrement: boolean;
	hasRuntimeDefault: boolean;
}

export type ColumnTypeConfig<T extends ColumnBaseConfig<ColumnDataType, string>, TTypeConfig extends object> = T & {
	brand: 'Column';
	tableName: T['tableName'];
	name: T['name'];
	dataType: T['dataType'];
	columnType: T['columnType'];
	data: T['data'];
	driverParam: T['driverParam'];
	notNull: T['notNull'];
	hasDefault: T['hasDefault'];
	isPrimaryKey: T['isPrimaryKey'];
	isAutoincrement: T['isAutoincrement'];
	hasRuntimeDefault: T['hasRuntimeDefault'];
	enumValues: T['enumValues'];
	baseColumn: T extends { baseColumn: infer U } ? U : unknown;
	generated: GeneratedColumnConfig<T['data']> | undefined;
	identity: undefined | 'always' | 'byDefault';
} & TTypeConfig;

export type ColumnRuntimeConfig<TData, TRuntimeConfig extends object> = ColumnBuilderRuntimeConfig<
	TData,
	TRuntimeConfig
>;

export type UpdateColConfig<
	T extends ColumnBaseConfig<ColumnDataType, string>,
	TUpdate extends Partial<ColumnBaseConfig<ColumnDataType, string>>,
> = Update<T, TUpdate>;

export interface Column<
	T extends ColumnBaseConfig<ColumnDataType, string> = ColumnBaseConfig<ColumnDataType, string>,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	TRuntimeConfig extends object = object,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	TTypeConfig extends object = object,
> extends DriverValueMapper<T['data'], T['driverParam']>, SQLWrapper {
	// SQLWrapper runtime implementation is defined in 'sql/sql.ts'
}

export type AnyColumn<TPartial extends Partial<ColumnBaseConfig<ColumnDataType, string>> = {}> = Column<
	Required<Update<ColumnBaseConfig<ColumnDataType, string>, TPartial>>
>;

export type GetColumnData<TColumn extends Column, TInferMode extends 'query' | 'raw' = 'query'> =
	// dprint-ignore
	TInferMode extends 'raw' // Raw mode
		? TColumn['_']['data'] // Just return the underlying type
		: TColumn['_']['notNull'] extends true // Query mode
		? TColumn['_']['data'] // Query mode, not null
		: TColumn['_']['data'] | null;

export type InferColumnsDataTypes<TColumns extends Record<string, Column>> = {
	[Key in keyof TColumns]: GetColumnData<TColumns[Key], 'query'>;
};
