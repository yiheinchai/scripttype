/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/virtual-file-routes/src/defineConfig.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type ConfigFnObject<TConfig> = () => TConfig

export type ConfigFnPromise<TConfig> = () => Promise<TConfig>

export type ConfigFn<TConfig> = () => TConfig | Promise<TConfig>

export type ConfigExport<TConfig> =
  | TConfig
  | Promise<TConfig>
  | ConfigFnObject<TConfig>
  | ConfigFnPromise<TConfig>
  | ConfigFn<TConfig>
