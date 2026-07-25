/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/string-to-array.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ApplyDefaultOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IfNotAnyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsStringLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Or<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
