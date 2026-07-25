/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/schema/parse.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseRoot<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Brand<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type NodeId = Brand<string, "NodeId">

export type ContextualArgs = Record<string, BaseRoot | NodeId>

export type BaseParseOptions<prereduced extends boolean = boolean> = {
	alias?: string
	prereduced?: prereduced
	args?: ContextualArgs
	id?: NodeId
}
