/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/is-numeric-literal.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type CollapseLiterals<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IfNotAnyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnwrapBrand<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _IsNumericLiteral<T> = T extends number | bigint
	? number extends T
		? false
		: bigint extends T
			? false
			: true
	: false;

export type IsNumericLiteral<T> = IfNotAnyOrNever<T, {
	ifNot: _IsNumericLiteral<CollapseLiterals<UnwrapBrand<T>>>;
	ifAny: false;
	ifNever: false;
}>;
