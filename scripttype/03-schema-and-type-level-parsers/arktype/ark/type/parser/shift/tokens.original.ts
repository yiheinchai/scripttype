/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/shift/tokens.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Scanner<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type terminatingChars<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TerminatingChar = keyof typeof terminatingChars

export type lookaheadIsFinalizing<
	lookahead extends string,
	unscanned extends string
> =
	lookahead extends ">" ?
		unscanned extends `=${infer nextUnscanned}` ?
			nextUnscanned extends `=${string}` ?
				true
			:	false
		: Scanner.skipWhitespace<unscanned> extends (
			"" | `${TerminatingChar}${string}`
		) ?
			true
		:	false
	: lookahead extends "=" ?
		unscanned extends `=${string}` ?
			false
		:	true
	: lookahead extends "," | "?" ? true
	: false
