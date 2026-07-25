/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/rtk-query-graphql-request-base-query/src/GraphqlBaseQueryTypes.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseQueryApi<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ClientError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GraphQLClient<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Headers<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PromiseLike<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RequestOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ErrorResponse = {
  message: string
  stack: string
  name: string
}

export type RequestHeaders = RequestOptions['requestHeaders']

export type MaybePromise<T> = T | PromiseLike<T>

export type PrepareHeaders = (
  headers: Headers,
  api: Pick<
    BaseQueryApi,
    'getState' | 'endpoint' | 'type' | 'forced' | 'extra'
  >,
) => MaybePromise<Headers>

export type GraphqlRequestBaseQueryArgs<E = ErrorResponse> = (
  | {
      url: string
    }
  | { client: GraphQLClient }
) & {
  requestHeaders?: RequestHeaders
  prepareHeaders?: PrepareHeaders
  customErrors?: (args: ClientError) => E
}

export type QueryReturnValue<T = unknown, E = unknown, M = unknown> =
  | {
      error: E
      data?: undefined
      meta?: M
    }
  | {
      error?: undefined
      data: T
      meta?: M
    }
