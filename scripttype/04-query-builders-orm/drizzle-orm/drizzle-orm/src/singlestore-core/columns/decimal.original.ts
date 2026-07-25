/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/singlestore-core/columns/decimal.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type SingleStoreDecimalBigIntBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStoreDecimalBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStoreDecimalNumberBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SingleStoreDecimalBuilderInitial<TName extends string> = SingleStoreDecimalBuilder<{
	name: TName;
	dataType: 'string';
	columnType: 'SingleStoreDecimal';
	data: string;
	driverParam: string;
	enumValues: undefined;
	generated: undefined;
}>;

export type SingleStoreDecimalNumberBuilderInitial<TName extends string> = SingleStoreDecimalNumberBuilder<{
	name: TName;
	dataType: 'number';
	columnType: 'SingleStoreDecimalNumber';
	data: number;
	driverParam: string;
	enumValues: undefined;
	generated: undefined;
}>;

export type SingleStoreDecimalBigIntBuilderInitial<TName extends string> = SingleStoreDecimalBigIntBuilder<{
	name: TName;
	dataType: 'bigint';
	columnType: 'SingleStoreDecimalBigInt';
	data: bigint;
	driverParam: string;
	enumValues: undefined;
	generated: undefined;
}>;
