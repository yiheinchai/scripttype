/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/query/core/buildThunks.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AsyncThunk<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseQueryError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Draft<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EndpointDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EndpointDefinitions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteData<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQueryActionCreatorResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQueryArgFrom<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQueryDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQueryDirection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQueryKeys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutationDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PageParamFrom<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Patch<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryActionCreatorResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryArgFrom<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryKeys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QuerySubstateIdentifier<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResultTypeFrom<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StartInfiniteQueryActionCreatorOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StartQueryActionCreatorOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ThunkAction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownAction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ThunkResult = unknown

export type QueryThunkArg = QuerySubstateIdentifier &
  StartQueryActionCreatorOptions & {
    type: 'query'
    originalArgs: unknown
    endpointName: string
  }

export type ThunkApiMetaConfig = {
  pendingMeta: { startedTimeStamp: number; [SHOULD_AUTOBATCH]: true }
  fulfilledMeta: {
    fulfilledTimeStamp: number
    baseQueryMeta: unknown
    [SHOULD_AUTOBATCH]: true
  }
  rejectedMeta: { baseQueryMeta: unknown; [SHOULD_AUTOBATCH]: true }
}

export type QueryThunk = AsyncThunk<
  ThunkResult,
  QueryThunkArg,
  ThunkApiMetaConfig
>

export type MutationThunkArg = {
  type: 'mutation'
  originalArgs: unknown
  endpointName: string
  track?: boolean
  fixedCacheKey?: string
}

export type MutationThunk = AsyncThunk<
  ThunkResult,
  MutationThunkArg,
  ThunkApiMetaConfig
>

export type InfiniteQueryThunkArg<
  D extends InfiniteQueryDefinition<any, any, any, any, any>,
> = QuerySubstateIdentifier &
  StartInfiniteQueryActionCreatorOptions<D> & {
    type: `query`
    originalArgs: unknown
    endpointName: string
    param: unknown
    direction?: InfiniteQueryDirection
    refetchCachedPages?: boolean
  }

export type InfiniteQueryThunk<
  D extends InfiniteQueryDefinition<any, any, any, any, any>,
> = AsyncThunk<ThunkResult, InfiniteQueryThunkArg<D>, ThunkApiMetaConfig>

export type Matcher<M> = (value: any) => value is M

export type EndpointThunk<
  Thunk extends QueryThunk | MutationThunk | InfiniteQueryThunk<any>,
  Definition extends EndpointDefinition<any, any, any, any>,
> =
  Definition extends EndpointDefinition<
    infer QueryArg,
    infer BaseQueryFn,
    any,
    infer ResultType
  >
    ? Thunk extends AsyncThunk<unknown, infer ATArg, infer ATConfig>
      ? AsyncThunk<
          ResultType,
          ATArg & { originalArgs: QueryArg },
          ATConfig & { rejectValue: BaseQueryError<BaseQueryFn> }
        >
      : never
    : Definition extends InfiniteQueryDefinition<
          infer QueryArg,
          infer PageParam,
          infer BaseQueryFn,
          any,
          infer ResultType
        >
      ? Thunk extends AsyncThunk<unknown, infer ATArg, infer ATConfig>
        ? AsyncThunk<
            InfiniteData<ResultType, PageParam>,
            ATArg & { originalArgs: QueryArg },
            ATConfig & { rejectValue: BaseQueryError<BaseQueryFn> }
          >
        : never
      : never

export type PendingAction<
  Thunk extends QueryThunk | MutationThunk | InfiniteQueryThunk<any>,
  Definition extends EndpointDefinition<any, any, any, any>,
> = ReturnType<EndpointThunk<Thunk, Definition>['pending']>

export type FulfilledAction<
  Thunk extends QueryThunk | MutationThunk | InfiniteQueryThunk<any>,
  Definition extends EndpointDefinition<any, any, any, any>,
> = ReturnType<EndpointThunk<Thunk, Definition>['fulfilled']>

export type RejectedAction<
  Thunk extends QueryThunk | MutationThunk | InfiniteQueryThunk<any>,
  Definition extends EndpointDefinition<any, any, any, any>,
> = ReturnType<EndpointThunk<Thunk, Definition>['rejected']>

export interface Matchers<
  Thunk extends QueryThunk | MutationThunk | InfiniteQueryThunk<any>,
  Definition extends EndpointDefinition<any, any, any, any>,
> {
  matchPending: Matcher<PendingAction<Thunk, Definition>>
  matchFulfilled: Matcher<FulfilledAction<Thunk, Definition>>
  matchRejected: Matcher<RejectedAction<Thunk, Definition>>
}

export type BuildThunksApiEndpointQuery<
  Definition extends QueryDefinition<any, any, any, any, any>,
> = Matchers<QueryThunk, Definition>

export type BuildThunksApiEndpointInfiniteQuery<
  Definition extends InfiniteQueryDefinition<any, any, any, any, any>,
> = Matchers<InfiniteQueryThunk<any>, Definition>

export type BuildThunksApiEndpointMutation<
  Definition extends MutationDefinition<any, any, any, any, any>,
> = Matchers<MutationThunk, Definition>

export type MaybeDrafted<T> = T | Draft<T>

export type Recipe<T> = (data: MaybeDrafted<T>) => void | MaybeDrafted<T>

export type UpsertRecipe<T> = (
  data: MaybeDrafted<T> | undefined,
) => void | MaybeDrafted<T>

export type PatchQueryDataThunk<
  Definitions extends EndpointDefinitions,
  PartialState,
> = <EndpointName extends QueryKeys<Definitions>>(
  endpointName: EndpointName,
  arg: QueryArgFrom<Definitions[EndpointName]>,
  patches: readonly Patch[],
  updateProvided?: boolean,
) => ThunkAction<void, PartialState, any, UnknownAction>

export type AllQueryKeys<Definitions extends EndpointDefinitions> =
  | QueryKeys<Definitions>
  | InfiniteQueryKeys<Definitions>

export type QueryArgFromAnyQueryDefinition<
  Definitions extends EndpointDefinitions,
  EndpointName extends AllQueryKeys<Definitions>,
> =
  Definitions[EndpointName] extends InfiniteQueryDefinition<
    any,
    any,
    any,
    any,
    any
  >
    ? InfiniteQueryArgFrom<Definitions[EndpointName]>
    : Definitions[EndpointName] extends QueryDefinition<any, any, any, any>
      ? QueryArgFrom<Definitions[EndpointName]>
      : never

export type DataFromAnyQueryDefinition<
  Definitions extends EndpointDefinitions,
  EndpointName extends AllQueryKeys<Definitions>,
> =
  Definitions[EndpointName] extends InfiniteQueryDefinition<
    any,
    any,
    any,
    any,
    any
  >
    ? InfiniteData<
        ResultTypeFrom<Definitions[EndpointName]>,
        PageParamFrom<Definitions[EndpointName]>
      >
    : Definitions[EndpointName] extends QueryDefinition<any, any, any, any>
      ? ResultTypeFrom<Definitions[EndpointName]>
      : unknown

export type UpsertThunkResult<
  Definitions extends EndpointDefinitions,
  EndpointName extends AllQueryKeys<Definitions>,
> =
  Definitions[EndpointName] extends InfiniteQueryDefinition<
    any,
    any,
    any,
    any,
    any
  >
    ? InfiniteQueryActionCreatorResult<Definitions[EndpointName]>
    : Definitions[EndpointName] extends QueryDefinition<any, any, any, any>
      ? QueryActionCreatorResult<Definitions[EndpointName]>
      : QueryActionCreatorResult<never>

export type PatchCollection = {
  /**
   * An `immer` Patch describing the cache update.
   */
  patches: Patch[]
  /**
   * An `immer` Patch to revert the cache update.
   */
  inversePatches: Patch[]
  /**
   * A function that will undo the cache update.
   */
  undo: () => void
}

export type UpdateQueryDataThunk<
  Definitions extends EndpointDefinitions,
  PartialState,
> = <EndpointName extends AllQueryKeys<Definitions>>(
  endpointName: EndpointName,
  arg: QueryArgFromAnyQueryDefinition<Definitions, EndpointName>,
  updateRecipe: Recipe<DataFromAnyQueryDefinition<Definitions, EndpointName>>,
  updateProvided?: boolean,
) => ThunkAction<PatchCollection, PartialState, any, UnknownAction>

export type UpsertQueryDataThunk<
  Definitions extends EndpointDefinitions,
  PartialState,
> = <EndpointName extends AllQueryKeys<Definitions>>(
  endpointName: EndpointName,
  arg: QueryArgFromAnyQueryDefinition<Definitions, EndpointName>,
  value: DataFromAnyQueryDefinition<Definitions, EndpointName>,
) => ThunkAction<
  UpsertThunkResult<Definitions, EndpointName>,
  PartialState,
  any,
  UnknownAction
>
