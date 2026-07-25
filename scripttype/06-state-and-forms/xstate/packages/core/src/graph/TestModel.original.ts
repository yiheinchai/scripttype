/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/core/src/graph/TestModel.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type EventObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Snapshot<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TraversalOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type GetPathOptions<
  TSnapshot extends Snapshot<unknown>,
  TEvent extends EventObject,
  TInput
> = Partial<TraversalOptions<TSnapshot, TEvent, TInput>> & {
  /**
   * Whether to allow deduplicate paths so that paths that are contained by
   * longer paths are included.
   *
   * @default false
   */
  allowDuplicatePaths?: boolean;
};
