/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/keywords/string.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type DayPatterns = {
	y: "yy" | "yyyy"
	m: "mm" | "m"
	d: "dd" | "d"
}

export type PartKey = keyof DayPatterns

export type DayPart = DayPatterns[PartKey]

export type DayDelimiter = "." | "/" | "-"

export type fragment<part extends DayPart, delimiter extends DayDelimiter> =
	| `${delimiter}${part}`
	| ""

export type DayPattern<delimiter extends DayDelimiter = DayDelimiter> =
	delimiter extends unknown ?
		{
			[k1 in keyof DayPatterns]: {
				[k2 in Exclude<keyof DayPatterns, k1>]: `${DayPatterns[k1]}${fragment<
					DayPatterns[k2],
					delimiter
				>}${fragment<
					DayPatterns[Exclude<keyof DayPatterns, k1 | k2>],
					delimiter
				>}`
			}[Exclude<keyof DayPatterns, k1>]
		}[keyof DayPatterns]
	:	never
