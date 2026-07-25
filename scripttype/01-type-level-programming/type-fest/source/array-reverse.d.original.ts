/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/array-reverse.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type If<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IfNotAnyOrNever<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsArrayReadonly<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsExactOptionalPropertyTypesEnabled<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsOptionalKeyOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Readonly<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnknownArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type _ArrayReverse<
	TArray extends UnknownArray,
	BeforeRestAcc extends UnknownArray = [],
	AfterRestAcc extends UnknownArray = [],
	Result extends UnknownArray = never,
> =
	keyof TArray & `${number}` extends never
		// Enters this branch, if `TArray` is empty (e.g., `[]`),
		// or `TArray` contains no non-rest elements preceding the rest element (e.g., `[...string[]]` or `[...string[], string]`).
		? TArray extends readonly [...infer Rest, infer Last]
			? _ArrayReverse<Rest, BeforeRestAcc, [...AfterRestAcc, Last], Result> // Accumulate elements that are present after the rest element in reverse order.
			: Result | [...AfterRestAcc, ...TArray, ...BeforeRestAcc] // Add the rest element between the accumulated elements.
		: TArray extends readonly [(infer First)?, ...infer Rest]
			? IsOptionalKeyOf<TArray, '0'> extends true
				? _ArrayReverse<
					Rest,
					[First | (If<IsExactOptionalPropertyTypesEnabled, never, undefined>), ...BeforeRestAcc], // Add `| undefined` for optional elements, if `exactOptionalPropertyTypes` is disabled.
					AfterRestAcc,
					Result | BeforeRestAcc
				>
				: _ArrayReverse<Rest, [First, ...BeforeRestAcc], AfterRestAcc, Result>
			: never;

export type ArrayReverse<TArray extends UnknownArray> = IfNotAnyOrNever<TArray, {
	ifNot: TArray extends unknown // For distributing `TArray`
		? _ArrayReverse<TArray> extends infer Result
			? If<IsArrayReadonly<TArray>, Readonly<Result>, Result>
			: never // Should never happen
		: never; // Should never happen
}>;
