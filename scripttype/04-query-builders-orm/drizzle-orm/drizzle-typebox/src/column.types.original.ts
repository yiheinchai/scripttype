/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-typebox/src/column.types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Assume<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Buffer<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BufferSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Column<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsEnumDefined<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type JsonSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type t<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type HasBaseColumn<TColumn> = TColumn extends { _: { baseColumn: Column | undefined } }
	? IsNever<TColumn['_']['baseColumn']> extends false ? true
	: false
	: false;

export type EnumValuesToEnum<TEnumValues extends [string, ...string[]]> = { [K in TEnumValues[number]]: K };

export type GetTypeboxPrimitiveType<TData> = TData extends number ? t.TNumber
	: TData extends bigint ? t.TBigInt
	: TData extends boolean ? t.TBoolean
	: TData extends string ? t.TString
	: t.TAny;

export interface GenericSchema<T> extends t.TSchema {
	static: T;
}

export type GetTypeboxType<
	TColumn extends Column,
> = TColumn['_']['columnType'] extends
	| 'MySqlTinyInt'
	| 'SingleStoreTinyInt'
	| 'PgSmallInt'
	| 'PgSmallSerial'
	| 'MySqlSmallInt'
	| 'MySqlMediumInt'
	| 'SingleStoreSmallInt'
	| 'SingleStoreMediumInt'
	| 'PgInteger'
	| 'PgSerial'
	| 'MySqlInt'
	| 'SingleStoreInt'
	| 'PgBigInt53'
	| 'PgBigSerial53'
	| 'MySqlBigInt53'
	| 'MySqlSerial'
	| 'SingleStoreBigInt53'
	| 'SingleStoreSerial'
	| 'SQLiteInteger'
	| 'MySqlYear'
	| 'SingleStoreYear' ? t.TInteger
	: TColumn['_']['columnType'] extends 'PgBinaryVector' ? t.TRegExp
	: HasBaseColumn<TColumn> extends true ? t.TArray<
			GetTypeboxType<Assume<TColumn['_']['baseColumn'], Column>>
		>
	: IsEnumDefined<TColumn['_']['enumValues']> extends true
		? t.TEnum<{ [K in Assume<TColumn['_']['enumValues'], string[]>[number]]: K }>
	: TColumn['_']['columnType'] extends 'PgGeometry' | 'PgPointTuple' ? t.TTuple<[t.TNumber, t.TNumber]>
	: TColumn['_']['columnType'] extends 'PgLine' ? t.TTuple<[t.TNumber, t.TNumber, t.TNumber]>
	: TColumn['_']['data'] extends Date ? t.TDate
	: TColumn['_']['data'] extends Buffer ? BufferSchema
	: TColumn['_']['dataType'] extends 'array'
		? t.TArray<GetTypeboxPrimitiveType<Assume<TColumn['_']['data'], any[]>[number]>>
	: TColumn['_']['data'] extends Record<string, any>
		? TColumn['_']['columnType'] extends
			'PgJson' | 'PgJsonb' | 'MySqlJson' | 'SingleStoreJson' | 'SQLiteTextJson' | 'SQLiteBlobJson'
			? GenericSchema<TColumn['_']['data']>
		: t.TObject<{ [K in keyof TColumn['_']['data']]: GetTypeboxPrimitiveType<TColumn['_']['data'][K]> }>
	: TColumn['_']['dataType'] extends 'json' ? JsonSchema
	: GetTypeboxPrimitiveType<TColumn['_']['data']>;

export type HandleSelectColumn<
	TSchema extends t.TSchema,
	TColumn extends Column,
> = TColumn['_']['notNull'] extends true ? TSchema
	: t.Union<[TSchema, t.TNull]>;

export type HandleInsertColumn<
	TSchema extends t.TSchema,
	TColumn extends Column,
> = TColumn['_']['notNull'] extends true ? TColumn['_']['hasDefault'] extends true ? t.TOptional<TSchema>
	: TSchema
	: t.TOptional<t.Union<[TSchema, t.TNull]>>;

export type HandleUpdateColumn<
	TSchema extends t.TSchema,
	TColumn extends Column,
> = TColumn['_']['notNull'] extends true ? t.TOptional<TSchema>
	: t.TOptional<t.Union<[TSchema, t.TNull]>>;

export type HandleColumn<
	TType extends 'select' | 'insert' | 'update',
	TColumn extends Column,
> = TType extends 'select' ? HandleSelectColumn<GetTypeboxType<TColumn>, TColumn>
	: TType extends 'insert' ? HandleInsertColumn<GetTypeboxType<TColumn>, TColumn>
	: TType extends 'update' ? HandleUpdateColumn<GetTypeboxType<TColumn>, TColumn>
	: GetTypeboxType<TColumn>;
