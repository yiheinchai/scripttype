/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/string-to-array.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ApplyDefaultOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IfNotAnyOrNever<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsStringLiteral<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Or<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Required<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type StringToArrayOptions = {
	/**
	When enabled, non-literal parts of the string (e.g., `string`, `Uppercase<string>`) are mapped as single elements instead of being mapped as a rest element.

	Note: Enabling this option can produce misleading results that might not reflect the actual runtime behavior.
	For example, `StringToArray<string, {mapNonLiteralsDirectly: true}>` returns `[string]`, but at runtime, the string could be `'abc'` (which satisfies `string`), and converting it to an array would result in `['a', 'b', 'c']`, which doesn't satisfy `[string]`.

	So, it is recommended to not enable this option unless you are aware of the implications.

	@default false

	@example
	```
	import type {StringToArray} from 'type-fest';

	type A = StringToArray<string, {mapNonLiteralsDirectly: false}>;
	//=> string[]

	type B = StringToArray<string, {mapNonLiteralsDirectly: true}>;
	//=> [string]

	type C = StringToArray<`on${string}`, {mapNonLiteralsDirectly: false}>;
	//=> ['o', 'n', ...string[]]

	type D = StringToArray<`on${string}`, {mapNonLiteralsDirectly: true}>;
	//=> ['o', 'n', string]

	type E = StringToArray<`${string}xyz`, {mapNonLiteralsDirectly: false}>;
	//=> [...string[], 'x', 'y', 'z']

	type F = StringToArray<`${string}xyz`, {mapNonLiteralsDirectly: true}>;
	//=> [string, 'x', 'y', 'z']
	```
	*/
	mapNonLiteralsDirectly?: boolean;
};

export type _StringToArray<S extends string, Options extends Required<StringToArrayOptions>, Accumulator extends string[] = []> =
	S extends `${infer First}${infer Rest}`
		? Or<IsStringLiteral<First>, Options['mapNonLiteralsDirectly']> extends true
			? _StringToArray<Rest, Options, [...Accumulator, First]>
			: _StringToArray<Rest, Options, [...Accumulator, ...First[]]>
		: S extends ''
			? Accumulator
			: Options['mapNonLiteralsDirectly'] extends true
				? [...Accumulator, S]
				: [...Accumulator, ...S[]];

export type DefaultStringToArrayOptions = {
	mapNonLiteralsDirectly: false;
};

export type StringToArray<S extends string, Options extends StringToArrayOptions = {}> =
	IfNotAnyOrNever<
		S,
		{
			ifNot: _StringToArray<S, ApplyDefaultOptions<StringToArrayOptions, DefaultStringToArrayOptions, Options>>;
			ifAny: unknown[];
		}
	>;
