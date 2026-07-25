/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/pg-core/columns/varchar.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type PgVarcharBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PgVarcharBuilderInitial<
	TName extends string,
	TEnum extends [string, ...string[]],
	TLength extends number | undefined,
> = PgVarcharBuilder<{
	name: TName;
	dataType: 'string';
	columnType: 'PgVarchar';
	data: TEnum[number];
	driverParam: string;
	enumValues: TEnum;
	length: TLength;
}>;
