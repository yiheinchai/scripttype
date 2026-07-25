/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/pg-core/columns/numeric.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type PgNumericBigIntBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PgNumericBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PgNumericNumberBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type PgNumericBuilderInitial<TName extends string> = PgNumericBuilder<{
	name: TName;
	dataType: 'string';
	columnType: 'PgNumeric';
	data: string;
	driverParam: string;
	enumValues: undefined;
}>;

export type PgNumericNumberBuilderInitial<TName extends string> = PgNumericNumberBuilder<{
	name: TName;
	dataType: 'number';
	columnType: 'PgNumericNumber';
	data: number;
	driverParam: string;
	enumValues: undefined;
}>;

export type PgNumericBigIntBuilderInitial<TName extends string> = PgNumericBigIntBuilder<{
	name: TName;
	dataType: 'bigint';
	columnType: 'PgNumericBigInt';
	data: bigint;
	driverParam: string;
	enumValues: undefined;
}>;

export type PgNumericConfig<T extends 'string' | 'number' | 'bigint' = 'string' | 'number' | 'bigint'> =
	| { precision: number; scale?: number; mode?: T }
	| { precision?: number; scale: number; mode?: T }
	| { precision?: number; scale?: number; mode: T };
