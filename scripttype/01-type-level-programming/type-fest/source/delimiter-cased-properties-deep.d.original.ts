/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/delimiter-cased-properties-deep.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ApplyDefaultOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type DelimiterCase<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type NonRecursiveType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Required<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnknownArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type WordsOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type _DefaultDelimiterCaseOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type DelimiterCasedPropertiesArrayDeep<
	Value extends UnknownArray,
	Delimiter extends string,
	Options extends Required<WordsOptions>,
> = Value extends []
	? []
	// Trailing spread array
	:	Value extends [infer U, ...infer V]
		? [_DelimiterCasedPropertiesDeep<U, Delimiter, Options>, ..._DelimiterCasedPropertiesDeep<V, Delimiter, Options>]
		: Value extends readonly [infer U, ...infer V]
			? readonly [_DelimiterCasedPropertiesDeep<U, Delimiter, Options>, ..._DelimiterCasedPropertiesDeep<V, Delimiter, Options>]
			// Leading spread array
			: Value extends [...infer U, infer V]
				? [..._DelimiterCasedPropertiesDeep<U, Delimiter, Options>, _DelimiterCasedPropertiesDeep<V, Delimiter, Options>]
				: Value extends readonly [...infer U, infer V]
					? readonly [..._DelimiterCasedPropertiesDeep<U, Delimiter, Options>, _DelimiterCasedPropertiesDeep<V, Delimiter, Options>]
					// Array
					: Value extends Array<infer U>
						? Array<_DelimiterCasedPropertiesDeep<U, Delimiter, Options>>
						: Value extends ReadonlyArray<infer U>
							? ReadonlyArray<_DelimiterCasedPropertiesDeep<U, Delimiter, Options>>
							: never;

export type _DelimiterCasedPropertiesDeep<
	Value,
	Delimiter extends string,
	Options extends Required<WordsOptions>,
> = Value extends NonRecursiveType
	? Value
	: Value extends UnknownArray
		? DelimiterCasedPropertiesArrayDeep<Value, Delimiter, Options>
		: Value extends Set<infer U>
			? Set<_DelimiterCasedPropertiesDeep<U, Delimiter, Options>>
			: Value extends object
				? {
					[K in keyof Value as DelimiterCase<K, Delimiter, Options>]:
					_DelimiterCasedPropertiesDeep<Value[K], Delimiter, Options>
				}
				: Value;

export type DelimiterCasedPropertiesDeep<
	Value,
	Delimiter extends string,
	Options extends WordsOptions = {},
> = _DelimiterCasedPropertiesDeep<Value, Delimiter, ApplyDefaultOptions<WordsOptions, _DefaultDelimiterCaseOptions, Options>>;
