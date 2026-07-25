/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/client/src/links/internals/urlWithConnectionParams.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type CallbackOrValue<T> = T | (() => T | Promise<T>);
