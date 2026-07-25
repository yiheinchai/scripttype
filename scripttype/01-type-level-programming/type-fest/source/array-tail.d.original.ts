/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/array-tail.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type If<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IfNotAnyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsArrayReadonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Readonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _ArrayTail<TArray extends UnknownArray> = TArray extends readonly [unknown?, ...infer Tail]
	? keyof TArray & `${number}` extends never
		? TArray extends readonly []
			? []
			: TArray // Happens when `TArray` is a non-tuple array (e.g., `string[]`) or has a leading rest element (e.g., `[...string[], number]`)
		: Tail
	: [];

export type ArrayTail<TArray extends UnknownArray> = IfNotAnyOrNever<TArray, {
	ifNot: TArray extends UnknownArray // For distributing `TArray`
		? _ArrayTail<TArray> extends infer Result
			? If<IsArrayReadonly<TArray>, Readonly<Result>, Result>
			: never // Should never happen
		: never;
}>;
