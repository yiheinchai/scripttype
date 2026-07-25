/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/util/scanner.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Backslash<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type WhitespaceChar<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type shift<
		lookahead extends string,
		unscanned extends string
	> = `${lookahead}${unscanned}`

export type shiftUntil<
		unscanned extends string,
		terminator extends string,
		appendTo extends string = ""
	> =
		unscanned extends shift<infer lookahead, infer nextUnscanned> ?
			lookahead extends terminator ?
				[appendTo, unscanned]
			:	shiftUntil<nextUnscanned, terminator, `${appendTo}${lookahead}`>
		:	[appendTo, ""]

export type shiftUntilEscapable<
		unscanned extends string,
		terminator extends string,
		escapeEscape extends Backslash | "",
		appendTo extends string = ""
	> =
		unscanned extends shift<infer lookahead, infer nextUnscanned> ?
			lookahead extends terminator ? [appendTo, unscanned]
			: lookahead extends Backslash ?
				nextUnscanned extends (
					shift<infer nextLookahead, infer postEscapedUnscanned>
				) ?
					shiftUntilEscapable<
						postEscapedUnscanned,
						terminator,
						escapeEscape,
						`${appendTo}${nextLookahead extends terminator ? ""
						: nextLookahead extends Backslash ? escapeEscape
						: Backslash}${nextLookahead}`
					>
				:	[`${appendTo}${Backslash}`, ""]
			:	shiftUntilEscapable<
					nextUnscanned,
					terminator,
					escapeEscape,
					`${appendTo}${lookahead}`
				>
		:	[appendTo, ""]

export type shiftUntilNot<
		unscanned extends string,
		nonTerminator extends string,
		appendTo extends string = ""
	> =
		unscanned extends shift<infer lookahead, infer nextUnscanned> ?
			lookahead extends nonTerminator ?
				shiftUntilNot<nextUnscanned, nonTerminator, `${appendTo}${lookahead}`>
			:	[appendTo, unscanned]
		:	[appendTo, ""]

export type skipWhitespace<unscanned extends string> = shiftUntilNot<
		unscanned,
		WhitespaceChar
	>[1]

export type shiftResult<scanned extends string, unscanned extends string> = [
		scanned,
		unscanned
	]

export type writeUnmatchedGroupCloseMessage<
	char extends string,
	unscanned extends string
> = `Unmatched ${char}${unscanned extends "" ? "" : ` before ${unscanned}`}`

export type writeUnclosedGroupMessage<missingChar extends string> =
	`Missing ${missingChar}`
