/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/delimiter-case.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ApplyDefaultOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AsciiPunctuation<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsStringLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Lowercase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Merge<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StartsWith<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type WordsOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _DefaultWordsOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type DelimiterCaseFromArray<
	Words extends string[],
	Delimiter extends string,
	OutputString extends string = '',
> = Words extends [
	infer FirstWord extends string,
	...infer RemainingWords extends string[],
]
	? DelimiterCaseFromArray<RemainingWords, Delimiter, OutputString extends '' ? FirstWord : `${OutputString}${
		StartsWith<FirstWord, AsciiPunctuation> extends true ? '' : Delimiter
	}${FirstWord}`>
	: OutputString;

export type _DefaultDelimiterCaseOptions = Merge<_DefaultWordsOptions, {splitOnNumbers: false}>;

export type DelimiterCase<
	Value,
	Delimiter extends string,
	Options extends WordsOptions = {},
> = Value extends string
	? Delimiter extends string // For distributing `Delimiter`
		? IsStringLiteral<Value> extends false
			? Value
			: Lowercase<DelimiterCaseFromArray<
				Words<Value, ApplyDefaultOptions<WordsOptions, _DefaultDelimiterCaseOptions, Options>>,
				Delimiter
			>>
		: never
	: Value;
