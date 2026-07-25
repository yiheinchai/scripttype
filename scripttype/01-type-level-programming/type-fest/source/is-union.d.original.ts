/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/is-union.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type IsEqual<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type InternalIsUnion<T, U = T> =
	(
		IsNever<T> extends true
			? false
			: T extends any
				? IsEqual<U, T> extends true
					? false
					: true
				: never
	) extends infer Result
	// In some cases `Result` will return `false | true` which is `boolean`,
	// that means `T` has at least two types and it's a union type,
	// so we will return `true` instead of `boolean`.
		? boolean extends Result ? true
			: Result
		: never;

export type IsUnion<T> = InternalIsUnion<T>;
