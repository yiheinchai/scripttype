/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/singlestore-core/columns/bigint.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type SingleStoreBigInt53Builder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStoreBigInt64Builder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SingleStoreBigInt53BuilderInitial<TName extends string> = SingleStoreBigInt53Builder<{
	name: TName;
	dataType: 'number';
	columnType: 'SingleStoreBigInt53';
	data: number;
	driverParam: number | string;
	enumValues: undefined;
}>;

export type SingleStoreBigInt64BuilderInitial<TName extends string> = SingleStoreBigInt64Builder<{
	name: TName;
	dataType: 'bigint';
	columnType: 'SingleStoreBigInt64';
	data: bigint;
	driverParam: string;
	enumValues: undefined;
	generated: undefined;
}>;
