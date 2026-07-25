/**
 * ORIGINAL TypeScript from 02-inference-at-scale/hono/src/context.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseMime<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ContentfulStatusCode<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Env<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FetchEventLike<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type H<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Headers<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InvalidJSONValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type JSONParsed<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type JSONValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NotFoundHandler<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Response<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResponseHeader<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Result<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RouterRoute<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StatusCode<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypedResponse<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Layout<T = Record<string, any>> = (props: T) => any

export type JSONRespondReturn<
  T extends JSONValue | {} | InvalidJSONValue,
  U extends ContentfulStatusCode,
> = Response & TypedResponse<JSONParsed<T>, U, 'json'>

export interface ExecutionContext {
  /**
   * Extends the lifetime of the event callback until the promise is settled.
   *
   * @param promise - A promise to wait for.
   */
  waitUntil(promise: Promise<unknown>): void
  /**
   * Allows the event to be passed through to subsequent event listeners.
   */
  passThroughOnException(): void
  /**
   * For compatibility with Wrangler 4.x.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any
  /**
   * For compatibility with Wrangler 4.x.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exports?: any
}

export type ContextOptions<E extends Env> = {
  /**
   * Bindings for the environment.
   */
  env: E['Bindings']
  /**
   * Execution context for the request.
   */
  executionCtx?: FetchEventLike | ExecutionContext | undefined
  /**
   * Handler for not found responses.
   */
  notFoundHandler?: NotFoundHandler<E>
  matchResult?: Result<[H, RouterRoute]>
  path?: string
}

export type ResponseHeadersInit =
  | [string, string][]
  | Record<'Content-Type', BaseMime>
  | Record<ResponseHeader, string>
  | Record<string, string>
  | Headers

export interface ResponseInit<T extends StatusCode = StatusCode> {
  headers?: ResponseHeadersInit
  status?: T
  statusText?: string
}

export type ResponseOrInit<T extends StatusCode = StatusCode> = ResponseInit<T> | Response
