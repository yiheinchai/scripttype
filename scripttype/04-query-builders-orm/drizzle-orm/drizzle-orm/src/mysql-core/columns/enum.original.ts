/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/mysql-core/columns/enum.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type MySqlEnumColumnBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MySqlEnumObjectColumnBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
