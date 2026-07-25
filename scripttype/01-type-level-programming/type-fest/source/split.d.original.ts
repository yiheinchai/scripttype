/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/split.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type And<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ApplyDefaultOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsStringLiteral<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Not<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Or<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Required<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type SplitOptions = {
	/**
	When enabled, instantiations with non-literal string types (e.g., `string`, `Uppercase<string>`, `on${string}`) simply return back `string[]` without performing any splitting, as the exact structure cannot be statically determined.

	@default true

	@example
	```ts
	import type {Split} from 'type-fest';

	type Example1 = Split<`foo.${string}.bar`, '.', {strictLiteralChecks: false}>;
	//=> ['foo', string, 'bar']

	type Example2 = Split<`foo.${string}`, '.', {strictLiteralChecks: true}>;
	//=> string[]

	type Example3 = Split<'foobarbaz', `b${string}`, {strictLiteralChecks: false}>;
	//=> ['foo', 'r', 'z']

	type Example4 = Split<'foobarbaz', `b${string}`, {strictLiteralChecks: true}>;
	//=> string[]
	```
	*/
	strictLiteralChecks?: boolean;
};

export type SplitHelper<
	S extends string,
	Delimiter extends string,
	Options extends Required<SplitOptions>,
	Accumulator extends string[] = [],
> = S extends string // For distributing `S`
	? Delimiter extends string // For distributing `Delimiter`
		// If `strictLiteralChecks` is `false` OR `S` and `Delimiter` both are string literals, then perform the split
		? Or<Not<Options['strictLiteralChecks']>, And<IsStringLiteral<S>, IsStringLiteral<Delimiter>>> extends true
			? S extends `${infer Head}${Delimiter}${infer Tail}`
				? SplitHelper<Tail, Delimiter, Options, [...Accumulator, Head]>
				: Delimiter extends ''
					? S extends ''
						? Accumulator
						: [...Accumulator, S]
					: [...Accumulator, S]
			// Otherwise, return `string[]`
			: string[]
		: never // Should never happen
	: never;

export type DefaultSplitOptions = {
	strictLiteralChecks: true;
};

export type Split<
	S extends string,
	Delimiter extends string,
	Options extends SplitOptions = {},
> =
	SplitHelper<S, Delimiter, ApplyDefaultOptions<SplitOptions, DefaultSplitOptions, Options>>;
