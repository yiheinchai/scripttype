/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/sqlite-core/columns/numeric.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type SQLiteNumericBigIntBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SQLiteNumericBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SQLiteNumericNumberBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type SQLiteNumericBuilderInitial<TName extends string> = SQLiteNumericBuilder<{
	name: TName;
	dataType: 'string';
	columnType: 'SQLiteNumeric';
	data: string;
	driverParam: string;
	enumValues: undefined;
}>;

export type SQLiteNumericNumberBuilderInitial<TName extends string> = SQLiteNumericNumberBuilder<{
	name: TName;
	dataType: 'number';
	columnType: 'SQLiteNumericNumber';
	data: number;
	driverParam: string;
	enumValues: undefined;
}>;

export type SQLiteNumericBigIntBuilderInitial<TName extends string> = SQLiteNumericBigIntBuilder<{
	name: TName;
	dataType: 'bigint';
	columnType: 'SQLiteNumericBigInt';
	data: bigint;
	driverParam: string;
	enumValues: undefined;
}>;

export type SQLiteNumericConfig<T extends 'string' | 'number' | 'bigint' = 'string' | 'number' | 'bigint'> = {
	mode: T;
};
