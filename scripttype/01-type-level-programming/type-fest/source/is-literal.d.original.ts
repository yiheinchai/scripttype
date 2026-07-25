/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/is-literal.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type CollapseLiterals<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IfNotAnyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsBooleanLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNumericLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsStringLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsSymbolLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnwrapBrand<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type IsLiteralNonBools<T> =
	T extends number | bigint
		? IsNumericLiteral<T>
		: T extends string
			? IsStringLiteral<T>
			: T extends symbol
				? IsSymbolLiteral<T>
				: false;

export type _IsLiteral<T> =
	| (Extract<T, boolean> extends infer Bools
		// We can't instantiate `IsBooleanLiteral` with `never`,
		// because that will add an extraneous `false` to the result if there are no booleans.
		? IsNever<Bools> extends true
			? never
			: IsBooleanLiteral<Bools>
		: never)
	| (IsLiteralNonBools<Exclude<T, boolean>>);

export type IsLiteral<T> = IfNotAnyOrNever<T, {
	ifNot: _IsLiteral<CollapseLiterals<UnwrapBrand<T>>>;
	ifAny: false;
	ifNever: false;
}>;
