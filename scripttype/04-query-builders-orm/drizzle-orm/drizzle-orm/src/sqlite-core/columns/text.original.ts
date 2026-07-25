/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/sqlite-core/columns/text.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type SQLiteTextBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQLiteTextJsonBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SQLiteTextBuilderInitial<
	TName extends string,
	TEnum extends [string, ...string[]],
	TLength extends number | undefined,
> = SQLiteTextBuilder<{
	name: TName;
	dataType: 'string';
	columnType: 'SQLiteText';
	data: TEnum[number];
	driverParam: string;
	enumValues: TEnum;
	length: TLength;
}>;

export type SQLiteTextJsonBuilderInitial<TName extends string> = SQLiteTextJsonBuilder<{
	name: TName;
	dataType: 'json';
	columnType: 'SQLiteTextJson';
	data: unknown;
	driverParam: string;
	enumValues: undefined;
	generated: undefined;
}>;

export type SQLiteTextConfig<
	TMode extends 'text' | 'json' = 'text' | 'json',
	TEnum extends readonly string[] | string[] | undefined = readonly string[] | string[] | undefined,
	TLength extends number | undefined = number | undefined,
> = TMode extends 'text' ? {
		mode?: TMode;
		length?: TLength;
		enum?: TEnum;
	}
	: {
		mode?: TMode;
	};
