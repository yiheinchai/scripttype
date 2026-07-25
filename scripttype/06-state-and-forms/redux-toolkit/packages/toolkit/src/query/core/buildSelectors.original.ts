/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/query/core/buildSelectors.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type EndpointDefinitions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQueryArgFrom<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQueryDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQuerySubState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutationDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutationSubState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryArgFrom<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QuerySubState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReducerPathFrom<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RequestStatusFlags<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TagTypesFrom<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _RootState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type skipToken<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SkipToken = typeof skipToken

export type QueryResultSelectorResult<
  Definition extends QueryDefinition<any, any, any, any>,
> = QuerySubState<Definition> & RequestStatusFlags

export type QueryResultSelectorFactory<
  Definition extends QueryDefinition<any, any, any, any>,
  RootState,
> = (
  queryArg: QueryArgFrom<Definition> | SkipToken,
) => (state: RootState) => QueryResultSelectorResult<Definition>

export type BuildSelectorsApiEndpointQuery<
  Definition extends QueryDefinition<any, any, any, any, any>,
  Definitions extends EndpointDefinitions,
> = {
  select: QueryResultSelectorFactory<
    Definition,
    _RootState<
      Definitions,
      TagTypesFrom<Definition>,
      ReducerPathFrom<Definition>
    >
  >
}

export type InfiniteQueryResultFlags = {
  hasNextPage: boolean
  hasPreviousPage: boolean
  isFetchingNextPage: boolean
  isFetchingPreviousPage: boolean
  isFetchNextPageError: boolean
  isFetchPreviousPageError: boolean
}

export type InfiniteQueryResultSelectorResult<
  Definition extends InfiniteQueryDefinition<any, any, any, any, any>,
> = InfiniteQuerySubState<Definition> &
  RequestStatusFlags &
  InfiniteQueryResultFlags

export type InfiniteQueryResultSelectorFactory<
  Definition extends InfiniteQueryDefinition<any, any, any, any, any>,
  RootState,
> = (
  queryArg: InfiniteQueryArgFrom<Definition> | SkipToken,
) => (state: RootState) => InfiniteQueryResultSelectorResult<Definition>

export type BuildSelectorsApiEndpointInfiniteQuery<
  Definition extends InfiniteQueryDefinition<any, any, any, any, any>,
  Definitions extends EndpointDefinitions,
> = {
  select: InfiniteQueryResultSelectorFactory<
    Definition,
    _RootState<
      Definitions,
      TagTypesFrom<Definition>,
      ReducerPathFrom<Definition>
    >
  >
}

export type MutationResultSelectorResult<
  Definition extends MutationDefinition<any, any, any, any>,
> = MutationSubState<Definition> & RequestStatusFlags

export type MutationResultSelectorFactory<
  Definition extends MutationDefinition<any, any, any, any>,
  RootState,
> = (
  requestId:
    | string
    | { requestId: string | undefined; fixedCacheKey: string | undefined }
    | SkipToken,
) => (state: RootState) => MutationResultSelectorResult<Definition>

export type BuildSelectorsApiEndpointMutation<
  Definition extends MutationDefinition<any, any, any, any, any>,
  Definitions extends EndpointDefinitions,
> = {
  select: MutationResultSelectorFactory<
    Definition,
    _RootState<
      Definitions,
      TagTypesFrom<Definition>,
      ReducerPathFrom<Definition>
    >
  >
}
