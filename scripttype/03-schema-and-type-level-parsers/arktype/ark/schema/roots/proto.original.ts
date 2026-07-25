/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/schema/roots/proto.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BuiltinObjectKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Constructor<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Reference = Constructor | BuiltinObjectKind

export interface ExpandedSchema<proto extends Reference = Reference> {
		readonly proto: proto
		readonly dateAllowsInvalid?: boolean
	}

export type Schema<proto extends Reference = Reference> =
		| proto
		| ExpandedSchema<proto>
