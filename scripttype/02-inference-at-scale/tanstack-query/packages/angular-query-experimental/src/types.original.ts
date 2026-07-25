/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-query/packages/angular-query-experimental/src/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DefaultError<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type DefinedInfiniteQueryObserverResult<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type DefinedQueryObserverResult<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Extract<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InfiniteQueryObserverResult<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MapToSignals<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MutateFunction<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MutationObserverResult<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type OmitKeyof<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Override<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Parameters<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type QueryObserverResult<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReturnType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Signal<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type CreateStatusBasedQueryResult<
  TStatus extends QueryObserverResult['status'],
  TData = unknown,
  TError = DefaultError,
> = Extract<QueryObserverResult<TData, TError>, { status: TStatus }>

export interface BaseQueryNarrowing<TData = unknown, TError = DefaultError> {
  isSuccess: (
    this: CreateBaseQueryResult<TData, TError>,
  ) => this is CreateBaseQueryResult<
    TData,
    TError,
    CreateStatusBasedQueryResult<'success', TData, TError>
  >
  isError: (
    this: CreateBaseQueryResult<TData, TError>,
  ) => this is CreateBaseQueryResult<
    TData,
    TError,
    CreateStatusBasedQueryResult<'error', TData, TError>
  >
  isPending: (
    this: CreateBaseQueryResult<TData, TError>,
  ) => this is CreateBaseQueryResult<
    TData,
    TError,
    CreateStatusBasedQueryResult<'pending', TData, TError>
  >
}

export type CreateBaseQueryResult<
  TData = unknown,
  TError = DefaultError,
  TState = QueryObserverResult<TData, TError>,
> = BaseQueryNarrowing<TData, TError> &
  MapToSignals<OmitKeyof<TState, keyof BaseQueryNarrowing, 'safely'>>

export type CreateQueryResult<
  TData = unknown,
  TError = DefaultError,
> = CreateBaseQueryResult<TData, TError>

export type DefinedCreateQueryResult<
  TData = unknown,
  TError = DefaultError,
  TState = DefinedQueryObserverResult<TData, TError>,
> = BaseQueryNarrowing<TData, TError> &
  MapToSignals<OmitKeyof<TState, keyof BaseQueryNarrowing, 'safely'>>

export type CreateInfiniteQueryResult<
  TData = unknown,
  TError = DefaultError,
> = BaseQueryNarrowing<TData, TError> &
  MapToSignals<InfiniteQueryObserverResult<TData, TError>>

export type DefinedCreateInfiniteQueryResult<
  TData = unknown,
  TError = DefaultError,
  TDefinedInfiniteQueryObserver = DefinedInfiniteQueryObserverResult<
    TData,
    TError
  >,
> = MapToSignals<TDefinedInfiniteQueryObserver>

export type CreateMutateFunction<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TOnMutateResult = unknown,
> = (
  ...args: Parameters<
    MutateFunction<TData, TError, TVariables, TOnMutateResult>
  >
) => void

export type CreateMutateAsyncFunction<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TOnMutateResult = unknown,
> = MutateFunction<TData, TError, TVariables, TOnMutateResult>

export type CreateBaseMutationResult<
  TData = unknown,
  TError = DefaultError,
  TVariables = unknown,
  TOnMutateResult = unknown,
> = Override<
  MutationObserverResult<TData, TError, TVariables, TOnMutateResult>,
  { mutate: CreateMutateFunction<TData, TError, TVariables, TOnMutateResult> }
> & {
  mutateAsync: CreateMutateAsyncFunction<
    TData,
    TError,
    TVariables,
    TOnMutateResult
  >
}

export type CreateStatusBasedMutationResult<
  TStatus extends CreateBaseMutationResult['status'],
  TData = unknown,
  TError = DefaultError,
  TVariables = unknown,
  TOnMutateResult = unknown,
> = Extract<
  CreateBaseMutationResult<TData, TError, TVariables, TOnMutateResult>,
  { status: TStatus }
>

export type SignalFunction<T extends () => any> = T & Signal<ReturnType<T>>

export interface BaseMutationNarrowing<
  TData = unknown,
  TError = DefaultError,
  TVariables = unknown,
  TOnMutateResult = unknown,
> {
  isSuccess: SignalFunction<
    (
      this: CreateMutationResult<TData, TError, TVariables, TOnMutateResult>,
    ) => this is CreateMutationResult<
      TData,
      TError,
      TVariables,
      TOnMutateResult,
      CreateStatusBasedMutationResult<
        'success',
        TData,
        TError,
        TVariables,
        TOnMutateResult
      >
    >
  >
  isError: SignalFunction<
    (
      this: CreateMutationResult<TData, TError, TVariables, TOnMutateResult>,
    ) => this is CreateMutationResult<
      TData,
      TError,
      TVariables,
      TOnMutateResult,
      CreateStatusBasedMutationResult<
        'error',
        TData,
        TError,
        TVariables,
        TOnMutateResult
      >
    >
  >
  isPending: SignalFunction<
    (
      this: CreateMutationResult<TData, TError, TVariables, TOnMutateResult>,
    ) => this is CreateMutationResult<
      TData,
      TError,
      TVariables,
      TOnMutateResult,
      CreateStatusBasedMutationResult<
        'pending',
        TData,
        TError,
        TVariables,
        TOnMutateResult
      >
    >
  >
  isIdle: SignalFunction<
    (
      this: CreateMutationResult<TData, TError, TVariables, TOnMutateResult>,
    ) => this is CreateMutationResult<
      TData,
      TError,
      TVariables,
      TOnMutateResult,
      CreateStatusBasedMutationResult<
        'idle',
        TData,
        TError,
        TVariables,
        TOnMutateResult
      >
    >
  >
}

export type CreateMutationResult<
  TData = unknown,
  TError = DefaultError,
  TVariables = unknown,
  TOnMutateResult = unknown,
  TState = CreateStatusBasedMutationResult<
    CreateBaseMutationResult['status'],
    TData,
    TError,
    TVariables,
    TOnMutateResult
  >,
> = BaseMutationNarrowing<TData, TError, TVariables, TOnMutateResult> &
  MapToSignals<OmitKeyof<TState, keyof BaseMutationNarrowing, 'safely'>>
