/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/mysql-core/columns/enum.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type MySqlEnumColumnBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlEnumObjectColumnBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type MySqlEnumColumnBuilderInitial<TName extends string, TEnum extends string[]> = MySqlEnumColumnBuilder<{
	name: TName;
	dataType: 'string';
	columnType: 'MySqlEnumColumn';
	data: TEnum[number];
	driverParam: string;
	enumValues: TEnum;
}>;

export type MySqlEnumObjectColumnBuilderInitial<TName extends string, TEnum extends object> =
	MySqlEnumObjectColumnBuilder<{
		name: TName;
		dataType: 'string';
		columnType: 'MySqlEnumObjectColumn';
		data: TEnum[keyof TEnum];
		driverParam: string;
		enumValues: string[];
	}>;
