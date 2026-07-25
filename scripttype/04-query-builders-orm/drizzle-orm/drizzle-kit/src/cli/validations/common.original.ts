/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-kit/src/cli/validations/common.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnionToIntersection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

export type LastTupleElement<TArr extends any[]> = TArr extends [
	...start: infer _,
	end: infer Last,
] ? Last
	: never;

export type UniqueArrayOfUnion<TUnion, TArray extends TUnion[]> = Exclude<
	TUnion,
	TArray[number]
> extends never ? [TUnion]
	: [...TArray, Exclude<TUnion, TArray[number]>];
