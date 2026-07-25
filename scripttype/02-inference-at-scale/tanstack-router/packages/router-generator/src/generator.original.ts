/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/router-generator/src/generator.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export interface GeneratorCacheEntry {
  mtimeMs: bigint
  fileContent: string
}

export type FileCacheChange<TCacheEntry extends GeneratorCacheEntry> =
  | {
      result: false
      cacheEntry: TCacheEntry
    }
  | { result: true; mtimeMs: bigint; cacheEntry: TCacheEntry }
  | {
      result: 'file-not-in-cache'
    }
  | {
      result: 'cannot-stat-file'
    }
