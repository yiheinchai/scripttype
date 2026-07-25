/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/start-plugin-core/src/start-compiler/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type babel<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type t<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface MethodCallInfo {
  callPath: babel.NodePath<t.CallExpression>
  /** Path to the first argument, or null if no arguments */
  firstArgPath: babel.NodePath | null
}

export interface MethodChainPaths {
  middleware: MethodCallInfo | null
  validator: MethodCallInfo | null
  // TODO remove upon stable
  inputValidator: MethodCallInfo | null
  handler: MethodCallInfo | null
  server: MethodCallInfo | null
  client: MethodCallInfo | null
}

export interface RewriteCandidate {
  path: babel.NodePath<t.CallExpression>
  methodChain: MethodChainPaths
}

export type GenerateFunctionIdFn = (opts: {
  filename: string
  functionName: string
  extractedFilename: string
}) => string

export interface ServerFn {
  /** The unique name used to export this function */
  functionName: string
  /** The unique ID for this function (used in RPC calls) */
  functionId: string
  /** The filename with query param where the extracted implementation lives */
  extractedFilename: string
  /** The original source filename */
  filename: string
  /**
   * True when this function was discovered by the client build.
   * Used to restrict HTTP access to only client-referenced functions.
   */
  isClientReferenced?: boolean
}

export interface CompilationContext extends StartCompilerTransformContext {
  /** Generate a unique function ID */
  generateFunctionId: GenerateFunctionIdFn
  /** Get known server functions from previous builds (e.g., client build) */
  getKnownServerFns: () => Record<string, ServerFn>
  /** Module-level directives to add to extracted server function provider files. */
  serverFnProviderModuleDirectives: ReadonlyArray<string> | undefined

  /**
   * Callback when server functions are discovered.
   * Called after each file is compiled with its new functions.
   */
  onServerFnsById: ((d: Record<string, ServerFn>) => void) | undefined
}

export type BatchedPluginHandler<TOpts = unknown> = (
  candidates: Array<RewriteCandidate>,
  context: CompilationContext,
  opts: TOpts,
) => void
