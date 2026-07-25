/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/ManagedRuntime.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Context<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Effect<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Exit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Fiber<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Layer<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Scope<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TypeId<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface ManagedRuntime<in R, out ER> {
  readonly [TypeId]: typeof TypeId
  readonly memoMap: Layer.MemoMap
  readonly contextEffect: Effect.Effect<Context.Context<R>, ER>
  readonly context: () => Promise<Context.Context<R>>

  // internal
  readonly scope: Scope.Closeable
  // internal
  cachedContext: Context.Context<R> | undefined

  /**
   * Executes the effect using the provided Scheduler or using the global
   * Scheduler if not provided
   *
   * **When to use**
   *
   * Use to fork an effect against this runtime's services and get the running
   * fiber.
   */
  readonly runFork: <A, E>(
    self: Effect.Effect<A, E, R>,
    options?: Effect.RunOptions
  ) => Fiber.Fiber<A, E | ER>

  /**
   * Executes the effect synchronously returning the exit.
   *
   * **When to use**
   *
   * Use when invoking this effectful method at the edges of your
   * program.
   */
  readonly runSyncExit: <A, E>(effect: Effect.Effect<A, E, R>) => Exit.Exit<A, ER | E>

  /**
   * Executes the effect synchronously throwing in case of errors or async boundaries.
   *
   * **When to use**
   *
   * Use when invoking this effectful method at the edges of your
   * program.
   */
  readonly runSync: <A, E>(effect: Effect.Effect<A, E, R>) => A

  /**
   * Executes the effect asynchronously, eventually passing the exit value to
   * the specified callback.
   *
   * **When to use**
   *
   * Use when invoking this effectful method at the edges of your
   * program.
   */
  readonly runCallback: <A, E>(
    effect: Effect.Effect<A, E, R>,
    options?:
      | Effect.RunOptions & {
        readonly onExit: (exit: Exit.Exit<A, E | ER>) => void
      }
      | undefined
  ) => (interruptor?: number | undefined) => void

  /**
   * Runs the `Effect`, returning a JavaScript `Promise` that will be resolved
   * with the value of the effect once the effect has been executed, or will be
   * rejected with the first error or exception throw by the effect.
   *
   * **When to use**
   *
   * Use when invoking this effectful method at the edges of your
   * program.
   */
  readonly runPromise: <A, E>(effect: Effect.Effect<A, E, R>, options?: Effect.RunOptions) => Promise<A>

  /**
   * Runs the `Effect`, returning a JavaScript `Promise` that will be resolved
   * with the `Exit` state of the effect once the effect has been executed.
   *
   * **When to use**
   *
   * Use when invoking this effectful method at the edges of your
   * program.
   */
  readonly runPromiseExit: <A, E>(
    effect: Effect.Effect<A, E, R>,
    options?: Effect.RunOptions
  ) => Promise<Exit.Exit<A, ER | E>>

  /**
   * Dispose of the resources associated with the runtime.
   *
   * **When to use**
   *
   * Use to release this runtime's layer resources from Promise-based code.
   */
  readonly dispose: () => Promise<void>

  /**
   * Dispose of the resources associated with the runtime.
   *
   * **When to use**
   *
   * Use with the `await using` syntax to automatically dispose the runtime
   * when it goes out of scope.
   */
  readonly [Symbol.asyncDispose]: () => Promise<void>

  /**
   * Dispose of the resources associated with the runtime.
   *
   * **When to use**
   *
   * Use to release this runtime's layer resources from an `Effect` workflow.
   */
  readonly disposeEffect: Effect.Effect<void, never, never>
}

export type Services<T extends ManagedRuntime<never, any>> = [T] extends [ManagedRuntime<infer R, infer _E>] ? R
    : never

export type Error<T extends ManagedRuntime<never, any>> = [T] extends [ManagedRuntime<infer _R, infer E>] ? E : never
