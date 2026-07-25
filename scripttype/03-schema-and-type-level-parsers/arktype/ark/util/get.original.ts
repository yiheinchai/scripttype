/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/util/get.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type keyOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type getKey<o, k> =
	k extends keyof o ? o[k]
	: k extends `${infer n extends number & keyof o}` ? o[n]
	: never

export type getPath<o, path extends string> =
	path extends `${infer head}.${infer tail}` ? getPath<getKey<o, head>, tail>
	:	getKey<o, path>

export type validatePath<o, path extends string, prefix extends string = ""> =
	path extends `${infer head}.${infer tail}` ?
		head extends keyOf<o> ?
			validatePath<getKey<o, head>, tail, `${prefix}${head}.`>
		:	`Key '${head}' is not valid following '${prefix}'`
	:	{
			// find suffixes that would make the segment valid
			[k in keyOf<o>]: k extends `${path}${string}` ? `${prefix}${k}` : never
		}[keyOf<o>]
