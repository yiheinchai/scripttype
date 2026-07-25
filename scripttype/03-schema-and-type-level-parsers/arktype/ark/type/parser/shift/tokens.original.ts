/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/shift/tokens.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Scanner<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type terminatingChars<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
