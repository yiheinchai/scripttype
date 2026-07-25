/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/fast-check/arbitraries/proto.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Ctx<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DomainInputNode<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type fc<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type nodeOfKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ProtoInputNode = nodeOfKind<"intersection"> | nodeOfKind<"domain">

export type ProtoArbitrary<t = unknown> = (
	node: ProtoInputNode | DomainInputNode,
	ctx: Ctx
) => fc.Arbitrary<t>
