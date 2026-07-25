/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/remove-suffix.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ApplyDefaultOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type If<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IfNotAnyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsStringLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Not<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Or<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type RemoveSuffixOptions = {
	/**
	When enabled, instantiations with non-literal suffixes (e.g., `string`, `Uppercase<string>`, `` `.${string}` ``) simply return `string`, since their precise structure cannot be statically determined.

	Note: Disabling this option can produce misleading results that might not reflect the actual runtime behavior.
	For example, ``RemoveSuffix<'report.pdf', `.${string}`, {strict: false}>`` returns `'report'`, but at runtime, suffix could be `'.txt'` (which satisfies `` `.${string}` ``) and removing `'.txt'` from `'report.pdf'` would not result in `'report'`.

	So, it is recommended to not disable this option unless you are aware of the implications.

	@default true

	@example
	```
	import type {RemoveSuffix} from 'type-fest';

	type A = RemoveSuffix<'report.pdf', `.${string}`, {strict: true}>;
	//=> string

	type B = RemoveSuffix<'report.pdf', `.${string}`, {strict: false}>;
	//=> 'report'

	type C = RemoveSuffix<'on-change', string, {strict: true}>;
	//=> string

	type D = RemoveSuffix<'on-change', string, {strict: false}>;
	//=> 'o'

	type E = RemoveSuffix<`${number}/${string}`, `/${string}`, {strict: true}>;
	//=> string

	type F = RemoveSuffix<`${number}/${string}`, `/${string}`, {strict: false}>;
	//=> `${number}`
	```

	Note: This option has no effect when only the input string type is non-literal. For example, ``RemoveSuffix<`${string}.pdf`, '.pdf'>`` will always return `string`.

	@example
	```
	import type {RemoveSuffix} from 'type-fest';

	type A = RemoveSuffix<`${string}.pdf`, '.pdf', {strict: true}>;
	//=> string

	type B = RemoveSuffix<`${string}.pdf`, '.pdf', {strict: false}>;
	//=> string

	type C = RemoveSuffix<`${number}px`, 'px', {strict: true}>;
	//=> `${number}`

	type D = RemoveSuffix<`${number}px`, 'px', {strict: false}>;
	//=> `${number}`
	```
	*/
	strict?: boolean;
};

export type _RemoveSuffix<S extends string, Suffix extends string, Options extends Required<RemoveSuffixOptions>> =
	Suffix extends string // For distributing `Suffix`
		? Or<IsStringLiteral<Suffix>, Not<Options['strict']>> extends true
			? S extends `${infer Rest}${Suffix}`
				? Rest
				: S // Return back `S` when `Suffix` is not present at the end of `S`
			: string // Fallback to `string` when `Suffix` is non-literal and `strict` is enabled
		: never;

export type DefaultRemoveSuffixOptions = {
	strict: true;
};

export type RemoveSuffix<S extends string, Suffix extends string, Options extends RemoveSuffixOptions = {}> =
	IfNotAnyOrNever<S, {
		ifNot: If<
			IsNever<Suffix>,
			S,
			_RemoveSuffix<S, Suffix, ApplyDefaultOptions<RemoveSuffixOptions, DefaultRemoveSuffixOptions, Options>>
		>;
	}>;
