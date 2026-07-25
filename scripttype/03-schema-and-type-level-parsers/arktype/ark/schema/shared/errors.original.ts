/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/schema/shared/errors.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ArkEnv<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ArkError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ArkErrors<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NodeKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Prerequisite<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type array<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type errorContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type merge<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type propwiseXor<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Handler<returns = unknown> = (errors: ArkErrors) => returns

export type ArkErrorCode = {
	[kind in NodeKind]: errorContext<kind> extends null ? never : kind
}[NodeKind]

export interface DerivableErrorContext<
	code extends ArkErrorCode = ArkErrorCode
> {
	expected: string
	actual: string
	problem: string
	message: string
	data: Prerequisite<code>
	path: array<PropertyKey>
	propString: string
}

export type DerivableErrorContextInput<
	code extends ArkErrorCode = ArkErrorCode
> = Partial<DerivableErrorContext<code>> &
	propwiseXor<
		{ path?: array<PropertyKey> },
		{ relativePath?: array<PropertyKey>; prefixPath?: array<PropertyKey> }
	>

export type ArkErrorContextInputsByCode = {
	[code in ArkErrorCode]: errorContext<code> & DerivableErrorContextInput<code>
}

export type ArkErrorContextInput<code extends ArkErrorCode = ArkErrorCode> =
	merge<ArkErrorContextInputsByCode[code], { meta?: ArkEnv.meta }>

export type NodeErrorContextInput<code extends ArkErrorCode = ArkErrorCode> =
	ArkErrorContextInputsByCode[code] & { meta: ArkEnv.meta }

export type MessageContext<code extends ArkErrorCode = ArkErrorCode> = Omit<
	ArkError<code>,
	"message"
>

export type ProblemContext<code extends ArkErrorCode = ArkErrorCode> = Omit<
	MessageContext<code>,
	"problem"
>

export type ProblemWriter<code extends ArkErrorCode = ArkErrorCode> = (
	context: ProblemContext<code>
) => string

export type ProblemConfig<code extends ArkErrorCode = ArkErrorCode> =
	| string
	| ProblemWriter<code>

export type MessageWriter<code extends ArkErrorCode = ArkErrorCode> = (
	context: MessageContext<code>
) => string

export type MessageConfig<code extends ArkErrorCode = ArkErrorCode> =
	| string
	| MessageWriter<code>

export type getAssociatedDataForError<code extends ArkErrorCode> =
	code extends NodeKind ? Prerequisite<code> : unknown

export type ExpectedWriter<code extends ArkErrorCode = ArkErrorCode> = (
	source: errorContext<code>
) => string

export type ExpectedConfig<code extends ArkErrorCode = ArkErrorCode> =
	| string
	| ExpectedWriter<code>

export type ActualWriter<code extends ArkErrorCode = ArkErrorCode> = (
	data: getAssociatedDataForError<code>
) => string

export type ActualConfig<code extends ArkErrorCode = ArkErrorCode> =
	| string
	| ActualWriter<code>
