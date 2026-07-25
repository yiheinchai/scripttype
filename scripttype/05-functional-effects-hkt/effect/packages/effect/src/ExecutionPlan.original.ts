/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/ExecutionPlan.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Context<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Effect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Layer<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonEmptyReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Schedule<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type StepProvides<Steps extends ReadonlyArray<any>, Out = unknown> = Steps extends
    readonly [infer Step, ...infer Rest] ? StepProvides<
      Rest,
      & Out
      & (
        (Step extends { readonly provide: Context.Context<infer P> | Layer.Layer<infer P, infer _E, infer _R> } ? P
          : unknown)
      )
    > :
    Out

export type TypeId = "~effect/ExecutionPlan"

export interface ExecutionPlan<
  Config extends {
    provides: any
    input: any
    error: any
    requirements: any
  }
> extends Pipeable {
  readonly [TypeId]: TypeId
  readonly steps: NonEmptyReadonlyArray<{
    readonly provide:
      | Context.Context<Config["provides"]>
      | Layer.Layer<Config["provides"], Config["error"], Config["requirements"]>
    readonly attempts?: number | undefined
    readonly while?:
      | ((input: Config["input"]) => Effect.Effect<boolean, Config["error"], Config["requirements"]>)
      | undefined
    readonly schedule?: Schedule.Schedule<any, Config["input"], Config["requirements"]> | undefined
  }>

  /**
   * Returns an equivalent `ExecutionPlan` with the requirements satisfied, using the current context.
   */
  readonly captureRequirements: Effect.Effect<
    ExecutionPlan<{
      provides: Config["provides"]
      input: Config["input"]
      error: Config["error"]
      requirements: never
    }>,
    never,
    Config["requirements"]
  >
}

export type PlanProvides<Plans extends ReadonlyArray<any>, Out = unknown> = Plans extends
    readonly [infer Plan, ...infer Rest] ?
    PlanProvides<Rest, Out & (Plan extends ExecutionPlan<infer T> ? T["provides"] : unknown)> :
    Out

export type StepInput<Steps extends ReadonlyArray<any>, Out = unknown> = Steps extends
    readonly [infer Step, ...infer Rest] ? StepInput<
      Rest,
      & Out
      & (
        & (Step extends { readonly while: (input: infer I) => infer _ } ? I : unknown)
        & (Step extends { readonly schedule: Schedule.Schedule<infer _O, infer I, infer _R> } ? I : unknown)
      )
    > :
    Out

export type PlanInput<Plans extends ReadonlyArray<any>, Out = unknown> = Plans extends
    readonly [infer Plan, ...infer Rest] ?
    PlanInput<Rest, Out & (Plan extends ExecutionPlan<infer T> ? T["input"] : unknown)> :
    Out
