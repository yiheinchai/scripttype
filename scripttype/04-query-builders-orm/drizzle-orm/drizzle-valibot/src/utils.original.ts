/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-valibot/src/utils.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Column<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectedFieldsFlat<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Table<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type View<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type IsNever<T> = [T] extends [never] ? true : false;

export type IsEnumDefined<TEnum extends string[] | undefined> = [string, ...string[]] extends TEnum ? false
	: undefined extends TEnum ? false
	: true;

export type ColumnIsGeneratedAlwaysAs<TColumn> = TColumn extends Column
	? TColumn['_']['identity'] extends 'always' ? true
	: TColumn['_']['generated'] extends { type: 'byDefault' } | undefined ? false
	: true
	: false;

export type RemoveNever<T> = {
	[K in keyof T as T[K] extends never ? never : K]: T[K];
};

export type RemoveNeverElements<T extends any[]> = T extends [infer First, ...infer Rest]
	? IsNever<First> extends true ? RemoveNeverElements<Rest>
	: [First, ...RemoveNeverElements<Rest>]
	: [];

export type GetSelection<T extends SelectedFieldsFlat<Column> | Table | View> = T extends Table ? T['_']['columns']
	: T extends View ? T['_']['selectedFields']
	: T;
