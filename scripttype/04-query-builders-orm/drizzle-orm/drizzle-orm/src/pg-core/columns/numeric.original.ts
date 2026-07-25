/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/pg-core/columns/numeric.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type PgNumericBigIntBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgNumericBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgNumericNumberBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
