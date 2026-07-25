/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Cause.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DoneTypeId<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface Fail<out E> extends Cause.ReasonProto<"Fail"> {
  readonly error: E
}

export interface Die extends Cause.ReasonProto<"Die"> {
  readonly defect: unknown
}

export interface Interrupt extends Cause.ReasonProto<"Interrupt"> {
  readonly fiberId: number | undefined
}

export type Reason<E> = Fail<E> | Die | Interrupt

export type Error<T> = T extends Reason<infer E> ? E : never

export interface Done<A = void> {
  readonly [DoneTypeId]: typeof DoneTypeId
  readonly _tag: "Done"
  readonly value: A
}

export type Extract<E> = E extends Done<infer L> ? L : never

export type Only<E> = E extends Done<infer L> ? Done<L> : never
