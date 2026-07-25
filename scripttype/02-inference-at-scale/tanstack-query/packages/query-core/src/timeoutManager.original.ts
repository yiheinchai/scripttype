/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-query/packages/query-core/src/timeoutManager.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type ManagedTimerId = number | { [Symbol.toPrimitive]: () => number }

export type TimeoutCallback = (_: void) => void

export type TimeoutProvider<TTimerId extends ManagedTimerId = ManagedTimerId> =
  {
    readonly setTimeout: (callback: TimeoutCallback, delay: number) => TTimerId
    readonly clearTimeout: (timeoutId: TTimerId | undefined) => void

    readonly setInterval: (callback: TimeoutCallback, delay: number) => TTimerId
    readonly clearInterval: (intervalId: TTimerId | undefined) => void
  }
