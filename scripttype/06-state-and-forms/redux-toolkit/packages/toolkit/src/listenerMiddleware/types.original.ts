/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/listenerMiddleware/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AbortController<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AbortSignal<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Action<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type BaseActionCreator<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Dispatch<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Middleware<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PayloadAction<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReturnType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TaskAbortError<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ThunkDispatch<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TypedActionCreator<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnknownAction<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type MatchFunction<T> = (v: any) => v is T

export type TypedActionCreatorWithMatchFunction<Type extends string> =
  TypedActionCreator<Type> & {
    match: MatchFunction<any>
  }

export type AnyListenerPredicate<State> = (
  action: UnknownAction,
  currentState: State,
  originalState: State,
) => boolean

export type ListenerPredicate<ActionType extends Action, State> = (
  action: UnknownAction,
  currentState: State,
  originalState: State,
) => action is ActionType

export interface ForkedTaskAPI {
  /**
   * Returns a promise that resolves when `waitFor` resolves or
   * rejects if the task or the parent listener has been cancelled or is completed.
   */
  pause<W>(waitFor: Promise<W>): Promise<W>
  /**
   * Returns a promise that resolves after `timeoutMs` or
   * rejects if the task or the parent listener has been cancelled or is completed.
   * @param timeoutMs
   */
  delay(timeoutMs: number): Promise<void>
  /**
   * An abort signal whose `aborted` property is set to `true`
   * if the task execution is either aborted or completed.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal
   */
  signal: AbortSignal
}

export interface AsyncTaskExecutor<T> {
  (forkApi: ForkedTaskAPI): Promise<T>
}

export interface SyncTaskExecutor<T> {
  (forkApi: ForkedTaskAPI): T
}

export type ForkedTaskExecutor<T> = AsyncTaskExecutor<T> | SyncTaskExecutor<T>

export type TaskResolved<T> = {
  readonly status: 'ok'
  readonly value: T
}

export type TaskRejected = {
  readonly status: 'rejected'
  readonly error: unknown
}

export type TaskCancelled = {
  readonly status: 'cancelled'
  readonly error: TaskAbortError
}

export type TaskResult<Value> =
  | TaskResolved<Value>
  | TaskRejected
  | TaskCancelled

export interface ConditionFunction<State> {
  (predicate: AnyListenerPredicate<State>, timeout?: number): Promise<boolean>
  (predicate: AnyListenerPredicate<State>, timeout?: number): Promise<boolean>
  (predicate: () => boolean, timeout?: number): Promise<boolean>
}

export type TakePatternOutputWithoutTimeout<
  State,
  Predicate extends AnyListenerPredicate<State>,
> =
  Predicate extends MatchFunction<infer ActionType>
    ? Promise<[ActionType, State, State]>
    : Promise<[UnknownAction, State, State]>

export type TakePatternOutputWithTimeout<
  State,
  Predicate extends AnyListenerPredicate<State>,
> =
  Predicate extends MatchFunction<infer ActionType>
    ? Promise<[ActionType, State, State] | null>
    : Promise<[UnknownAction, State, State] | null>

export interface TakePattern<State> {
  <Predicate extends AnyListenerPredicate<State>>(
    predicate: Predicate,
  ): TakePatternOutputWithoutTimeout<State, Predicate>
  <Predicate extends AnyListenerPredicate<State>>(
    predicate: Predicate,
    timeout: number,
  ): TakePatternOutputWithTimeout<State, Predicate>
  <Predicate extends AnyListenerPredicate<State>>(
    predicate: Predicate,
    timeout?: number | undefined,
  ): TakePatternOutputWithTimeout<State, Predicate>
}

export interface ForkOptions {
  /**
   * If true, causes the parent task to not be marked as complete until
   * all autoJoined forks have completed or failed.
   */
  autoJoin: boolean
}

export interface ForkedTask<T> {
  /**
   * A promise that resolves when the task is either completed or cancelled or rejects
   * if parent listener execution is cancelled or completed.
   *
   * ### Example
   * ```ts
   * const result = await fork(async (forkApi) => Promise.resolve(4)).result;
   *
   * if (result.status === 'ok') {
   *   console.log(result.value); // logs 4
   * }
   * ```
   */
  result: Promise<TaskResult<T>>
  /**
   * Cancel task if it is in progress or not yet started,
   * it is noop otherwise.
   */
  cancel(): void
}

export interface ListenerEffectAPI<
  State,
  DispatchType extends Dispatch,
  ExtraArgument = unknown,
> extends MiddlewareAPI<DispatchType, State> {
  /**
   * Returns the store state as it existed when the action was originally dispatched, _before_ the reducers ran.
   *
   * ### Synchronous invocation
   *
   * This function can **only** be invoked **synchronously**, it throws error otherwise.
   *
   * @example
   *
   * ```ts
   * middleware.startListening({
   *   predicate: () => true,
   *   async effect(_, { getOriginalState }) {
   *     getOriginalState(); // sync: OK!
   *
   *     setTimeout(getOriginalState, 0); // async: throws Error
   *
   *     await Promise().resolve();
   *
   *     getOriginalState(); // async: throws Error
   *   },
   * });
   * ```
   */
  getOriginalState: () => State
  /**
   * Removes the listener entry from the middleware and prevent future instances of the listener from running.
   *
   * It does **not** cancel any active instances.
   */
  unsubscribe(): void
  /**
   * It will subscribe a listener if it was previously removed, noop otherwise.
   */
  subscribe(): void
  /**
   * Returns a promise that resolves when the input predicate returns `true` or
   * rejects if the listener has been cancelled or is completed.
   *
   * The return value is `true` if the predicate succeeds or `false` if a timeout is provided and expires first.
   *
   * ### Example
   *
   * ```ts
   * import { createAction } from '@reduxjs/toolkit';
   *
   * const updateBy = createAction<number>('counter/updateBy');
   *
   * middleware.startListening({
   *   actionCreator: updateBy,
   *   async effect(_, { condition }) {
   *     // wait at most 3s for `updateBy` actions.
   *     if (await condition(updateBy.match, 3_000)) {
   *       // `updateBy` has been dispatched twice in less than 3s.
   *     }
   *   },
   * });
   * ```
   */
  condition: ConditionFunction<State>
  /**
   * Returns a promise that resolves when the input predicate returns `true` or
   * rejects if the listener has been cancelled or is completed.
   *
   * The return value is the `[action, currentState, previousState]` combination that the predicate saw as arguments.
   *
   * The promise resolves to null if a timeout is provided and expires first,
   *
   * ### Example
   *
   * ```ts
   * const updateBy = createAction<number>('counter/updateBy');
   *
   * middleware.startListening({
   *  actionCreator: updateBy,
   *  async effect(_, { take }) {
   *    const [{ payload }] =  await take(updateBy.match);
   *    console.log(payload); // logs 5;
   *  }
   * })
   *
   * store.dispatch(updateBy(5));
   * ```
   */
  take: TakePattern<State>
  /**
   * Cancels all other running instances of this same listener except for the one that made this call.
   */
  cancelActiveListeners: () => void
  /**
   * Cancels the instance of this listener that made this call.
   */
  cancel: () => void
  /**
   * Throws a `TaskAbortError` if this listener has been cancelled
   */
  throwIfCancelled: () => void
  /**
   * An abort signal whose `aborted` property is set to `true`
   * if the listener execution is either aborted or completed.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal
   */
  signal: AbortSignal
  /**
   * Returns a promise that resolves after `timeoutMs` or
   * rejects if the listener has been cancelled or is completed.
   */
  delay(timeoutMs: number): Promise<void>
  /**
   * Queues in the next microtask the execution of a task.
   * @param executor
   * @param options
   */
  fork<T>(executor: ForkedTaskExecutor<T>, options?: ForkOptions): ForkedTask<T>
  /**
   * Returns a promise that resolves when `waitFor` resolves or
   * rejects if the listener has been cancelled or is completed.
   * @param promise
   */
  pause<M>(promise: Promise<M>): Promise<M>
  extra: ExtraArgument
}

export type ListenerEffect<
  ActionType extends Action,
  State,
  DispatchType extends Dispatch,
  ExtraArgument = unknown,
> = (
  action: ActionType,
  api: ListenerEffectAPI<State, DispatchType, ExtraArgument>,
) => void | Promise<void>

export interface UnsubscribeListenerOptions {
  cancelActive?: true
}

export type UnsubscribeListener = (
  unsubscribeOptions?: UnsubscribeListenerOptions,
) => void

export type ListenerMiddleware<
  State = unknown,
  DispatchType extends ThunkDispatch<State, unknown, Action> = ThunkDispatch<
    State,
    unknown,
    UnknownAction
  >,
  ExtraArgument = unknown,
> = Middleware<
  {
    (action: Action<'listenerMiddleware/add'>): UnsubscribeListener
  },
  State,
  DispatchType
>

export type ListenerPredicateGuardedActionType<T> =
  T extends ListenerPredicate<infer ActionType, any> ? ActionType : never

export type GuardedType<T> = T extends (x: any, ...args: any[]) => x is infer T
  ? T
  : never

export type AddListenerOverloads<
  Return,
  StateType = unknown,
  DispatchType extends Dispatch = ThunkDispatch<
    StateType,
    unknown,
    UnknownAction
  >,
  ExtraArgument = unknown,
  AdditionalOptions = unknown,
> = {
  /** Accepts a "listener predicate" that is also a TS type predicate for the action*/
  <
    MiddlewareActionType extends UnknownAction,
    ListenerPredicateType extends ListenerPredicate<
      MiddlewareActionType,
      StateType
    >,
  >(
    options: {
      actionCreator?: never
      type?: never
      matcher?: never
      predicate: ListenerPredicateType
      effect: ListenerEffect<
        ListenerPredicateGuardedActionType<ListenerPredicateType>,
        StateType,
        DispatchType,
        ExtraArgument
      >
    } & AdditionalOptions,
  ): Return

  /** Accepts an RTK action creator, like `incrementByAmount` */
  <ActionCreatorType extends TypedActionCreatorWithMatchFunction<any>>(
    options: {
      actionCreator: ActionCreatorType
      type?: never
      matcher?: never
      predicate?: never
      effect: ListenerEffect<
        ReturnType<ActionCreatorType>,
        StateType,
        DispatchType,
        ExtraArgument
      >
    } & AdditionalOptions,
  ): Return

  /** Accepts a specific action type string */
  <T extends string>(
    options: {
      actionCreator?: never
      type: T
      matcher?: never
      predicate?: never
      effect: ListenerEffect<Action<T>, StateType, DispatchType, ExtraArgument>
    } & AdditionalOptions,
  ): Return

  /** Accepts an RTK matcher function, such as `incrementByAmount.match` */
  <MatchFunctionType extends MatchFunction<Action>>(
    options: {
      actionCreator?: never
      type?: never
      matcher: MatchFunctionType
      predicate?: never
      effect: ListenerEffect<
        GuardedType<MatchFunctionType>,
        StateType,
        DispatchType,
        ExtraArgument
      >
    } & AdditionalOptions,
  ): Return

  /** Accepts a "listener predicate" that just returns a boolean, no type assertion */
  <ListenerPredicateType extends AnyListenerPredicate<StateType>>(
    options: {
      actionCreator?: never
      type?: never
      matcher?: never
      predicate: ListenerPredicateType
      effect: ListenerEffect<
        UnknownAction,
        StateType,
        DispatchType,
        ExtraArgument
      >
    } & AdditionalOptions,
  ): Return
}

export type RemoveListenerOverloads<
  StateType = unknown,
  DispatchType extends Dispatch = ThunkDispatch<
    StateType,
    unknown,
    UnknownAction
  >,
  ExtraArgument = unknown,
> = AddListenerOverloads<
  boolean,
  StateType,
  DispatchType,
  ExtraArgument,
  UnsubscribeListenerOptions
>

export type ListenerEntry<
  State = unknown,
  DispatchType extends Dispatch = Dispatch,
> = {
  id: string
  effect: ListenerEffect<any, State, DispatchType>
  unsubscribe: () => void
  pending: Set<AbortController>
  type?: string
  predicate: ListenerPredicate<UnknownAction, State>
}

export type TypedAddListener<
  StateType,
  DispatchType extends Dispatch = ThunkDispatch<
    StateType,
    unknown,
    UnknownAction
  >,
  ExtraArgument = unknown,
  Payload = ListenerEntry<StateType, DispatchType>,
  T extends string = 'listenerMiddleware/add',
> = BaseActionCreator<Payload, T> &
  AddListenerOverloads<
    PayloadAction<Payload, T>,
    StateType,
    DispatchType,
    ExtraArgument
  > & {
    /**
     * Creates a "pre-typed" version of `addListener`
     * where the `state`, `dispatch` and `extra` types are predefined.
     *
     * This allows you to set the `state`, `dispatch` and `extra` types once,
     * eliminating the need to specify them with every `addListener` call.
     *
     * @returns A pre-typed `addListener` with the state, dispatch and extra types already defined.
     *
     * @example
     * ```ts
     * import { addListener } from '@reduxjs/toolkit';
     *
     * export const addAppListener = addListener.withTypes<
     *   RootState,
     *   AppDispatch,
     *   ExtraArguments
     * >();
     * ```
     *
     * @template OverrideStateType - The specific type of state the middleware listener operates on.
     * @template OverrideDispatchType - The specific type of the dispatch function.
     * @template OverrideExtraArgument - The specific type of the extra object.
     *
     * @since 2.1.0
     */
    withTypes: <
      OverrideStateType extends StateType,
      OverrideDispatchType extends Dispatch = ThunkDispatch<
        OverrideStateType,
        unknown,
        UnknownAction
      >,
      OverrideExtraArgument = unknown,
    >() => TypedAddListener<
      OverrideStateType,
      OverrideDispatchType,
      OverrideExtraArgument
    >
  }

export type TypedRemoveListener<
  StateType,
  DispatchType extends Dispatch = ThunkDispatch<
    StateType,
    unknown,
    UnknownAction
  >,
  ExtraArgument = unknown,
  Payload = ListenerEntry<StateType, DispatchType>,
  T extends string = 'listenerMiddleware/remove',
> = BaseActionCreator<Payload, T> &
  AddListenerOverloads<
    PayloadAction<Payload, T>,
    StateType,
    DispatchType,
    ExtraArgument,
    UnsubscribeListenerOptions
  > & {
    /**
     * Creates a "pre-typed" version of `removeListener`
     * where the `state`, `dispatch` and `extra` types are predefined.
     *
     * This allows you to set the `state`, `dispatch` and `extra` types once,
     * eliminating the need to specify them with every `removeListener` call.
     *
     * @returns A pre-typed `removeListener` with the state, dispatch and extra
     * types already defined.
     *
     * @example
     * ```ts
     * import { removeListener } from '@reduxjs/toolkit'
     *
     * export const removeAppListener = removeListener.withTypes<
     *   RootState,
     *   AppDispatch,
     *   ExtraArguments
     * >()
     * ```
     *
     * @template OverrideStateType - The specific type of state the middleware listener operates on.
     * @template OverrideDispatchType - The specific type of the dispatch function.
     * @template OverrideExtraArgument - The specific type of the extra object.
     *
     * @since 2.1.0
     */
    withTypes: <
      OverrideStateType extends StateType,
      OverrideDispatchType extends Dispatch = ThunkDispatch<
        OverrideStateType,
        unknown,
        UnknownAction
      >,
      OverrideExtraArgument = unknown,
    >() => TypedRemoveListener<
      OverrideStateType,
      OverrideDispatchType,
      OverrideExtraArgument
    >
  }

export type TypedStartListening<
  StateType,
  DispatchType extends Dispatch = ThunkDispatch<
    StateType,
    unknown,
    UnknownAction
  >,
  ExtraArgument = unknown,
> = AddListenerOverloads<
  UnsubscribeListener,
  StateType,
  DispatchType,
  ExtraArgument
> & {
  /**
   * Creates a "pre-typed" version of
   * {@linkcode ListenerMiddlewareInstance.startListening | startListening}
   * where the `state`, `dispatch` and `extra` types are predefined.
   *
   * This allows you to set the `state`, `dispatch` and `extra` types once,
   * eliminating the need to specify them with every
   * {@linkcode ListenerMiddlewareInstance.startListening | startListening}
   * call.
   *
   * @returns A pre-typed `startListening` with the state, dispatch and extra types already defined.
   *
   * @example
   * ```ts
   * import { createListenerMiddleware } from '@reduxjs/toolkit'
   *
   * const listenerMiddleware = createListenerMiddleware()
   *
   * export const startAppListening = listenerMiddleware.startListening.withTypes<
   *   RootState,
   *   AppDispatch,
   *   ExtraArguments
   * >()
   * ```
   *
   * @template OverrideStateType - The specific type of state the middleware listener operates on.
   * @template OverrideDispatchType - The specific type of the dispatch function.
   * @template OverrideExtraArgument - The specific type of the extra object.
   *
   * @since 2.1.0
   */
  withTypes: <
    OverrideStateType extends StateType,
    OverrideDispatchType extends Dispatch = ThunkDispatch<
      OverrideStateType,
      unknown,
      UnknownAction
    >,
    OverrideExtraArgument = unknown,
  >() => TypedStartListening<
    OverrideStateType,
    OverrideDispatchType,
    OverrideExtraArgument
  >
}

export type TypedStopListening<
  StateType,
  DispatchType extends Dispatch = ThunkDispatch<
    StateType,
    unknown,
    UnknownAction
  >,
  ExtraArgument = unknown,
> = RemoveListenerOverloads<StateType, DispatchType, ExtraArgument> & {
  /**
   * Creates a "pre-typed" version of
   * {@linkcode ListenerMiddlewareInstance.stopListening | stopListening}
   * where the `state`, `dispatch` and `extra` types are predefined.
   *
   * This allows you to set the `state`, `dispatch` and `extra` types once,
   * eliminating the need to specify them with every
   * {@linkcode ListenerMiddlewareInstance.stopListening | stopListening} call.
   *
   * @returns A pre-typed `stopListening` with the state, dispatch and extra types already defined.
   *
   * @example
   * ```ts
   * import { createListenerMiddleware } from '@reduxjs/toolkit'
   *
   * const listenerMiddleware = createListenerMiddleware()
   *
   * export const stopAppListening = listenerMiddleware.stopListening.withTypes<
   *   RootState,
   *   AppDispatch,
   *   ExtraArguments
   * >()
   * ```
   *
   * @template OverrideStateType - The specific type of state the middleware listener operates on.
   * @template OverrideDispatchType - The specific type of the dispatch function.
   * @template OverrideExtraArgument - The specific type of the extra object.
   *
   * @since 2.1.0
   */
  withTypes: <
    OverrideStateType extends StateType,
    OverrideDispatchType extends Dispatch = ThunkDispatch<
      OverrideStateType,
      unknown,
      UnknownAction
    >,
    OverrideExtraArgument = unknown,
  >() => TypedStopListening<
    OverrideStateType,
    OverrideDispatchType,
    OverrideExtraArgument
  >
}

export type TypedCreateListenerEntry<
  StateType,
  DispatchType extends Dispatch = ThunkDispatch<
    StateType,
    unknown,
    UnknownAction
  >,
  ExtraArgument = unknown,
> = AddListenerOverloads<
  ListenerEntry<StateType, DispatchType>,
  StateType,
  DispatchType,
  ExtraArgument
> & {
  /**
   * Creates a "pre-typed" version of `createListenerEntry`
   * where the `state`, `dispatch` and `extra` types are predefined.
   *
   * This allows you to set the `state`, `dispatch` and `extra` types once, eliminating
   * the need to specify them with every `createListenerEntry` call.
   *
   * @returns A pre-typed `createListenerEntry` with the state, dispatch and extra
   * types already defined.
   *
   * @example
   * ```ts
   * import { createListenerEntry } from '@reduxjs/toolkit'
   *
   * export const createAppListenerEntry = createListenerEntry.withTypes<
   *   RootState,
   *   AppDispatch,
   *   ExtraArguments
   * >()
   * ```
   *
   * @template OverrideStateType - The specific type of state the middleware listener operates on.
   * @template OverrideDispatchType - The specific type of the dispatch function.
   * @template OverrideExtraArgument - The specific type of the extra object.
   *
   * @since 2.1.0
   */
  withTypes: <
    OverrideStateType extends StateType,
    OverrideDispatchType extends Dispatch = ThunkDispatch<
      OverrideStateType,
      unknown,
      UnknownAction
    >,
    OverrideExtraArgument = unknown,
  >() => TypedStopListening<
    OverrideStateType,
    OverrideDispatchType,
    OverrideExtraArgument
  >
}
