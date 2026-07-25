/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-query/packages/query-core/src/mutationObserver.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type MutationObserverResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type MutationObserverListener<TData, TError, TVariables, TOnMutateResult> = (
  result: MutationObserverResult<TData, TError, TVariables, TOnMutateResult>,
) => void
