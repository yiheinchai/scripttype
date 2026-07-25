/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/multidimensional-array.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type IsEqual<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Subtract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Recursive<T> = Array<Recursive<T>>;

export type MultidimensionalArray<Element, Dimensions extends number> = number extends Dimensions
	? Recursive<Element>
	: IsEqual<Dimensions, 0> extends true
		? Element
		: Array<MultidimensionalArray<Element, Subtract<Dimensions, 1>>>;
