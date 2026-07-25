/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Metric.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Context<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Contravariant<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Covariant<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TypeId<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface Metric<in Input, out State> extends Pipeable {
  readonly [TypeId]: typeof TypeId
  readonly Input: Contravariant<Input>
  readonly State: Covariant<State>
  readonly id: string
  readonly type: Metric.Type
  readonly description: string | undefined
  readonly attributes: Metric.AttributeSet | undefined
  readonly valueUnsafe: (context: Context.Context<never>) => State
  readonly updateUnsafe: (input: Input, context: Context.Context<never>) => void
  readonly modifyUnsafe: (input: Input, context: Context.Context<never>) => void
}

export type Input<A> = A extends Metric<infer _Input, infer _State> ? _Input
    : never

export type State<A> = A extends Metric<infer _Input, infer _State> ? _State
    : never
