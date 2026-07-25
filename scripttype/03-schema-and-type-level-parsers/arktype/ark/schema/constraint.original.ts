/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/schema/constraint.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Capitalize<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ConstraintKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Disjoint<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Prerequisite<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type describe<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type kindLeftOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type nodeOfKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type constraintKindLeftOf<kind extends ConstraintKind> = ConstraintKind &
	kindLeftOf<kind>

export type constraintKindOrLeftOf<kind extends ConstraintKind> =
	| kind
	| constraintKindLeftOf<kind>

export type intersectConstraintKinds<
	l extends ConstraintKind,
	r extends ConstraintKind
> = nodeOfKind<l | r | "unit" | "union"> | Disjoint | null

export type writeInvalidOperandMessage<
	kind extends ConstraintKind,
	actual
> = `${Capitalize<kind>} operand must be ${describe<
	Prerequisite<kind>
>} (was ${describe<Exclude<actual, Prerequisite<kind>>>})`
