/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/split.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type And<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ApplyDefaultOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsStringLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Not<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Or<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
