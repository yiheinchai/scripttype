/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/core/src/mapState.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyMachineSnapshot<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StateSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type StateSchemaMapper<
  TSnapshot extends AnyMachineSnapshot,
  T extends StateSchema,
  TResult
> = {
  /** Maps the snapshot to a value when this state is active. */
  map?: (snapshot: TSnapshot) => TResult;
  /** Nested mappers for child states. */
  states?: {
    [K in keyof T['states']]?: T['states'][K] extends StateSchema
      ? StateSchemaMapper<TSnapshot, T['states'][K], TResult>
      : never;
  };
};
