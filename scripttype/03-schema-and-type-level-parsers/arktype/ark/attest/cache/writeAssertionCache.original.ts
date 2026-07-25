/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/attest/cache/writeAssertionCache.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type LinePosition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TypeAssertionKind = "bench" | "type"

export type LinePositionRange = {
	start: LinePosition
	end: LinePosition
}

export type TypeBenchmarkingAssertionData = {
	location: LinePositionRange
	count: number
}

export type TypeRelationship = "subtype" | "supertype" | "equality" | "none"

export type ArgAssertionData = {
	type: string
	relationships: {
		args: TypeRelationship[]
		typeArgs: TypeRelationship[]
	}
}

export type Completions = Record<string, string[]> | string

export type TypeRelationshipAssertionData = {
	location: LinePositionRange
	args: ArgAssertionData[]
	typeArgs: ArgAssertionData[]
	errors: string[]
	completions: Completions
	/** JSDoc comment for the first argument, if any */
	jsdoc?: string
}

export type TypeAssertionData<
	kind extends TypeAssertionKind = TypeAssertionKind
> =
	kind extends "bench" ? TypeBenchmarkingAssertionData
	:	TypeRelationshipAssertionData
