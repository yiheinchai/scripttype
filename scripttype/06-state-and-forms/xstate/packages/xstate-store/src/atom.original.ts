/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/xstate-store/src/atom.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type AsyncAtomState<Data, Error = unknown> =
  | { status: 'pending' }
  | { status: 'done'; data: Data }
  | { status: 'error'; error: Error };
