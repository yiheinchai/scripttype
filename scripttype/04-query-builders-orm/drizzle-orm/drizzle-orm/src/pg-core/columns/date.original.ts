/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/pg-core/columns/date.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type PgDateBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgDateStringBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PgDateBuilderInitial<TName extends string> = PgDateBuilder<{
	name: TName;
	dataType: 'date';
	columnType: 'PgDate';
	data: Date;
	driverParam: string;
	enumValues: undefined;
}>;

export type PgDateStringBuilderInitial<TName extends string> = PgDateStringBuilder<{
	name: TName;
	dataType: 'string';
	columnType: 'PgDateString';
	data: string;
	driverParam: string;
	enumValues: undefined;
}>;
