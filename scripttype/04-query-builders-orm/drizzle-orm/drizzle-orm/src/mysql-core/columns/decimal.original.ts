/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/mysql-core/columns/decimal.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type MySqlDecimalBigIntBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlDecimalBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlDecimalNumberBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
