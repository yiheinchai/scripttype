/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/test-d/require-at-least-one.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type MessageBoard<M> = (messages: M) => string;
