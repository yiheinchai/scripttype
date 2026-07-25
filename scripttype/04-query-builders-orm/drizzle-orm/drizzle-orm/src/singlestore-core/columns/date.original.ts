/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/singlestore-core/columns/date.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type SingleStoreDateBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStoreDateStringBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SingleStoreDateBuilderInitial<TName extends string> = SingleStoreDateBuilder<{
	name: TName;
	dataType: 'date';
	columnType: 'SingleStoreDate';
	data: Date;
	driverParam: string | number;
	enumValues: undefined;
	generated: undefined;
}>;

export type SingleStoreDateStringBuilderInitial<TName extends string> = SingleStoreDateStringBuilder<{
	name: TName;
	dataType: 'string';
	columnType: 'SingleStoreDateString';
	data: string;
	driverParam: string | number;
	enumValues: undefined;
	generated: undefined;
}>;
