/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/numeric.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type IsFloat<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsInteger<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type PositiveInfinity = 1e999;

export type NegativeInfinity = -1e999;

export type Finite<T extends number> = T extends PositiveInfinity | NegativeInfinity ? never : T;

export type Integer<T> =
	T extends unknown // To distributive type
		? IsInteger<T> extends true ? T : never
		: never;

export type Float<T> =
	T extends unknown // To distributive type
		? IsFloat<T> extends true ? T : never
		: never;

export type _Numeric = number | bigint;

export type Zero = 0 | 0n;

export type Negative<T extends _Numeric> = T extends Zero ? never : `${T}` extends `-${string}` ? T : never;

export type NegativeFloat<T extends number> = Negative<Float<T>>;

export type NegativeInteger<T extends number> = Negative<Integer<T>>;

export type NonNegative<T extends _Numeric> = T extends Zero ? T : Negative<T> extends never ? T : never;

export type NonNegativeInteger<T extends number> = NonNegative<Integer<T>>;

export type IsNegative<T extends _Numeric> = T extends Negative<T> ? true : false;
