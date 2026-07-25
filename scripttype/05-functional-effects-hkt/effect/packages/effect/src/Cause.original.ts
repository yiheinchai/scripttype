/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Cause.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DoneTypeId<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
