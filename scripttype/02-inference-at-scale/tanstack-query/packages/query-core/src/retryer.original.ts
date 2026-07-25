/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-query/packages/query-core/src/retryer.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DefaultError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ShouldRetryFunction<TError = DefaultError> = (
  failureCount: number,
  error: TError,
) => boolean

export type RetryValue<TError> = boolean | number | ShouldRetryFunction<TError>

export type RetryDelayFunction<TError = DefaultError> = (
  failureCount: number,
  error: TError,
) => number

export type RetryDelayValue<TError> = number | RetryDelayFunction<TError>
