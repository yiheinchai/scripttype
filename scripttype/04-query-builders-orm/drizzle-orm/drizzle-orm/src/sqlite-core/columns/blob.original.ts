/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/sqlite-core/columns/blob.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Buffer<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SQLiteBigIntBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SQLiteBlobBufferBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SQLiteBlobJsonBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type SQLiteBigIntBuilderInitial<TName extends string> = SQLiteBigIntBuilder<{
	name: TName;
	dataType: 'bigint';
	columnType: 'SQLiteBigInt';
	data: bigint;
	driverParam: Buffer;
	enumValues: undefined;
}>;

export type SQLiteBlobJsonBuilderInitial<TName extends string> = SQLiteBlobJsonBuilder<{
	name: TName;
	dataType: 'json';
	columnType: 'SQLiteBlobJson';
	data: unknown;
	driverParam: Buffer;
	enumValues: undefined;
}>;

export type SQLiteBlobBufferBuilderInitial<TName extends string> = SQLiteBlobBufferBuilder<{
	name: TName;
	dataType: 'buffer';
	columnType: 'SQLiteBlobBuffer';
	data: Buffer;
	driverParam: Buffer;
	enumValues: undefined;
}>;
