/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-arktype/src/column.types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Column<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Json<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Type<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type type<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ArktypeNullable<TSchema> = Type<type.infer<TSchema> | null>;

export type ArktypeOptional<TSchema> = [Type<type.infer<TSchema>>, '?'];

export type GetArktypeType<
	TColumn extends Column,
> = TColumn['_']['columnType'] extends
	'PgJson' | 'PgJsonb' | 'MySqlJson' | 'SingleStoreJson' | 'SQLiteTextJson' | 'SQLiteBlobJson'
	? unknown extends TColumn['_']['data'] ? Type<Json> : Type<TColumn['_']['data']>
	: Type<TColumn['_']['data']>;

export type HandleSelectColumn<
	TSchema,
	TColumn extends Column,
> = TColumn['_']['notNull'] extends true ? TSchema
	: ArktypeNullable<TSchema>;

export type HandleInsertColumn<
	TSchema,
	TColumn extends Column,
> = TColumn['_']['notNull'] extends true ? TColumn['_']['hasDefault'] extends true ? ArktypeOptional<TSchema>
	: TSchema
	: ArktypeOptional<ArktypeNullable<TSchema>>;

export type HandleUpdateColumn<
	TSchema,
	TColumn extends Column,
> = TColumn['_']['notNull'] extends true ? ArktypeOptional<TSchema>
	: ArktypeOptional<ArktypeNullable<TSchema>>;

export type HandleColumn<
	TType extends 'select' | 'insert' | 'update',
	TColumn extends Column,
> = TType extends 'select' ? HandleSelectColumn<GetArktypeType<TColumn>, TColumn>
	: TType extends 'insert' ? HandleInsertColumn<GetArktypeType<TColumn>, TColumn>
	: TType extends 'update' ? HandleUpdateColumn<GetArktypeType<TColumn>, TColumn>
	: GetArktypeType<TColumn>;
