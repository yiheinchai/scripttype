/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-query/packages/react-query-next-experimental/src/HydrationStreamProvider.tsx, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type Serialized<TData> = unknown & {
  [serializedSymbol]: TData
}
