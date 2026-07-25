/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/ai/anthropic/src/Generated.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type HttpClientResponse<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface OperationConfig {
  /**
   * Whether or not the response should be included in the value returned from
   * an operation.
   *
   * If set to `true`, a tuple of `[A, HttpClientResponse]` will be returned,
   * where `A` is the success type of the operation.
   *
   * If set to `false`, only the success type of the operation will be returned.
   */
  readonly includeResponse?: boolean | undefined
}

export type WithOptionalResponse<A, Config extends OperationConfig> = Config extends {
  readonly includeResponse: true
} ? [A, HttpClientResponse.HttpClientResponse] :
  A
