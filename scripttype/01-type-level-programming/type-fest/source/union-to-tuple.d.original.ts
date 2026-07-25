/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/union-to-tuple.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ExcludeExactly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnionMember<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _UnionToTuple<Union, Accumulator extends UnknownArray = [], Member = UnionMember<Union>> =
	IsNever<Union> extends true
		? Accumulator
		: _UnionToTuple<ExcludeExactly<Union, Member>, [Member, ...Accumulator]>;

export type UnionToTuple<Union> =
	_UnionToTuple<Union> extends infer Result extends UnknownArray ? Result : never;
