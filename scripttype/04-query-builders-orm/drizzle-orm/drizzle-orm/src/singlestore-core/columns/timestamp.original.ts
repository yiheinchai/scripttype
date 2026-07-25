/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/singlestore-core/columns/timestamp.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type SingleStoreTimestampBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStoreTimestampStringBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SingleStoreTimestampBuilderInitial<TName extends string> = SingleStoreTimestampBuilder<{
	name: TName;
	dataType: 'date';
	columnType: 'SingleStoreTimestamp';
	data: Date;
	driverParam: string | number;
	enumValues: undefined;
	generated: undefined;
}>;

export type SingleStoreTimestampStringBuilderInitial<TName extends string> = SingleStoreTimestampStringBuilder<{
	name: TName;
	dataType: 'string';
	columnType: 'SingleStoreTimestampString';
	data: string;
	driverParam: string | number;
	enumValues: undefined;
	generated: undefined;
}>;
