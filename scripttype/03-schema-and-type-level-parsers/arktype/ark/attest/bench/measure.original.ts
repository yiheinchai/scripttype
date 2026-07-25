/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/attest/bench/measure.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TYPE_UNITS<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type timeUnitRatios<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
