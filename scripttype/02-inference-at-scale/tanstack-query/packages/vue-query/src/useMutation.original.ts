/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-query/packages/vue-query/src/useMutation.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DefaultError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DistributiveOmit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MaybeRefDeep<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutateFunction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutationObserverResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutationOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Parameters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Readonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ToRefs<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type MutationResult<TData, TError, TVariables, TOnMutateResult> =
  DistributiveOmit<
    MutationObserverResult<TData, TError, TVariables, TOnMutateResult>,
    'mutate' | 'reset'
  >

export type UseMutationOptions<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TOnMutateResult = unknown,
> =
  | MaybeRefDeep<MutationOptions<TData, TError, TVariables, TOnMutateResult>>
  | (() => MaybeRefDeep<
      MutationOptions<TData, TError, TVariables, TOnMutateResult>
    >)

export type MutateSyncFunction<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TOnMutateResult = unknown,
> = (
  ...options: Parameters<
    MutateFunction<TData, TError, TVariables, TOnMutateResult>
  >
) => void

export type UseMutationReturnType<
  TData,
  TError,
  TVariables,
  TOnMutateResult,
  TResult = MutationResult<TData, TError, TVariables, TOnMutateResult>,
> = ToRefs<Readonly<TResult>> & {
  mutate: MutateSyncFunction<TData, TError, TVariables, TOnMutateResult>
  mutateAsync: MutateFunction<TData, TError, TVariables, TOnMutateResult>
  reset: MutationObserverResult<
    TData,
    TError,
    TVariables,
    TOnMutateResult
  >['reset']
}
