/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/objectLiteral.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Backslash<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ErrorMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ErrorType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OptionalPropertyDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type anyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type merge<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type show<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type validateProperty<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type validateString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type writeInvalidPropertyKeyMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type EntryKeyKind = "required" | "optional" | "index"

export type normalizedKeyKind<kind extends EntryKeyKind> =
	kind extends "index" ? string : Key

export type PreparsedEntryKey<
	kind extends EntryKeyKind = EntryKeyKind,
	normalized extends normalizedKeyKind<kind> = normalizedKeyKind<kind>
> = {
	kind: kind
	normalized: normalized
}

export type SpecialKeyKind = "spread" | "undeclared"

export type PreparsedSpecialKey<kind extends SpecialKeyKind = SpecialKeyKind> =
	{
		kind: kind
	}

export type PreparsedKey = PreparsedEntryKey | PreparsedSpecialKey

export type MetaKey = "..." | "+"

export type IndexKey<def extends string = string> = `[${def}]`

export type preparseKey<k> =
	k extends symbol ?
		PreparsedKey.from<{
			kind: "required"
			normalized: k
		}>
	: k extends `${infer inner}?` ?
		inner extends `${infer baseName}${Backslash}` ?
			PreparsedKey.from<{
				kind: "required"
				normalized: `${baseName}?`
			}>
		:	PreparsedKey.from<{
				kind: "optional"
				normalized: inner
			}>
	: k extends "+" ? { kind: "undeclared" }
	: k extends "..." ? { kind: "spread" }
	: k extends `${Backslash}${infer escapedMeta extends MetaKey}` ?
		PreparsedKey.from<{ kind: "required"; normalized: escapedMeta }>
	: k extends IndexKey<infer def> ?
		PreparsedKey.from<{
			kind: "index"
			normalized: def
		}>
	:	PreparsedKey.from<{
			kind: "required"
			normalized: k extends (
				`${Backslash}${infer escapedIndexKey extends IndexKey}`
			) ?
				escapedIndexKey
			: k extends Key ? k
			: `${k & number}`
		}>

export type nonOptionalKeyFromEntry<k extends PropertyKey, v, $, args> =
	// inferring into parsedKey with no extends check seems to
	// help TS preserve homomorphic mapping for required keys
	preparseKey<k> extends infer parsedKey ?
		parsedKey extends PreparsedEntryKey<"required"> ?
			[v] extends [OptionalPropertyDefinition] ?
				[v] extends [anyOrNever] ?
					parsedKey["normalized"]
				:	never
			:	parsedKey["normalized"]
		: parsedKey extends PreparsedEntryKey<"index"> ?
			inferDefinition<parsedKey["normalized"], $, args> & Key
		:	// optional keys are not included by definition
			// "..." is handled at the type root so is handled neither here nor in optionalKeyFrom
			// "+" has no effect on inference
			never
	:	never

export type optionalKeyFromEntry<k extends PropertyKey, v> =
	// inferring into parsedKey with no extends check seems to
	// help TS preserve homomorphic mapping for value-optional keys
	preparseKey<k> extends infer parsedKey ?
		parsedKey extends PreparsedEntryKey<"optional"> ? parsedKey["normalized"]
		: v extends OptionalPropertyDefinition ? k
		: never
	:	never

export type _inferObjectLiteral<def extends object, $, args> = {
	// since def is a const parameter, we remove the readonly modifier here
	// support for built-in readonly tracked here:
	// https://github.com/arktypeio/arktype/issues/808
	-readonly [k in keyof def as nonOptionalKeyFromEntry<
		k,
		def[k],
		$,
		args
	>]: inferDefinition<def[k], $, args>
} & {
	-readonly [k in keyof def as optionalKeyFromEntry<
		k,
		def[k]
	>]?: def[k] extends OptionalPropertyDefinition<infer baseDef> ?
		inferDefinition<baseDef, $, args>
	:	inferDefinition<def[k], $, args>
}

export type inferObjectLiteral<def extends object, $, args> = show<
	"..." extends keyof def ?
		merge<
			inferDefinition<def["..."], $, args>,
			_inferObjectLiteral<def, $, args>
		>
	:	_inferObjectLiteral<def, $, args>
>

export type validateObjectLiteral<def, $, args> = {
	[k in keyof def]: preparseKey<k> extends (
		infer parsedKey extends PreparsedKey
	) ?
		parsedKey extends PreparsedEntryKey<"index"> ?
			validateString<parsedKey["normalized"], $, args> extends (
				ErrorMessage<infer message>
			) ?
				// add a nominal type here to avoid allowing the error message as input
				ErrorType<message>
			: inferDefinition<parsedKey["normalized"], $, args> extends Key ?
				// if the index def is syntactically and semantically valid,
				// move on to the validating the value definition
				validateProperty<def[k], parsedKey["kind"], $, args>
			:	ErrorMessage<writeInvalidPropertyKeyMessage<parsedKey["normalized"]>>
		:	validateProperty<def[k], parsedKey["kind"], $, args>
	:	never
}

export type from<t extends PreparsedKey> = t

export type writeInvalidSpreadTypeMessage<def extends string> =
	`Spread operand must resolve to an object literal type (was ${def})`
