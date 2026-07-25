/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/mysql-core/columns/decimal.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type MySqlDecimalBigIntBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MySqlDecimalBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MySqlDecimalNumberBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type MySqlDecimalBuilderInitial<TName extends string> = MySqlDecimalBuilder<{
	name: TName;
	dataType: 'string';
	columnType: 'MySqlDecimal';
	data: string;
	driverParam: string;
	enumValues: undefined;
}>;

export type MySqlDecimalNumberBuilderInitial<TName extends string> = MySqlDecimalNumberBuilder<{
	name: TName;
	dataType: 'number';
	columnType: 'MySqlDecimalNumber';
	data: number;
	driverParam: string;
	enumValues: undefined;
}>;

export type MySqlDecimalBigIntBuilderInitial<TName extends string> = MySqlDecimalBigIntBuilder<{
	name: TName;
	dataType: 'bigint';
	columnType: 'MySqlDecimalBigInt';
	data: bigint;
	driverParam: string;
	enumValues: undefined;
}>;
