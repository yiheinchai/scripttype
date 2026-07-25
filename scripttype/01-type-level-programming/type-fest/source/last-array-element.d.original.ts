/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/last-array-element.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type If<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IfNotAnyOrNever<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsExactOptionalPropertyTypesEnabled<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SplitOnRestElement<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnknownArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type BeforeRestLastElement<BeforeRest extends UnknownArray, Accumulator = never> =
	BeforeRest extends readonly []
		? Accumulator | undefined
		: BeforeRest extends readonly [...any, infer Last]
			? Last | Accumulator
			: BeforeRest extends readonly [...infer Rest, (infer Last)?]
				? BeforeRestLastElement<
					Rest,
					// Add `undefined` for optional elements, if `exactOptionalPropertyTypes` is disabled.
					Last | Accumulator | If<IsExactOptionalPropertyTypesEnabled, never, undefined>
				>
				: never;

export type _LastArrayElement<BeforeRest extends UnknownArray, Rest extends UnknownArray, AfterRest extends UnknownArray> =
	AfterRest extends readonly [...any, infer Last] // Note there are no optional elements in `AfterRest`.
		? Last // If there's a `Last` in `AfterRest`, then that's the result.
		: Rest[number] | BeforeRestLastElement<BeforeRest>;

export type LastArrayElement<TArray extends UnknownArray> =
	IfNotAnyOrNever<TArray, {
		ifNot: TArray extends UnknownArray // For distributing `TArray`
			? SplitOnRestElement<TArray> extends readonly [infer BeforeRest extends UnknownArray, infer Rest extends UnknownArray, infer AfterRest extends UnknownArray]
				? _LastArrayElement<BeforeRest, Rest, AfterRest>
				: never
			: never;
	}>;
