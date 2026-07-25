/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/server/src/unstable-core-do-not-import/stream/utils/mergeAsyncIterables.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type createManagedIterator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ManagedIteratorResult<TYield, TReturn> =
  | { status: 'yield'; value: TYield }
  | { status: 'return'; value: TReturn }
  | { status: 'error'; error: unknown };

export type ManagedIterator<TYield, TReturn> = ReturnType<
  typeof createManagedIterator<TYield, TReturn>
>;
