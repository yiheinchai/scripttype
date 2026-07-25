/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/schema/module.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseRoot<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InternalResolution<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type anyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type instantiateRoot<t> =
	t extends InternalResolution ?
		[t] extends [anyOrNever] ?
			BaseRoot
		:	t
	:	BaseRoot

export type exportSchemaScope<$> = {
	[k in keyof $]: instantiateRoot<$[k]>
}
