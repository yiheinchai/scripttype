/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/string-to-number.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type IfNotAnyOrNever<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type NegativeInfinity<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PositiveInfinity<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type _StringToNumber<S extends string> =
	S extends `${infer N extends number}`
		? number extends N
			? `${number}` extends S
				? N
				: never
			: N
		: string extends S
			? number
			: S extends 'Infinity'
				? PositiveInfinity
				: S extends '-Infinity'
					? NegativeInfinity
					: never;

export type StringToNumber<S extends string> = IfNotAnyOrNever<S, {ifNot: _StringToNumber<S>; ifAny: number}>;
