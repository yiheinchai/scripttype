/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/split-on-rest-element.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ApplyDefaultOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type If<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IfNotAnyOrNever<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsArrayReadonly<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsExactOptionalPropertyTypesEnabled<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsOptionalKeyOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Readonly<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Required<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnknownArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type SplitOnRestElementOptions = {
	/**
	Whether to preserve the optional modifier (`?`).

	- When set to `true`, the optional modifiers are preserved as-is. For example:
		`SplitOnRestElement<[number, string?, ...boolean[]], {preserveOptionalModifier: true}>` returns `[[number, string?], boolean[], []]`.

	- When set to `false`, optional elements like `T?` are transformed to `T | undefined` or simply `T` depending on the `exactOptionalPropertyTypes` compiler option. For example:
		- With `exactOptionalPropertyTypes` enabled: `SplitOnRestElement<[number, string?, ...boolean[]], {preserveOptionalModifier: false}>` returns `[[number, string], boolean[], []]`
		- And, with it disabled, the result is: `[[number, string | undefined], boolean[], []]`

	@default true
	*/
	preserveOptionalModifier?: boolean;
};

export type _SplitOnRestElement<
	Array_ extends UnknownArray,
	Options extends Required<SplitOnRestElementOptions>,
	HeadAcc extends UnknownArray = [],
	TailAcc extends UnknownArray = [],
> =
	keyof Array_ & `${number}` extends never
		// Enters this branch, if `Array_` is empty (e.g., []),
		// or `Array_` contains no non-rest elements preceding the rest element (e.g., `[...string[]]` or `[...string[], string]`).
		? Array_ extends readonly [...infer Rest, infer Last]
			? _SplitOnRestElement<Rest, Options, HeadAcc, [Last, ...TailAcc]> // Accumulate elements that are present after the rest element.
			: [HeadAcc, Array_ extends readonly [] ? [] : Array_, TailAcc] // Add the rest element between the accumulated elements.
		: Array_ extends readonly [(infer First)?, ...infer Rest]
			? _SplitOnRestElement<
				Rest, Options,
				[
					...HeadAcc,
					...IsOptionalKeyOf<Array_, '0'> extends true
						? Options['preserveOptionalModifier'] extends false
							? [If<IsExactOptionalPropertyTypesEnabled, First, First | undefined>] // Add `| undefined` for optional elements, if `exactOptionalPropertyTypes` is disabled.
							: [First?]
						: [First],
				],
				TailAcc
			> // Accumulate elements that are present before the rest element.
			: never;

export type DefaultSplitOnRestElementOptions = {
	preserveOptionalModifier: true;
};

export type SplitOnRestElement<
	Array_ extends UnknownArray,
	Options extends SplitOnRestElementOptions = {},
> =
	Array_ extends unknown // For distributing `Array_`
		? IfNotAnyOrNever<Array_, {
			ifNot: _SplitOnRestElement<
				Array_,
				ApplyDefaultOptions<SplitOnRestElementOptions, DefaultSplitOnRestElementOptions, Options>
			>;
		}> extends infer Result extends UnknownArray
			? If<IsArrayReadonly<Array_>, Readonly<Result>, Result>
			: never // Should never happen
		: never;
