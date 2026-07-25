/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/util/numbers.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type NumberLiteral<n extends number = number> = `${n}`

export type BigintLiteral<n extends bigint = bigint> = `${n}n`

export type IntegerLiteral<n extends bigint = bigint> = `${n}`

export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type NonNegativeIntegerLiteral<n extends bigint = bigint> =
	| `${Digit}`
	| (`${Exclude<Digit, 0>}${string}` & `${n}`)

export type NumericLiteralKind = "number" | "bigint" | "integer"

export type numericLiteralDescriptions = typeof numericLiteralDescriptions

export type writeMalformedNumericLiteralMessage<
	def extends string,
	kind extends NumericLiteralKind
> = `'${def}' was parsed as ${numericLiteralDescriptions[kind]} but could not be narrowed to a literal value. Avoid unnecessary leading or trailing zeros and other abnormal notation`

export type tryParseNumber<token extends string, messageOnFail extends string> =
	token extends `${infer n extends number}` ?
		number extends n ?
			writeMalformedNumericLiteralMessage<token, "number">
		:	n
	:	messageOnFail

export type parseNumber<token extends string> =
	token extends `${infer n extends number}` ? n : never

export type tryParseInteger<
	token extends string,
	messageOnFail extends string
> =
	token extends `${infer b extends bigint}` ?
		bigint extends b ? writeMalformedNumericLiteralMessage<token, "integer">
		: token extends `${infer n extends number}` ? n
		: never
	:	messageOnFail

export type parseInteger<token extends string> =
	token extends `${bigint}` ?
		token extends `${infer n extends number}` ?
			n
		:	never
	:	never

export type parseNonNegativeInteger<token extends string> =
	token extends `-${string}` ? never : parseInteger<token>

export type NumericParseOptions<errorOnFail extends boolean | string> = {
	errorOnFail?: errorOnFail
	strict?: boolean
}
