/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/mysql-core/columns/timestamp.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type MySqlTimestampBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlTimestampStringBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type MySqlTimestampBuilderInitial<TName extends string> = MySqlTimestampBuilder<{
	name: TName;
	dataType: 'date';
	columnType: 'MySqlTimestamp';
	data: Date;
	driverParam: string | number;
	enumValues: undefined;
}>;

export type MySqlTimestampStringBuilderInitial<TName extends string> = MySqlTimestampStringBuilder<{
	name: TName;
	dataType: 'string';
	columnType: 'MySqlTimestampString';
	data: string;
	driverParam: string | number;
	enumValues: undefined;
}>;
