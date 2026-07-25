/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/attest/assert/chainableAssertions.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Completions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Constructor<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ErrorType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Omit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type isDisjoint<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type snapshot<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type type<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type AssertionKind = "value" | "type"

export type inferredAssertions<
	argsType extends [value: any, ...rest: any[]],
	kind extends AssertionKind,
	chained = argsType[0]
> = rootAssertions<chained, kind> &
	(<Args extends argsType | [] = []>(...args: Args) => nextAssertions<kind>)

export type valueFromTypeAssertion<
	expected,
	chained = expected
> = inferredAssertions<[expected: expected], "value", chained>

export type UnwrapOptions = {
	versionable?: boolean
	serialize?: boolean
}

export type Unwrapper<expected = unknown> = (opts?: UnwrapOptions) => expected

export interface CompletionsSnap {
	(value?: Completions): void
	unwrap: Unwrapper<Completions>
}

export type TypeAssertionProps = {
	toString: valueFromTypeAssertion<string | RegExp>
	errors: valueFromTypeAssertion<string | RegExp, string>
	completions: CompletionsSnap
}

export type TypeAssertionsRoot = {
	type: TypeAssertionProps
}

export type nextAssertions<kind extends AssertionKind> =
	"type" extends kind ? TypeAssertionsRoot : {}

export type ExternalSnapshotOptions = {
	path?: string
}

export type snapProperty<expected, kind extends AssertionKind> = {
	(expected?: snapshot<expected>): nextAssertions<kind>
	toFile: (
		id: string,
		options?: ExternalSnapshotOptions
	) => nextAssertions<kind>
	unwrap: Unwrapper<expected>
}

export type nonOverlappingSatisfiesMessage =
	typeof nonOverlappingSatisfiesMessage

export type validateExpectedOverlaps<expected, satisfies> =
	isDisjoint<expected, satisfies> extends true ?
		ErrorType<nonOverlappingSatisfiesMessage>
	:	unknown

export type comparableValueAssertion<expected, kind extends AssertionKind> = {
	snap: snapProperty<expected, kind>
	equals: (value: expected) => nextAssertions<kind>
	instanceOf: (constructor: Constructor) => nextAssertions<kind>
	is: (value: expected) => nextAssertions<kind>
	completions: CompletionsSnap
	jsdoc: comparableValueAssertion<string, kind>
	satisfies: <const def>(
		def: type.validate<def> &
			validateExpectedOverlaps<expected, type.infer.In<def>>
	) => nextAssertions<kind>
	// This can be used to assert values without type constraints
	unknown: Omit<comparableValueAssertion<unknown, kind>, "unknown">
	unwrap: Unwrapper<expected>
}

export type functionAssertions<kind extends AssertionKind> = {
	throws: inferredAssertions<[message: string | RegExp], kind, string>
} & ("type" extends kind ?
	{
		throwsAndHasTypeError: (message: string | RegExp) => undefined
	}
:	{})

export type valueAssertions<
	t,
	kind extends AssertionKind
> = comparableValueAssertion<t, kind> &
	([t] extends [() => unknown] ? functionAssertions<kind> : {})

export type rootAssertions<t, kind extends AssertionKind> = valueAssertions<
	t,
	kind
> &
	TypeAssertionsRoot
