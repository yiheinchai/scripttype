/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/singlestore-core/columns/decimal.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type SingleStoreDecimalBigIntBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SingleStoreDecimalBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SingleStoreDecimalNumberBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
