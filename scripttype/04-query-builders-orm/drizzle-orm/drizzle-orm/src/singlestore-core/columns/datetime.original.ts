/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/singlestore-core/columns/datetime.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type SingleStoreDateTimeBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStoreDateTimeStringBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SingleStoreDateTimeBuilderInitial<TName extends string> = SingleStoreDateTimeBuilder<{
	name: TName;
	dataType: 'date';
	columnType: 'SingleStoreDateTime';
	data: Date;
	driverParam: string | number;
	enumValues: undefined;
	generated: undefined;
}>;

export type SingleStoreDateTimeStringBuilderInitial<TName extends string> = SingleStoreDateTimeStringBuilder<{
	name: TName;
	dataType: 'string';
	columnType: 'SingleStoreDateTimeString';
	data: string;
	driverParam: string | number;
	enumValues: undefined;
	generated: undefined;
}>;
