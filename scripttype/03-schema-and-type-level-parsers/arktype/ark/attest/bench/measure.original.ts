/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/attest/bench/measure.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TYPE_UNITS<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type timeUnitRatios<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type TimeUnit = keyof typeof timeUnitRatios

export type TypeUnit = (typeof TYPE_UNITS)[number]

export type MeasureUnit = TimeUnit | TypeUnit

export type Measure<Unit extends MeasureUnit = MeasureUnit> = [
	value: number,
	unit: Unit
]

export type MeasureComparison<Unit extends MeasureUnit = MeasureUnit> = {
	updated: Measure<Unit>
	baseline: Measure<Unit> | undefined
}
