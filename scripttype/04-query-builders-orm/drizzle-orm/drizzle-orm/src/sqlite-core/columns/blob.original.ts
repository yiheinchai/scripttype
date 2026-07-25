/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/sqlite-core/columns/blob.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Buffer<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQLiteBigIntBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQLiteBlobBufferBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQLiteBlobJsonBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
