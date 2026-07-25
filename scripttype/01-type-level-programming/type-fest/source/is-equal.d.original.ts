/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/is-equal.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type _IsEqual<A, B> =
	(<G>() => G extends A & G | G ? 1 : 2) extends
	(<G>() => G extends B & G | G ? 1 : 2)
		? true
		: false;

export type IsEqual<A, B> =
	[A] extends [B]
		? [B] extends [A]
			? _IsEqual<A, B>
			: false
		: false;
