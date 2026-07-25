/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/camel-case.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ApplyDefaultOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Capitalize<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Lowercase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Uncapitalize<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Uppercase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type WordsOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _DefaultWordsOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type LeadingUnderscores<Type extends string, Underscores extends string = ''> =
	Type extends `_${infer Rest}`
		? LeadingUnderscores<Rest, `_${Underscores}`>
		: Underscores;

export type CamelCaseOptions = WordsOptions & {
	/**
	Whether to preserved consecutive uppercase letter.

	@default false
	*/
	preserveConsecutiveUppercase?: boolean;

	/**
	Whether to preserve leading underscores.

	This matches the behavior of the [`camelcase`](https://github.com/sindresorhus/camelcase) package v9+.

	@default false
	*/
	preserveLeadingUnderscores?: boolean;
};

export type CamelCaseFromArray<
	Words extends string[],
	Options extends Required<CamelCaseOptions>,
	OutputString extends string = '',
> = Words extends [
	infer FirstWord extends string,
	...infer RemainingWords extends string[],
]
	? Options['preserveConsecutiveUppercase'] extends true
		? `${Capitalize<FirstWord>}${CamelCaseFromArray<RemainingWords, Options>}`
		: `${Capitalize<Lowercase<FirstWord>>}${CamelCaseFromArray<RemainingWords, Options>}`
	: OutputString;

export type _DefaultCamelCaseOptions = _DefaultWordsOptions & {
	preserveConsecutiveUppercase: false;
	preserveLeadingUnderscores: false;
};

export type CamelCase<Type, Options extends CamelCaseOptions = {}> = Type extends string
	? string extends Type
		? Type
		: `${Options['preserveLeadingUnderscores'] extends true
			? LeadingUnderscores<Type>
			: ''
		}${Uncapitalize<CamelCaseFromArray<
			Words<Type extends Uppercase<Type> ? Lowercase<Type> : Type, Options>,
			ApplyDefaultOptions<CamelCaseOptions, _DefaultCamelCaseOptions, Options>
		>>}`
	: Type;
