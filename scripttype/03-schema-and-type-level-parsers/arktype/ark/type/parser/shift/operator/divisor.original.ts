/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/shift/operator/divisor.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Scanner<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StaticState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TerminatingChar<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type writeInvalidDivisorMessage<divisor extends string | number> =
	`% operator must be followed by a non-zero integer literal (was ${divisor})`

export type parseDivisor<s extends StaticState, unscanned extends string> =
	Scanner.shiftUntil<
		Scanner.skipWhitespace<unscanned>,
		TerminatingChar
	> extends Scanner.shiftResult<infer scanned, infer nextUnscanned> ?
		scanned extends `${infer divisor extends number}` ?
			divisor extends 0 ?
				s.error<writeInvalidDivisorMessage<0>>
			:	s.setRoot<s, [s["root"], "%", divisor], nextUnscanned>
		:	s.error<writeInvalidDivisorMessage<scanned>>
	:	never
