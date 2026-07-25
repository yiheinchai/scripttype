/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/sqlite-core/columns/integer.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type SQLiteBooleanBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQLiteIntegerBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQLiteTimestampBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SQLiteIntegerBuilderInitial<TName extends string> = SQLiteIntegerBuilder<{
	name: TName;
	dataType: 'number';
	columnType: 'SQLiteInteger';
	data: number;
	driverParam: number;
	enumValues: undefined;
}>;

export type SQLiteTimestampBuilderInitial<TName extends string> = SQLiteTimestampBuilder<{
	name: TName;
	dataType: 'date';
	columnType: 'SQLiteTimestamp';
	data: Date;
	driverParam: number;
	enumValues: undefined;
}>;

export type SQLiteBooleanBuilderInitial<TName extends string> = SQLiteBooleanBuilder<{
	name: TName;
	dataType: 'boolean';
	columnType: 'SQLiteBoolean';
	data: boolean;
	driverParam: number;
	enumValues: undefined;
}>;
