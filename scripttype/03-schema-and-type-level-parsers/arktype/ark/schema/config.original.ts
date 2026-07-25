/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/schema/config.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ActualConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ArkErrorCode<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ArkErrors<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DescriptionWriter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExpectedConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MessageConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NodeKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ProblemConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Readonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ToJsonSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypeMeta<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UndeclaredKeyBehavior<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type show<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type nodeConfigForKind<kind extends NodeKind> = Readonly<
	show<
		{
			description?: DescriptionWriter<kind>
		} & (kind extends ArkErrorCode ?
			{
				expected?: ExpectedConfig<kind>
				actual?: ActualConfig<kind>
				problem?: ProblemConfig<kind>
				message?: MessageConfig<kind>
			}
		:	{})
	>
>

export type NodeConfigsByKind = {
	[kind in NodeKind]: nodeConfigForKind<kind>
}

export type NodeConfig<kind extends NodeKind = NodeKind> =
	NodeConfigsByKind[kind]

export type CloneImplementation = <original extends object>(
	original: original
) => original

export interface ArkSchemaConfig extends Partial<Readonly<NodeConfigsByKind>> {
	readonly jitless?: boolean
	readonly clone?: boolean | CloneImplementation
	readonly onUndeclaredKey?: UndeclaredKeyBehavior
	readonly numberAllowsNaN?: boolean
	readonly dateAllowsInvalid?: boolean
	readonly exactOptionalPropertyTypes?: boolean
	readonly onFail?: ArkErrors.Handler | null
	readonly keywords?: Record<string, TypeMeta.Collapsible | undefined>
	readonly toJsonSchema?: ToJsonSchema.Options
}

export type resolveConfig<config extends ArkSchemaConfig> = show<
	{
		[k in keyof ArkSchemaConfig]-?: k extends NodeKind ? Required<config[k]>
		: k extends "clone" ? CloneImplementation | false
		: k extends "keywords" ? Record<string, TypeMeta | undefined>
		: k extends "toJsonSchema" ? ToJsonSchema.Context
		: config[k]
	} & Omit<config, keyof ArkSchemaConfig>
>
