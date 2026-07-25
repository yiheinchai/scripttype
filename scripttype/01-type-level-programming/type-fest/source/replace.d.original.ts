/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/replace.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ApplyDefaultOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Required<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type ReplaceOptions = {
	all?: boolean;
};

export type _Replace<
	Input extends string,
	Search extends string,
	Replacement extends string,
	Options extends Required<ReplaceOptions>,
	Accumulator extends string = '',
> = Search extends string // For distributing `Search`
	? Replacement extends string // For distributing `Replacement`
		? Input extends `${infer Head}${Search}${infer Tail}`
			? Options['all'] extends true
				? _Replace<Tail, Search, Replacement, Options, `${Accumulator}${Head}${Replacement}`>
				: `${Head}${Replacement}${Tail}`
			: `${Accumulator}${Input}`
		: never
	: never;

export type DefaultReplaceOptions = {
	all: false;
};

export type Replace<
	Input extends string,
	Search extends string,
	Replacement extends string,
	Options extends ReplaceOptions = {},
> = _Replace<Input, Search, Replacement, ApplyDefaultOptions<ReplaceOptions, DefaultReplaceOptions, Options>>;
