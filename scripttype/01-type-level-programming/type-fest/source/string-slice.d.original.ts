/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/string-slice.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ArraySlice<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Join<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StringToArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type StringSlice<
	S extends string,
	Start extends number = never,
	End extends number = never,
> = string extends S
	? string
	: ArraySlice<StringToArray<S>, Start, End> extends infer R extends readonly string[]
		? Join<R, ''>
		: never;
