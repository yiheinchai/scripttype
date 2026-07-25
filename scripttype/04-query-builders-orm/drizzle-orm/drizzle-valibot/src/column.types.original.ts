/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-valibot/src/column.types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ArrayLike<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Assume<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Buffer<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Column<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsEnumDefined<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Json<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RemoveNeverElements<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type v<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type HasBaseColumn<TColumn> = TColumn extends { _: { baseColumn: Column | undefined } }
	? IsNever<TColumn['_']['baseColumn']> extends false ? true
	: false
	: false;

export type EnumValuesToEnum<TEnumValues extends [string, ...string[]]> = { readonly [K in TEnumValues[number]]: K };

export type ExtractAdditionalProperties<TColumn extends Column> = {
	max: TColumn['_']['columnType'] extends 'PgVarchar' | 'SQLiteText' | 'PgChar' | 'MySqlChar' | 'SingleStoreChar'
		? Assume<TColumn['_'], { length: number | undefined }>['length']
		: TColumn['_']['columnType'] extends 'MySqlText' | 'MySqlVarChar' | 'SingleStoreText' | 'SingleStoreVarChar'
			? number
		: TColumn['_']['columnType'] extends 'PgBinaryVector' | 'PgHalfVector' | 'PgVector'
			? Assume<TColumn['_'], { dimensions: number }>['dimensions']
		: TColumn['_']['columnType'] extends 'PgArray' ? Assume<TColumn['_'], { size: number | undefined }>['size']
		: undefined;
	fixedLength: TColumn['_']['columnType'] extends
		'PgChar' | 'PgHalfVector' | 'PgVector' | 'PgArray' | 'MySqlChar' | 'SingleStoreChar' ? true
		: false;
};

export type GetLengthAction<T extends Record<string, any>, TType extends string | ArrayLike<unknown>> =
	T['fixedLength'] extends true ? v.LengthAction<TType, number, undefined>
		: v.MaxLengthAction<TType, number, undefined>;

export type GetValibotPrimitiveType<TData, TColumnType, TAdditionalProperties extends Record<string, any>> = TData extends
	number ? TAdditionalProperties['noPipe'] extends true ? v.NumberSchema<undefined> : v.SchemaWithPipe<
		RemoveNeverElements<[
			v.NumberSchema<undefined>,
			v.MinValueAction<number, number, undefined>,
			v.MaxValueAction<number, number, undefined>,
			TColumnType extends
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
				| 'SingleStoreYear' ? v.IntegerAction<number, undefined>
				: never,
		]>
	>
	: TData extends bigint ? TAdditionalProperties['noPipe'] extends true ? v.BigintSchema<undefined> : v.SchemaWithPipe<[
			v.BigintSchema<undefined>,
			v.MinValueAction<bigint, bigint, undefined>,
			v.MaxValueAction<bigint, bigint, undefined>,
		]>
	: TData extends boolean ? v.BooleanSchema<undefined>
	: TData extends string
		? TAdditionalProperties['max'] extends number
			? v.SchemaWithPipe<[v.StringSchema<undefined>, GetLengthAction<TAdditionalProperties, string>]>
		: v.StringSchema<undefined>
	: v.AnySchema;

export type GetValibotType<
	TData,
	TDataType extends string,
	TColumnType extends string,
	TEnumValues extends string[] | undefined,
	TBaseColumn extends Column | undefined,
	TAdditionalProperties extends Record<string, any>,
> = TColumnType extends 'PgHalfVector' | 'PgVector' ? TAdditionalProperties['max'] extends number ? v.SchemaWithPipe<
			[v.ArraySchema<v.NumberSchema<undefined>, undefined>, GetLengthAction<TAdditionalProperties, number[]>]
		>
	: v.ArraySchema<v.NumberSchema<undefined>, undefined>
	: TColumnType extends 'PgUUID' ? v.SchemaWithPipe<[v.StringSchema<undefined>, v.UuidAction<string, undefined>]>
	: TColumnType extends 'PgBinaryVector' ? v.SchemaWithPipe<
			RemoveNeverElements<[
				v.StringSchema<undefined>,
				v.RegexAction<string, undefined>,
				TAdditionalProperties['max'] extends number ? GetLengthAction<TAdditionalProperties, string> : never,
			]>
		>
	: TBaseColumn extends Column ? TAdditionalProperties['max'] extends number ? v.SchemaWithPipe<
				[
					GetArraySchema<Assume<TBaseColumn, Column>>,
					GetLengthAction<TAdditionalProperties, Assume<TBaseColumn, Column>['_']['data'][]>,
				]
			>
		: GetArraySchema<Assume<TBaseColumn, Column>>
	: IsEnumDefined<TEnumValues> extends true
		? v.EnumSchema<{ readonly [K in Assume<TEnumValues, [string, ...string[]]>[number]]: K }, undefined>
	: TColumnType extends 'PgGeometry' | 'PgPointTuple'
		? v.TupleSchema<[v.NumberSchema<undefined>, v.NumberSchema<undefined>], undefined>
	: TColumnType extends 'PgLine'
		? v.TupleSchema<[v.NumberSchema<undefined>, v.NumberSchema<undefined>, v.NumberSchema<undefined>], undefined>
	: TData extends Date ? v.DateSchema<undefined>
	: TData extends Buffer ? v.GenericSchema<Buffer>
	: TDataType extends 'array' ? v.ArraySchema<
			GetValibotPrimitiveType<Assume<TData, any[]>[number], '', { noPipe: true }>,
			undefined
		>
	: TData extends Record<string, any>
		? TColumnType extends 'PgJson' | 'PgJsonb' | 'MySqlJson' | 'SingleStoreJson' | 'SQLiteTextJson' | 'SQLiteBlobJson'
			? v.GenericSchema<TData>
		: v.ObjectSchema<
			{ readonly [K in keyof TData]: GetValibotPrimitiveType<TData[K], '', { noPipe: true }> },
			undefined
		>
	: TDataType extends 'json' ? v.GenericSchema<Json>
	: GetValibotPrimitiveType<TData, TColumnType, TAdditionalProperties>;

export type GetArraySchema<T extends Column> = v.ArraySchema<
	GetValibotType<
		T['_']['data'],
		T['_']['dataType'],
		T['_']['columnType'],
		T['_']['enumValues'],
		HasBaseColumn<T> extends true ? Assume<T['_']['baseColumn'], Column> : undefined,
		ExtractAdditionalProperties<T>
	>,
	undefined
>;

export type HandleSelectColumn<
	TSchema extends v.GenericSchema,
	TColumn extends Column,
> = TColumn['_']['notNull'] extends true ? TSchema
	: v.NullableSchema<TSchema, undefined>;

export type HandleInsertColumn<
	TSchema extends v.GenericSchema,
	TColumn extends Column,
> = TColumn['_']['notNull'] extends true
	? TColumn['_']['hasDefault'] extends true ? v.OptionalSchema<TSchema, undefined>
	: TSchema
	: v.OptionalSchema<v.NullableSchema<TSchema, undefined>, undefined>;

export type HandleUpdateColumn<
	TSchema extends v.GenericSchema,
	TColumn extends Column,
> = TColumn['_']['notNull'] extends true ? v.OptionalSchema<TSchema, undefined>
	: v.OptionalSchema<v.NullableSchema<TSchema, undefined>, undefined>;

export type HandleColumn<
	TType extends 'select' | 'insert' | 'update',
	TColumn extends Column,
> = GetValibotType<
	TColumn['_']['data'],
	TColumn['_']['dataType'],
	TColumn['_']['columnType'],
	TColumn['_']['enumValues'],
	HasBaseColumn<TColumn> extends true ? Assume<TColumn['_']['baseColumn'], Column> : undefined,
	ExtractAdditionalProperties<TColumn>
> extends infer TSchema extends v.GenericSchema ? TSchema extends v.AnySchema ? v.AnySchema
	: TType extends 'select' ? HandleSelectColumn<TSchema, TColumn>
	: TType extends 'insert' ? HandleInsertColumn<TSchema, TColumn>
	: TType extends 'update' ? HandleUpdateColumn<TSchema, TColumn>
	: TSchema
	: v.AnySchema;
