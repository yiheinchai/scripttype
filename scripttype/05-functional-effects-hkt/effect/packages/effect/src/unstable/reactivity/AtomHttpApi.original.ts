/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/reactivity/AtomHttpApi.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type HttpApiEndpoint<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HttpApiMiddleware<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HttpClientResponse<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Schema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ResponseByMode<Success, ResponseMode extends HttpApiEndpoint.ClientResponseMode> = [ResponseMode] extends
  ["decoded-and-response"] ? [Success, HttpClientResponse]
  : [ResponseMode] extends ["response-only"] ? HttpClientResponse
  : Success

export type ErrorByMode<
  Error extends Schema.Constraint,
  Middleware,
  ResponseMode extends HttpApiEndpoint.ClientResponseMode
> =
  | HttpApiMiddleware.Error<Middleware>
  | HttpApiMiddleware.ClientError<Middleware>
  | ([ResponseMode] extends ["response-only"] ? never : Error["Type"])
