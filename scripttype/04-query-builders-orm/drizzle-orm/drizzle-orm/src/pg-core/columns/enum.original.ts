/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/pg-core/columns/enum.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type PgEnumColumnBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgEnumObjectColumnBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PgEnumObjectColumnBuilderInitial<TName extends string, TValues extends object> = PgEnumObjectColumnBuilder<{
	name: TName;
	dataType: 'string';
	columnType: 'PgEnumObjectColumn';
	data: TValues[keyof TValues];
	enumValues: string[];
	driverParam: string;
}>;

export type PgEnumColumnBuilderInitial<TName extends string, TValues extends [string, ...string[]]> =
	PgEnumColumnBuilder<{
		name: TName;
		dataType: 'string';
		columnType: 'PgEnumColumn';
		data: TValues[number];
		enumValues: TValues;
		driverParam: string;
	}>;
