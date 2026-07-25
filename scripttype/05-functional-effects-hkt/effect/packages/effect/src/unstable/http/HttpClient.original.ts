/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/http/HttpClient.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Effect<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpClientRequest<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpClientResponse<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type NoExcessProperties<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Predicate<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Schedule<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
