/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/createAsyncThunk.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AbortSignal<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ActionCreatorWithPreparedPayload<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type FallbackIfUnknown<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type FulfillWithMeta<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Id<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsAny<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsUnknown<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type NonNullable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Omit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Pick<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RejectWithValue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReturnType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SafePromise<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ThunkDispatch<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnknownAction<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type BaseThunkAPI<
  S,
  E,
  D extends Dispatch = Dispatch,
  RejectedValue = unknown,
  RejectedMeta = unknown,
  FulfilledMeta = unknown,
> = {
  dispatch: D
  getState: () => S
  extra: E
  requestId: string
  signal: AbortSignal
  abort: (reason?: string) => void
  rejectWithValue: IsUnknown<
    RejectedMeta,
    (value: RejectedValue) => RejectWithValue<RejectedValue, RejectedMeta>,
    (
      value: RejectedValue,
      meta: RejectedMeta,
    ) => RejectWithValue<RejectedValue, RejectedMeta>
  >
  fulfillWithValue: IsUnknown<
    FulfilledMeta,
    <FulfilledValue>(value: FulfilledValue) => FulfilledValue,
    <FulfilledValue>(
      value: FulfilledValue,
      meta: FulfilledMeta,
    ) => FulfillWithMeta<FulfilledValue, FulfilledMeta>
  >
}

export type GetState<ThunkApiConfig> = ThunkApiConfig extends {
  state: infer State
}
  ? State
  : unknown

export type GetExtra<ThunkApiConfig> = ThunkApiConfig extends { extra: infer Extra }
  ? Extra
  : unknown

export type GetDispatch<ThunkApiConfig> = ThunkApiConfig extends {
  dispatch: infer Dispatch
}
  ? FallbackIfUnknown<
      Dispatch,
      ThunkDispatch<
        GetState<ThunkApiConfig>,
        GetExtra<ThunkApiConfig>,
        UnknownAction
      >
    >
  : ThunkDispatch<
      GetState<ThunkApiConfig>,
      GetExtra<ThunkApiConfig>,
      UnknownAction
    >

export type GetRejectValue<ThunkApiConfig> = ThunkApiConfig extends {
  rejectValue: infer RejectValue
}
  ? RejectValue
  : unknown

export type GetRejectedMeta<ThunkApiConfig> = ThunkApiConfig extends {
  rejectedMeta: infer RejectedMeta
}
  ? RejectedMeta
  : unknown

export type GetFulfilledMeta<ThunkApiConfig> = ThunkApiConfig extends {
  fulfilledMeta: infer FulfilledMeta
}
  ? FulfilledMeta
  : unknown

export type GetThunkAPI<ThunkApiConfig> = BaseThunkAPI<
  GetState<ThunkApiConfig>,
  GetExtra<ThunkApiConfig>,
  GetDispatch<ThunkApiConfig>,
  GetRejectValue<ThunkApiConfig>,
  GetRejectedMeta<ThunkApiConfig>,
  GetFulfilledMeta<ThunkApiConfig>
>

export type GetPendingMeta<ThunkApiConfig> = ThunkApiConfig extends {
  pendingMeta: infer PendingMeta
}
  ? PendingMeta
  : unknown

export interface SerializedError {
  name?: string
  message?: string
  stack?: string
  code?: string
}

export type GetSerializedErrorType<ThunkApiConfig> = ThunkApiConfig extends {
  serializedErrorType: infer GetSerializedErrorType
}
  ? GetSerializedErrorType
  : SerializedError

export type MaybePromise<T> = T | Promise<T> | (T extends any ? Promise<T> : never)

export type AsyncThunkConfig = {
  state?: unknown
  dispatch?: ThunkDispatch<unknown, unknown, UnknownAction>
  extra?: unknown
  rejectValue?: unknown
  serializedErrorType?: unknown
  pendingMeta?: unknown
  fulfilledMeta?: unknown
  rejectedMeta?: unknown
}

export type AsyncThunkPayloadCreatorReturnValue<
  Returned,
  ThunkApiConfig extends AsyncThunkConfig,
> = MaybePromise<
  | IsUnknown<
      GetFulfilledMeta<ThunkApiConfig>,
      Returned,
      FulfillWithMeta<Returned, GetFulfilledMeta<ThunkApiConfig>>
    >
  | RejectWithValue<
      GetRejectValue<ThunkApiConfig>,
      GetRejectedMeta<ThunkApiConfig>
    >
>

export type AsyncThunkPayloadCreator<
  Returned,
  ThunkArg = void,
  ThunkApiConfig extends AsyncThunkConfig = {},
> = (
  arg: ThunkArg,
  thunkAPI: GetThunkAPI<ThunkApiConfig>,
) => AsyncThunkPayloadCreatorReturnValue<Returned, ThunkApiConfig>

export type AsyncThunkFulfilledActionCreator<
  Returned,
  ThunkArg,
  ThunkApiConfig = {},
> = ActionCreatorWithPreparedPayload<
  [Returned, string, ThunkArg, GetFulfilledMeta<ThunkApiConfig>?],
  Returned,
  string,
  never,
  {
    arg: ThunkArg
    requestId: string
    requestStatus: 'fulfilled'
  } & GetFulfilledMeta<ThunkApiConfig>
>

export type AsyncThunkRejectedActionCreator<
  ThunkArg,
  ThunkApiConfig = {},
> = ActionCreatorWithPreparedPayload<
  [
    Error | null,
    string,
    ThunkArg,
    GetRejectValue<ThunkApiConfig>?,
    GetRejectedMeta<ThunkApiConfig>?,
  ],
  GetRejectValue<ThunkApiConfig> | undefined,
  string,
  GetSerializedErrorType<ThunkApiConfig>,
  {
    arg: ThunkArg
    requestId: string
    requestStatus: 'rejected'
    aborted: boolean
    condition: boolean
  } & (
    | ({ rejectedWithValue: false } & {
        [K in keyof GetRejectedMeta<ThunkApiConfig>]?: undefined
      })
    | ({ rejectedWithValue: true } & GetRejectedMeta<ThunkApiConfig>)
  )
>

export type AsyncThunkAction<
  Returned,
  ThunkArg,
  ThunkApiConfig extends AsyncThunkConfig,
> = (
  dispatch: NonNullable<GetDispatch<ThunkApiConfig>>,
  getState: () => GetState<ThunkApiConfig>,
  extra: GetExtra<ThunkApiConfig>,
) => SafePromise<
  | ReturnType<AsyncThunkFulfilledActionCreator<Returned, ThunkArg>>
  | ReturnType<AsyncThunkRejectedActionCreator<ThunkArg, ThunkApiConfig>>
> & {
  abort: (reason?: string) => void
  requestId: string
  arg: ThunkArg
  unwrap: () => Promise<Returned>
}

export interface AsyncThunkDispatchConfig {
  /**
   * An external `AbortSignal` that will be tracked by the internal `AbortSignal`.
   */
  signal?: AbortSignal
}

export type WithStrictNullChecks<True, False> = undefined extends boolean
  ? False
  : True

export type AsyncThunkActionCreator<
  Returned,
  ThunkArg,
  ThunkApiConfig extends AsyncThunkConfig,
> = IsAny<
  ThunkArg,
  // any handling
  (
    arg: ThunkArg,
    config?: AsyncThunkDispatchConfig,
  ) => AsyncThunkAction<Returned, ThunkArg, ThunkApiConfig>,
  // unknown handling
  unknown extends ThunkArg
    ? (
        arg: ThunkArg,
        config?: AsyncThunkDispatchConfig,
      ) => AsyncThunkAction<Returned, ThunkArg, ThunkApiConfig> // argument not specified or specified as void or undefined
    : [ThunkArg] extends [void] | [undefined]
      ? (
          arg?: undefined,
          config?: AsyncThunkDispatchConfig,
        ) => AsyncThunkAction<Returned, ThunkArg, ThunkApiConfig> // argument contains void
      : [void] extends [ThunkArg] // make optional
        ? (
            arg?: ThunkArg,
            config?: AsyncThunkDispatchConfig,
          ) => AsyncThunkAction<Returned, ThunkArg, ThunkApiConfig> // argument contains undefined
        : [undefined] extends [ThunkArg]
          ? WithStrictNullChecks<
              // with strict nullChecks: make optional
              (
                arg?: ThunkArg,
                config?: AsyncThunkDispatchConfig,
              ) => AsyncThunkAction<Returned, ThunkArg, ThunkApiConfig>,
              // without strict null checks this will match everything, so don't make it optional
              (
                arg: ThunkArg,
                config?: AsyncThunkDispatchConfig,
              ) => AsyncThunkAction<Returned, ThunkArg, ThunkApiConfig>
            > // default case: normal argument
          : (
              arg: ThunkArg,
              config?: AsyncThunkDispatchConfig,
            ) => AsyncThunkAction<Returned, ThunkArg, ThunkApiConfig>
>

export type AsyncThunkOptions<
  ThunkArg = void,
  ThunkApiConfig extends AsyncThunkConfig = {},
> = {
  /**
   * A method to control whether the asyncThunk should be executed. Has access to the
   * `arg`, `api.getState()` and `api.extra` arguments.
   *
   * @returns `false` if it should be skipped
   */
  condition?(
    arg: ThunkArg,
    api: Pick<GetThunkAPI<ThunkApiConfig>, 'getState' | 'extra'>,
  ): MaybePromise<boolean | undefined>
  /**
   * If `condition` returns `false`, the asyncThunk will be skipped.
   * This option allows you to control whether a `rejected` action with `meta.condition == false`
   * will be dispatched or not.
   *
   * @default `false`
   */
  dispatchConditionRejection?: boolean

  serializeError?: (x: unknown) => GetSerializedErrorType<ThunkApiConfig>

  /**
   * A function to use when generating the `requestId` for the request sequence.
   *
   * @default `nanoid`
   */
  idGenerator?: (arg: ThunkArg) => string
} & IsUnknown<
  GetPendingMeta<ThunkApiConfig>,
  {
    /**
     * A method to generate additional properties to be added to `meta` of the pending action.
     *
     * Using this optional overload will not modify the types correctly, this overload is only in place to support JavaScript users.
     * Please use the `ThunkApiConfig` parameter `pendingMeta` to get access to a correctly typed overload
     */
    getPendingMeta?(
      base: {
        arg: ThunkArg
        requestId: string
      },
      api: Pick<GetThunkAPI<ThunkApiConfig>, 'getState' | 'extra'>,
    ): GetPendingMeta<ThunkApiConfig>
  },
  {
    /**
     * A method to generate additional properties to be added to `meta` of the pending action.
     */
    getPendingMeta(
      base: {
        arg: ThunkArg
        requestId: string
      },
      api: Pick<GetThunkAPI<ThunkApiConfig>, 'getState' | 'extra'>,
    ): GetPendingMeta<ThunkApiConfig>
  }
>

export type AsyncThunkPendingActionCreator<
  ThunkArg,
  ThunkApiConfig = {},
> = ActionCreatorWithPreparedPayload<
  [string, ThunkArg, GetPendingMeta<ThunkApiConfig>?],
  undefined,
  string,
  never,
  {
    arg: ThunkArg
    requestId: string
    requestStatus: 'pending'
  } & GetPendingMeta<ThunkApiConfig>
>

export type AsyncThunk<
  Returned,
  ThunkArg,
  ThunkApiConfig extends AsyncThunkConfig,
> = AsyncThunkActionCreator<Returned, ThunkArg, ThunkApiConfig> & {
  pending: AsyncThunkPendingActionCreator<ThunkArg, ThunkApiConfig>
  rejected: AsyncThunkRejectedActionCreator<ThunkArg, ThunkApiConfig>
  fulfilled: AsyncThunkFulfilledActionCreator<
    Returned,
    ThunkArg,
    ThunkApiConfig
  >
  // matchSettled?
  settled: (
    action: any,
  ) => action is ReturnType<
    | AsyncThunkRejectedActionCreator<ThunkArg, ThunkApiConfig>
    | AsyncThunkFulfilledActionCreator<Returned, ThunkArg, ThunkApiConfig>
  >
  typePrefix: string
}

export type OverrideThunkApiConfigs<OldConfig, NewConfig> = Id<
  NewConfig & Omit<OldConfig, keyof NewConfig>
>

export type CreateAsyncThunkFunction<
  CurriedThunkApiConfig extends AsyncThunkConfig,
> = {
  /**
   *
   * @param typePrefix
   * @param payloadCreator
   * @param options
   *
   * @public
   */
  // separate signature without `AsyncThunkConfig` for better inference
  <Returned, ThunkArg = void>(
    typePrefix: string,
    payloadCreator: AsyncThunkPayloadCreator<
      Returned,
      ThunkArg,
      CurriedThunkApiConfig
    >,
    options?: AsyncThunkOptions<ThunkArg, CurriedThunkApiConfig>,
  ): AsyncThunk<Returned, ThunkArg, CurriedThunkApiConfig>

  /**
   *
   * @param typePrefix
   * @param payloadCreator
   * @param options
   *
   * @public
   */
  <Returned, ThunkArg, ThunkApiConfig extends AsyncThunkConfig>(
    typePrefix: string,
    payloadCreator: AsyncThunkPayloadCreator<
      Returned,
      ThunkArg,
      OverrideThunkApiConfigs<CurriedThunkApiConfig, ThunkApiConfig>
    >,
    options?: AsyncThunkOptions<
      ThunkArg,
      OverrideThunkApiConfigs<CurriedThunkApiConfig, ThunkApiConfig>
    >,
  ): AsyncThunk<
    Returned,
    ThunkArg,
    OverrideThunkApiConfigs<CurriedThunkApiConfig, ThunkApiConfig>
  >
}

export type CreateAsyncThunk<CurriedThunkApiConfig extends AsyncThunkConfig> =
  CreateAsyncThunkFunction<CurriedThunkApiConfig> & {
    withTypes<ThunkApiConfig extends AsyncThunkConfig>(): CreateAsyncThunk<
      OverrideThunkApiConfigs<CurriedThunkApiConfig, ThunkApiConfig>
    >
  }

export interface UnwrappableAction {
  payload: any
  meta?: any
  error?: any
}

export type UnwrappedActionPayload<T extends UnwrappableAction> = Exclude<
  T,
  { error: any }
>['payload']
