/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/schema/roots/union.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseRoot<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Domain<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RegisteredReference<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SerializedPrimitive<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type nodeOfKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type show<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type DiscriminantKinds = {
	domain: Domain
	unit: SerializedPrimitive | RegisteredReference
}

export type DiscriminantKind = show<keyof DiscriminantKinds>

export type CaseKey<kind extends DiscriminantKind = DiscriminantKind> =
	DiscriminantKind extends kind ? string : DiscriminantKinds[kind] | "default"

export type DiscriminantLocation<kind extends DiscriminantKind = DiscriminantKind> = {
	path: PropertyKey[]
	optionallyChainedPropString: string
	kind: kind
}

export type CaseContext = {
	branchIndices: number[]
	condition: nodeOfKind<DiscriminantKind> | Domain.Enumerable
}

export type CandidateCases<kind extends DiscriminantKind = DiscriminantKind> = {
	[caseKey in CaseKey<kind>]: CaseContext
}

export type DiscriminantCandidate<kind extends DiscriminantKind = DiscriminantKind> = {
	path: PropertyKey[]
	kind: kind
	cases: CandidateCases<kind>
}

export type DiscriminatedCases<
	kind extends DiscriminantKind = DiscriminantKind
> = {
	[caseKey in CaseKey<kind>]: BaseRoot | true
}
