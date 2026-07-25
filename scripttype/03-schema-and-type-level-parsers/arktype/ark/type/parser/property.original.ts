/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/property.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ErrorMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ErrorType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ParsedKeyKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UndeclaredKeyBehavior<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type anyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type parseString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type typeToString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type validateInnerDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type writeInvalidSpreadTypeMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type OptionalPropertyTuple<baseDef = unknown> = readonly [baseDef, "?"]

export type OptionalPropertyString<baseDef extends string = string> =
	`${baseDef}?`

export type OptionalPropertyDefinition<baseDef = unknown> =
	| OptionalPropertyTuple<baseDef>
	| OptionalPropertyString<baseDef & string>

export type invalidOptionalKeyKindMessage = typeof invalidOptionalKeyKindMessage

export type DefaultablePropertyTuple<
	baseDef = unknown,
	thunkableProperty = unknown
> = readonly [baseDef, "=", thunkableProperty]

export type PossibleDefaultableStringDefinition = `${string}=${string}`

export type isDefaultable<def, $, args> =
	def extends DefaultablePropertyTuple ? true
	: def extends PossibleDefaultableStringDefinition ?
		parseString<def, $, args> extends DefaultablePropertyTuple ?
			true
		:	false
	:	false

export type invalidDefaultableKeyKindMessage =
	typeof invalidDefaultableKeyKindMessage

export type validateProperty<def, keyKind extends ParsedKeyKind, $, args> =
	[def] extends [anyOrNever] ?
		/** this extra [anyOrNever] check is required to ensure that nested `type` invocations
		 * like the following are not prematurely validated by the outer call:
		 *
		 * ```ts
		 * type({
		 * 	"test?": type("string").pipe(x => x === "true")
		 * })
		 * ```
		 */
		def
	: keyKind extends "spread" ?
		def extends validateInnerDefinition<def, $, args> ?
			inferDefinition<def, $, args> extends object ?
				def
			:	ErrorType<
					writeInvalidSpreadTypeMessage<
						typeToString<inferDefinition<def, $, args>>
					>
				>
		:	validateInnerDefinition<def, $, args>
	: keyKind extends "undeclared" ? UndeclaredKeyBehavior
	: keyKind extends "required" ? validateInnerDefinition<def, $, args>
	: // check to ensure we don't have an optional or defaultable value on
	// an already optional or index key
	def extends OptionalPropertyDefinition ?
		ErrorMessage<invalidOptionalKeyKindMessage>
	: isDefaultable<def, $, args> extends true ?
		ErrorMessage<invalidDefaultableKeyKindMessage>
	:	validateInnerDefinition<def, $, args>
