/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/is-string-literal.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type CollapseLiterals<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IfNotAnyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnwrapBrand<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _IsStringLiteral<S> =
	// If `S` is an infinite string type (e.g., `on${string}`), `Record<S, never>` produces an index signature,
	// and since `{}` extends index signatures, the result becomes `false`.
	S extends string
		? {} extends Record<S, never>
			? false
			: true
		: false;

export type IsStringLiteral<S> = IfNotAnyOrNever<S, {
	ifNot: _IsStringLiteral<CollapseLiterals<UnwrapBrand<S>>>;
	ifAny: false;
	ifNever: false;
}>;
