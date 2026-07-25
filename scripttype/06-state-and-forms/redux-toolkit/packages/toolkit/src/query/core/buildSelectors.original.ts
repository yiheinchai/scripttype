/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/query/core/buildSelectors.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type EndpointDefinitions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InfiniteQueryArgFrom<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InfiniteQueryDefinition<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InfiniteQuerySubState<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MutationDefinition<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MutationSubState<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type QueryArgFrom<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type QueryDefinition<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type QuerySubState<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReducerPathFrom<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RequestStatusFlags<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TagTypesFrom<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type _RootState<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type skipToken<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
