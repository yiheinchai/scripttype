/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/internal/string.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type StringLength<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Trim<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TupleOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Whitespace<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ToString<T> = T extends string | number ? `${T}` : never;

export type StartsWith<S extends string, SearchString extends string> = string extends S | SearchString
	? never
	: S extends `${SearchString}${infer T}`
		? true
		: false;

export type IsWhitespace<T extends string> = T extends Whitespace
	? true
	: T extends `${Whitespace}${infer Rest}`
		? IsWhitespace<Rest>
		: false;

export type IsNumeric<T extends string> = T extends `${number}`
	? Trim<T> extends T
		? true
		: false
	: false;

export type NumericString = '0123456789';

export type PositiveNumericCharacterGt<A extends string, B extends string> = NumericString extends `${infer HeadA}${A}${infer TailA}`
	? NumericString extends `${infer HeadB}${B}${infer TailB}`
		? HeadA extends `${HeadB}${infer _}${infer __}`
			? true
			: false
		: never
	: never;

export type SameLengthPositiveNumericStringGt<A extends string, B extends string> = A extends `${infer FirstA}${infer RestA}`
	? B extends `${infer FirstB}${infer RestB}`
		? FirstA extends FirstB
			? SameLengthPositiveNumericStringGt<RestA, RestB>
			: PositiveNumericCharacterGt<FirstA, FirstB>
		: never
	: false;

export type PositiveNumericStringGt<A extends string, B extends string> = A extends B
	? false
	: [TupleOf<StringLength<A>, 0>, TupleOf<StringLength<B>, 0>] extends infer R extends [readonly unknown[], readonly unknown[]]
		? R[0] extends [...R[1], ...infer Remain extends readonly unknown[]]
			? 0 extends Remain['length']
				? SameLengthPositiveNumericStringGt<A, B>
				: true
			: false
		: never;
