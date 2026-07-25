/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/http/HttpClient.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Effect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HttpClientRequest<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HttpClientResponse<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NoExcessProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Predicate<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Schedule<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Preprocess<E, R> = (
    request: HttpClientRequest.HttpClientRequest
  ) => Effect.Effect<HttpClientRequest.HttpClientRequest, E, R>

export type Postprocess<E = never, R = never> = (
    request: Effect.Effect<HttpClientRequest.HttpClientRequest, E, R>
  ) => Effect.Effect<HttpClientResponse.HttpClientResponse, E, R>

export interface HttpClient extends HttpClient.With<Error.HttpClientError> {}

export type Return<R, E, O extends NoExcessProperties<Effect.Retry.Options<E>, O>> = HttpClient.With<
    | (O extends { schedule: Schedule.Schedule<infer _O, infer _I, infer _E, infer _R> } ? E | _E
      : O extends { times: number } ? E
      : O extends { until: Predicate.Refinement<E, infer E2> } ? E2
      : E)
    | (O extends { while: (...args: Array<any>) => Effect.Effect<infer _A, infer E, infer _R> } ? E : never)
    | (O extends { until: (...args: Array<any>) => Effect.Effect<infer _A, infer E, infer _R> } ? E : never),
    | R
    | (O extends { schedule: Schedule.Schedule<infer _O, infer _I, infer _E, infer R> } ? R : never)
    | (O extends { while: (...args: Array<any>) => Effect.Effect<infer _A, infer _E, infer R> } ? R : never)
    | (O extends { until: (...args: Array<any>) => Effect.Effect<infer _A, infer _E, infer R> } ? R : never)
  > extends infer Z ? Z : never
