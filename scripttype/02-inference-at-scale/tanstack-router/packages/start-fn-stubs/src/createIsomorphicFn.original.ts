/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/start-fn-stubs/src/createIsomorphicFn.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type IsomorphicFn<
  TArgs extends Array<any> = [],
  TServer = undefined,
  TClient = undefined,
> = (...args: TArgs) => TServer | TClient
