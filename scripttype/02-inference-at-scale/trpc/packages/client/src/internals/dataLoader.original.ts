/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/client/src/internals/dataLoader.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type Batch<TKey, TValue> = {
  items: BatchItem<TKey, TValue>[];
};

export type BatchItem<TKey, TValue> = {
  aborted: boolean;
  key: TKey;
  resolve: ((value: TValue) => void) | null;
  reject: ((error: Error) => void) | null;
  batch: Batch<TKey, TValue> | null;
};

export type BatchLoader<TKey, TValue> = {
  validate: (keys: TKey[]) => boolean;
  fetch: (keys: TKey[]) => Promise<TValue[] | Promise<TValue>[]>;
};
