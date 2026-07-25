/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-zod/src/column.types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Assume<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Buffer<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Column<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsEnumDefined<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Json<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type z<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type HasBaseColumn<TColumn> = TColumn extends { _: { baseColumn: Column | undefined } }
	? IsNever<TColumn['_']['baseColumn']> extends false ? true
	: false
	: false;

export type CanCoerce<
	TCoerce extends Partial<Record<'bigint' | 'boolean' | 'date' | 'number' | 'string', true>> | true | undefined,
	TTo extends 'bigint' | 'boolean' | 'date' | 'number' | 'string',
> = TCoerce extends true ? true
	: TCoerce extends Record<string, any> ? TCoerce[TTo] extends true ? true
		: false
	: false;

export type GetZodPrimitiveType<
	TData,
	TColumnType,
	TCoerce extends Partial<Record<'bigint' | 'boolean' | 'date' | 'number' | 'string', true>> | true | undefined,
> = TColumnType extends
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
	| 'SingleStoreYear' ? CanCoerce<TCoerce, 'number'> extends true ? z.coerce.ZodCoercedNumber : z.ZodInt
	: TData extends number ? CanCoerce<TCoerce, 'number'> extends true ? z.coerce.ZodCoercedNumber : z.ZodNumber
	: TData extends bigint ? CanCoerce<TCoerce, 'bigint'> extends true ? z.coerce.ZodCoercedBigInt : z.ZodBigInt
	: TData extends boolean ? CanCoerce<TCoerce, 'boolean'> extends true ? z.coerce.ZodCoercedBoolean : z.ZodBoolean
	: TData extends string ? CanCoerce<TCoerce, 'string'> extends true ? z.coerce.ZodCoercedString : z.ZodString
	: z.ZodType;

export type GetZodType<
	TColumn extends Column,
	TCoerce extends Partial<Record<'bigint' | 'boolean' | 'date' | 'number' | 'string', true>> | true | undefined,
> = HasBaseColumn<TColumn> extends true ? z.ZodArray<
		GetZodType<Assume<TColumn['_']['baseColumn'], Column>, TCoerce>
	>
	: TColumn['_']['columnType'] extends 'PgUUID' ? z.ZodUUID
	: IsEnumDefined<TColumn['_']['enumValues']> extends true
		? z.ZodEnum<{ [K in Assume<TColumn['_']['enumValues'], [string, ...string[]]>[number]]: K }>
	: TColumn['_']['columnType'] extends 'PgGeometry' | 'PgPointTuple' ? z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>
	: TColumn['_']['columnType'] extends 'PgLine' ? z.ZodTuple<[z.ZodNumber, z.ZodNumber, z.ZodNumber], null>
	: TColumn['_']['data'] extends Date ? CanCoerce<TCoerce, 'date'> extends true ? z.coerce.ZodCoercedDate : z.ZodDate
	: TColumn['_']['data'] extends Buffer ? z.ZodType<Buffer>
	: TColumn['_']['dataType'] extends 'array'
		? z.ZodArray<GetZodPrimitiveType<Assume<TColumn['_']['data'], any[]>[number], '', TCoerce>>
	: TColumn['_']['data'] extends Record<string, any>
		? TColumn['_']['columnType'] extends
			'PgJson' | 'PgJsonb' | 'MySqlJson' | 'SingleStoreJson' | 'SQLiteTextJson' | 'SQLiteBlobJson'
			? z.ZodType<TColumn['_']['data'], TColumn['_']['data']>
		: z.ZodObject<
			{ [K in keyof TColumn['_']['data']]: GetZodPrimitiveType<TColumn['_']['data'][K], '', TCoerce> },
			{ out: {}; in: {} }
		>
	: TColumn['_']['dataType'] extends 'json' ? z.ZodType<Json>
	: GetZodPrimitiveType<TColumn['_']['data'], TColumn['_']['columnType'], TCoerce>;

export type HandleSelectColumn<
	TSchema extends z.ZodType,
	TColumn extends Column,
> = TColumn['_']['notNull'] extends true ? TSchema
	: z.ZodNullable<TSchema>;

export type HandleInsertColumn<
	TSchema extends z.ZodType,
	TColumn extends Column,
> = TColumn['_']['notNull'] extends true ? TColumn['_']['hasDefault'] extends true ? z.ZodOptional<TSchema>
	: TSchema
	: z.ZodOptional<z.ZodNullable<TSchema>>;

export type HandleUpdateColumn<
	TSchema extends z.ZodType,
	TColumn extends Column,
> = TColumn['_']['notNull'] extends true ? z.ZodOptional<TSchema>
	: z.ZodOptional<z.ZodNullable<TSchema>>;

export type HandleColumn<
	TType extends 'select' | 'insert' | 'update',
	TColumn extends Column,
	TCoerce extends Partial<Record<'bigint' | 'boolean' | 'date' | 'number' | 'string', true>> | true | undefined,
> = TType extends 'select' ? HandleSelectColumn<GetZodType<TColumn, TCoerce>, TColumn>
	: TType extends 'insert' ? HandleInsertColumn<GetZodType<TColumn, TCoerce>, TColumn>
	: TType extends 'update' ? HandleUpdateColumn<GetZodType<TColumn, TCoerce>, TColumn>
	: GetZodType<TColumn, TCoerce>;
