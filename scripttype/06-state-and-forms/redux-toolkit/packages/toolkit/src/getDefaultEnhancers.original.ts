/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/getDefaultEnhancers.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AutoBatchOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExtractDispatchExtensions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Middlewares<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StoreEnhancer<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Tuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type GetDefaultEnhancersOptions = {
  autoBatch?: boolean | AutoBatchOptions
}

export type GetDefaultEnhancers<M extends Middlewares<any>> = (
  options?: GetDefaultEnhancersOptions,
) => Tuple<[StoreEnhancer<{ dispatch: ExtractDispatchExtensions<M> }>]>
