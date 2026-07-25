/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-query/packages/svelte-query/src/containers.svelte.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type Box<T> = { current: T }

export type Branded<T extends () => unknown> = T & { [lazyBrand]: true }
