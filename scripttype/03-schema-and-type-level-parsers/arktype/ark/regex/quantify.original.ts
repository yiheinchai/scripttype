/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/regex/quantify.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Scanner<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type State<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type parseNonNegativeInteger<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type QuantifyingChar = "*" | "+" | "?"

export type writeUnmatchedQuantifierError<quantifier extends string> =
	`Quantifier ${quantifier} requires a preceding token`

export type quantifyBuiltin<
	s extends State,
	quantifier extends QuantifyingChar,
	unscanned extends string
> =
	quantifier extends "?" ? s.pushQuantifier<s, 0, 1, unscanned>
	: quantifier extends "+" ? s.pushQuantifier<s, 1, null, unscanned>
	: quantifier extends "*" ? s.pushQuantifier<s, 0, null, unscanned>
	: never

export type parseBuiltinQuantifier<
	s extends State,
	quantifier extends QuantifyingChar,
	unscanned extends string
> =
	s["root"] extends "" ? s.error<writeUnmatchedQuantifierError<quantifier>>
	:	quantifyBuiltin<
			s,
			quantifier,
			unscanned extends Scanner.shift<"?", infer lazyUnscanned> ? lazyUnscanned
			:	unscanned
		>

export type ParsedRange = {
	min: number
	max: number | null
	unscanned: string
}

export type from<r extends ParsedRange> = r

export type skipPossibleQuestionMark<unscanned extends string> =
	unscanned extends `?${infer next}` ? next : unscanned

export type parsePossibleRangeString<unscanned extends string> =
	unscanned extends (
		`${infer l extends `${number}`},${infer r extends `${number}`}}${infer next}`
	) ?
		ParsedRange.from<{
			min: parseNonNegativeInteger<l>
			max: parseNonNegativeInteger<r>
			unscanned: skipPossibleQuestionMark<next>
		}>
	: unscanned extends `${infer l extends `${number}`},}${infer next}` ?
		ParsedRange.from<{
			min: parseNonNegativeInteger<l>
			max: null
			unscanned: skipPossibleQuestionMark<next>
		}>
	: unscanned extends `${infer l extends `${number}`}}${infer next}` ?
		ParsedRange.from<{
			min: parseNonNegativeInteger<l>
			max: parseNonNegativeInteger<l>
			unscanned: skipPossibleQuestionMark<next>
		}>
	:	null

export type parseQuantifier<unscanned extends string, parsed extends ParsedRange> =
	unscanned extends `${infer range}${parsed["unscanned"]}` ? `{${range}` : never

export type writeUnnaturalNumberQuantifierError<quantifier extends string> =
	`Quantifier ${quantifier} must use natural numbers`

export type parsePossibleRange<
	s extends State,
	unscanned extends string,
	parsed extends ParsedRange | null = parsePossibleRangeString<unscanned>
> =
	parsed extends ParsedRange ?
		s["root"] extends "" ?
			s.error<writeUnmatchedQuantifierError<parseQuantifier<unscanned, parsed>>>
		: [parsed["min"], parsed["max"]] extends (
			[never, unknown] | [unknown, never]
		) ?
			s.error<
				writeUnnaturalNumberQuantifierError<parseQuantifier<unscanned, parsed>>
			>
		:	s.pushQuantifier<
				s,
				parsed["min"],
				parsed["max"],
				parsed["unscanned"] extends Scanner.shift<"?", infer lazyUnscanned> ?
					lazyUnscanned
				:	parsed["unscanned"]
			>
	:	s.shiftQuantifiable<s, "{", unscanned>

export type loopFromZero<
	base extends string,
	max extends number,
	acc extends string,
	repetitions extends 1[]
> =
	repetitions["length"] extends max ? acc
	:	loopFromZero<base, max, acc | `${acc}${base}`, [...repetitions, 1]>

export type loopUntilMax<
	base extends string,
	min extends number,
	max extends number,
	acc extends string,
	repetitions extends 1[]
> =
	repetitions["length"] extends max ? acc
	:	loopUntilMax<base, min, max, acc | `${acc}${base}`, [...repetitions, 1]>

export type loopUntilMin<
	base extends string,
	min extends number,
	max extends number | null,
	acc extends string,
	repetitions extends 1[]
> =
	repetitions["length"] extends min ?
		max extends number ? loopUntilMax<base, min, max, acc, repetitions>
		: // don't need appendNonRedundant for these cases because if the pattern is
		// something collapsible like `string` or `bigint, the fast path has
		// already been taken
		repetitions["length"] extends 0 ? acc | `${acc}${base}${string}`
		: `${acc}${string}`
	:	loopUntilMin<base, min, max, `${acc}${base}`, [...repetitions, 1]>

export type tryFastPath<
	pattern extends string,
	min extends number,
	max extends number | null
> =
	max extends 0 ? ""
	: // repeating string or `${number}` any number of times will not change the
	// type, but zero repetitions produce "", which `${number}` does not include
	string extends pattern ? string
	: `${number}` extends pattern ?
		min extends 0 ?
			"" | `${number}`
		:	`${number}`
	: min extends 0 ?
		max extends 1 ? "" | pattern
		: max extends number ? loopFromZero<pattern, max, "", []>
		: // max is null, all we can do is append ${string}
			"" | `${pattern}${string}`
	:	loopUntilMin<pattern, min, max, "", []>

export type quantify<
	pattern extends string,
	min extends number,
	max extends number | null
> = tryFastPath<pattern, min, max>
