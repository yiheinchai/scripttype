/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-query/packages/lit-query/src/createMutationController.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DefaultError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutateOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutationObserverOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutationObserverResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ValueAccessor<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type CreateMutationOptions<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TOnMutateResult = unknown,
> = MutationObserverOptions<TData, TError, TVariables, TOnMutateResult>

export type MutationResultAccessor<TData, TError, TVariables, TOnMutateResult> =
  ValueAccessor<
    MutationObserverResult<TData, TError, TVariables, TOnMutateResult>
  > & {
    /**
     * Starts the mutation and swallows the returned promise.
     *
     * Throws synchronously if no `QueryClient` can be resolved.
     */
    mutate: (
      variables: TVariables,
      options?: MutateOptions<TData, TError, TVariables, TOnMutateResult>,
    ) => void
    /**
     * Starts the mutation and returns the observer promise.
     *
     * Rejects if no `QueryClient` can be resolved.
     */
    mutateAsync: MutationObserverResult<
      TData,
      TError,
      TVariables,
      TOnMutateResult
    >['mutate']
    /** Resets the mutation observer to its idle state. */
    reset: MutationObserverResult<
      TData,
      TError,
      TVariables,
      TOnMutateResult
    >['reset']
    /** Removes the controller from its Lit host and unsubscribes observers. */
    destroy: () => void
  }
