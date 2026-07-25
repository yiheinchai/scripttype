/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/shift/operator/default.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BigintLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EnclosingLiteralStartToken<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EnclosingLiteralTokens<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ErrorMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NumberLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Scanner<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type trim<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type UnitLiteralKeyword = "null" | "undefined" | "true" | "false"

export type UnenclosedUnitLiteral =
	| BigintLiteral
	| NumberLiteral
	| UnitLiteralKeyword

export type isValidEnclosedLiteral<
	start extends EnclosingLiteralStartToken,
	unscanned extends string
> =
	Scanner.shiftUntilEscapable<
		unscanned,
		EnclosingLiteralTokens[start],
		""
	> extends Scanner.shiftResult<string, infer nextUnscanned> ?
		nextUnscanned extends EnclosingLiteralTokens[start] ?
			true
		:	false
	:	false

export type writeNonLiteralDefaultMessage<defaultDef extends string> =
	`Default value '${defaultDef}' must be a literal value`

export type parseDefault<root, unscanned extends string> =
	// default values must always appear at the end of a string definition,
	// so parse the rest of the string and ensure it is a valid unit literal
	trim<unscanned> extends infer defaultExpression extends string ?
		defaultExpression extends UnenclosedUnitLiteral ?
			[root, "=", defaultExpression]
		: defaultExpression extends (
			`${infer start extends EnclosingLiteralStartToken}${string}`
		) ?
			defaultExpression extends `${start}${infer nextUnscanned}` ?
				isValidEnclosedLiteral<start, nextUnscanned> extends true ?
					[root, "=", defaultExpression]
				:	ErrorMessage<writeNonLiteralDefaultMessage<defaultExpression>>
			:	never
		:	ErrorMessage<writeNonLiteralDefaultMessage<defaultExpression>>
	:	never
