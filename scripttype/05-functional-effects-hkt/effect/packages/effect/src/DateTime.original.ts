/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/DateTime.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export interface Utc extends DateTime.Proto {
  readonly _tag: "Utc"
  readonly epochMilliseconds: number
  partsUtc: DateTime.PartsWithWeekday | undefined
}

export type TimeZone = TimeZone.Offset | TimeZone.Named

export interface Zoned extends DateTime.Proto {
  readonly _tag: "Zoned"
  readonly epochMilliseconds: number
  readonly zone: TimeZone
  adjustedEpochMilliseconds: number | undefined
  partsAdjusted: DateTime.PartsWithWeekday | undefined
  partsUtc: DateTime.PartsWithWeekday | undefined
}

export type DateTime = Utc | Zoned

export type PreserveZone<A extends DateTime.Input> = A extends Zoned ? Zoned : Utc
