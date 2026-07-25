/**
 * ORIGINAL TypeScript from 02-inference-at-scale/hono/src/jsx/hooks/index.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type UpdateStateFunction<T> = (newState: T | ((currentState: T) => T)) => void

export type RefObject<T> = { current: T | null }
