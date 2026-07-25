/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/internal/numeric.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Finite<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IfNotAnyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsAnyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NegativeInfinity<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PositiveInfinity<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type IsNumberLike<N> =
	IfNotAnyOrNever<N, {
		ifNot: N extends number | `${number}`
			? true
			: false;
		ifAny: boolean;
		ifNever: false;
	}>;

export type InternalUnionMin<N extends number, T extends UnknownArray = []> =
	T['length'] extends N
		? T['length']
		: InternalUnionMin<N, [...T, unknown]>;

export type UnionMin<N extends number> =
	IsAnyOrNever<N> extends true ? N
		: number extends N ? number
			: NegativeInfinity extends N ? NegativeInfinity
				: [N] extends [PositiveInfinity] ? PositiveInfinity
					: InternalUnionMin<Finite<N>>;

export type InternalUnionMax<N extends number, T extends UnknownArray = []> =
	IsNever<N> extends true
		? T['length']
		: T['length'] extends N
			? InternalUnionMax<Exclude<N, T['length']>, T>
			: InternalUnionMax<N, [...T, unknown]>;

export type UnionMax<N extends number> =
	IsAnyOrNever<N> extends true ? N
		: number extends N ? number
			: PositiveInfinity extends N ? PositiveInfinity
				: [N] extends [NegativeInfinity] ? NegativeInfinity
					: InternalUnionMax<Finite<N>>;

export type ReverseSign<N extends number> =
	// Handle edge cases
	N extends 0
		? 0
		: N extends PositiveInfinity
			? NegativeInfinity
			: N extends NegativeInfinity
				? PositiveInfinity
				// Handle negative numbers
				: `${N}` extends `-${infer P extends number}`
					? P
					// Handle positive numbers
					: `-${N}` extends `${infer R extends number}`
						? R
						: never;
