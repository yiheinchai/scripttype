/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/query/core/buildMiddleware/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Action<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AllSelectors<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EndpointDefinitions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQueryActionCreatorResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Middleware<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MiddlewareAPI<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutationActionCreatorResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Parameters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PromiseLike<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryActionCreatorResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryStatus<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QuerySubState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RootState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SubscriptionInternalState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ThunkAction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ThunkDispatch<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownAction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type setTimeout<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type QueryStateMeta<T> = Record<string, undefined | T>

export type SubMiddlewareApi = MiddlewareAPI<
  ThunkDispatch<any, any, UnknownAction>,
  RootState<EndpointDefinitions, string, string>
>

export type MwNext = Parameters<ReturnType<Middleware>>[0]

export type ApiMiddlewareInternalHandler<Return = void> = (
  action: Action,
  mwApi: SubMiddlewareApi & { next: MwNext },
  prevState: RootState<EndpointDefinitions, string, string>,
) => Return

export type TimeoutId = ReturnType<typeof setTimeout>

export type QueryPollState = {
  nextPollTimestamp: number
  timeout?: TimeoutId
  pollingInterval: number
}

export interface InternalMiddlewareState {
  currentSubscriptions: SubscriptionInternalState
  currentPolls: Map<string, QueryPollState>
  runningQueries: Map<
    string,
    | QueryActionCreatorResult<any>
    | InfiniteQueryActionCreatorResult<any>
    | undefined
  >
  runningMutations: Map<string, MutationActionCreatorResult<any> | undefined>
}

export interface BuildSubMiddlewareInput
  extends BuildMiddlewareInput<EndpointDefinitions, string, string> {
  internalState: InternalMiddlewareState
  refetchQuery(
    querySubState: Exclude<
      QuerySubState<any>,
      { status: QueryStatus.uninitialized }
    >,
  ): ThunkAction<QueryActionCreatorResult<any>, any, any, UnknownAction>
  isThisApiSliceAction: (action: Action) => boolean
  selectors: AllSelectors
  mwApi: MiddlewareAPI<
    ThunkDispatch<any, any, UnknownAction>,
    RootState<EndpointDefinitions, string, string>
  >
}

export type InternalHandlerBuilder<ReturnType = void> = (
  input: BuildSubMiddlewareInput,
) => ApiMiddlewareInternalHandler<ReturnType>

export type PromiseWithKnownReason<T, R> = Omit<
  Promise<T>,
  'then' | 'catch'
> & {
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: R) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null,
  ): Promise<TResult1 | TResult2>

  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: R) => TResult | PromiseLike<TResult>)
      | undefined
      | null,
  ): Promise<T | TResult>
}
