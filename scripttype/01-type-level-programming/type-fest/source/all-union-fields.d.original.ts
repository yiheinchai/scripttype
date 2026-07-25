/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/all-union-fields.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type KeysOfUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonRecursiveType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyKeysOfUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlySet<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SharedUnionFields<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Simplify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ValueOfUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type AllUnionFields<Union> =
	Extract<Union, NonRecursiveType | ReadonlyMap<unknown, unknown> | ReadonlySet<unknown> | UnknownArray> extends infer SkippedMembers
		? Exclude<Union, SkippedMembers> extends infer RelevantMembers
			? // eslint-disable-line @stylistic/operator-linebreak
			| SkippedMembers
			| Simplify<
				// Include fields that are common in all union members
				SharedUnionFields<RelevantMembers>
				// Include readonly fields present in any union member
				& {
					readonly [P in ReadonlyKeysOfUnion<RelevantMembers>]?: ValueOfUnion<RelevantMembers, P & KeysOfUnion<RelevantMembers>>
				}
				// Include remaining fields that are neither common nor readonly
				& {
					[P in Exclude<KeysOfUnion<RelevantMembers>, ReadonlyKeysOfUnion<RelevantMembers> | keyof RelevantMembers>]?: ValueOfUnion<RelevantMembers, P>
				}
			>
			: never
		: never;
