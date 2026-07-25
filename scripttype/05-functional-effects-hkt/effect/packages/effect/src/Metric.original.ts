/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Metric.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Context<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Contravariant<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Covariant<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypeId<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
