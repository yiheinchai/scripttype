/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/shift/operand/operand.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseCompletions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EnclosingQuote<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EnclosingStartToken<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Scanner<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StaticState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type WhitespaceChar<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type parseEnclosed<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type parseUnenclosed<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type parseOperand<s extends StaticState, $, args> =
	s["unscanned"] extends Scanner.shift<infer lookahead, infer unscanned> ?
		lookahead extends "(" ? s.reduceGroupOpen<s, unscanned>
		: lookahead extends EnclosingStartToken ?
			parseEnclosed<s, lookahead, unscanned>
		: lookahead extends WhitespaceChar ?
			parseOperand<s.scanTo<s, unscanned>, $, args>
		: lookahead extends "d" ?
			unscanned extends (
				Scanner.shift<
					infer enclosing extends EnclosingQuote,
					infer nextUnscanned
				>
			) ?
				parseEnclosed<s, `d${enclosing}`, nextUnscanned>
			:	parseUnenclosed<s, $, args>
		: lookahead extends "x" ?
			unscanned extends Scanner.shift<"/", infer nextUnscanned> ?
				parseEnclosed<s, "x/", nextUnscanned>
			:	parseUnenclosed<s, $, args>
		:	parseUnenclosed<s, $, args>
	:	s.completion<`${s["scanned"]}${BaseCompletions<$, args>}`>
