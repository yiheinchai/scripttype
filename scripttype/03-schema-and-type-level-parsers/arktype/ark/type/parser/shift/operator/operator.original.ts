/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/shift/operator/operator.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ComparatorStartChar<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type FinalizingLookahead<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Scanner<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StaticState<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type WhitespaceChar<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type lookaheadIsFinalizing<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type parseBound<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type parseBrand<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type parseDivisor<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type incompleteArrayTokenMessage = typeof incompleteArrayTokenMessage

export type writeUnexpectedCharacterMessage<
	char extends string,
	shouldBe extends string = ""
> = `'${char}' is not allowed here${shouldBe extends "" ? ""
:	` (should be ${shouldBe})`}`

export type parseOperator<s extends StaticState, $, args> =
	s["unscanned"] extends Scanner.shift<infer lookahead, infer unscanned> ?
		lookahead extends "[" ?
			unscanned extends Scanner.shift<"]", infer nextUnscanned> ?
				s.setRoot<s, [s["root"], "[]"], nextUnscanned>
			:	s.error<incompleteArrayTokenMessage>
		: lookahead extends "|" ?
			unscanned extends Scanner.shift<">", infer nextUnscanned> ?
				s.reduceBranch<s, "|>", nextUnscanned>
			:	s.reduceBranch<s, lookahead, unscanned>
		: lookahead extends "&" ? s.reduceBranch<s, lookahead, unscanned>
		: lookahead extends ")" ? s.finalizeGroup<s, unscanned>
		: lookaheadIsFinalizing<lookahead, unscanned> extends true ?
			s.finalize<s.scanTo<s, unscanned>, lookahead & FinalizingLookahead>
		: lookahead extends ComparatorStartChar ?
			parseBound<s, lookahead, unscanned, $, args>
		: lookahead extends "%" ? parseDivisor<s, unscanned>
		: lookahead extends "#" ? parseBrand<s, unscanned>
		: lookahead extends WhitespaceChar ?
			parseOperator<s.scanTo<s, unscanned>, $, args>
		:	s.error<writeUnexpectedCharacterMessage<lookahead>>
	:	s.finalize<s, "">
