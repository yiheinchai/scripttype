/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/singlestore-core/columns/varchar.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type SingleStoreVarCharBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SingleStoreVarCharBuilderInitial<
	TName extends string,
	TEnum extends [string, ...string[]],
	TLength extends number | undefined,
> = SingleStoreVarCharBuilder<
	{
		name: TName;
		dataType: 'string';
		columnType: 'SingleStoreVarChar';
		data: TEnum[number];
		driverParam: number | string;
		enumValues: TEnum;
		generated: undefined;
		length: TLength;
	}
>;
