/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/createSlice.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ActionCreatorWithoutPayload<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AsyncThunk<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AsyncThunkConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AsyncThunkOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AsyncThunkPayloadCreator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AsyncThunkReducers<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CaseReducer<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Id<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InjectConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PayloadAction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PayloadActionCreator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PrepareAction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReducerType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Selector<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownAction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _ActionCreatorWithPreparedPayload<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type InjectIntoConfig<NewReducerPath extends string> = InjectConfig & {
  reducerPath?: NewReducerPath
}

export type ReducerDefinition<T extends ReducerType = ReducerType> = {
  _reducerDefinitionType: T
}

export type CaseReducerWithPrepare<State, Action extends PayloadAction> = {
  reducer: CaseReducer<State, Action>
  prepare: PrepareAction<Action['payload']>
}

export type SliceCaseReducers<State> =
  | Record<string, ReducerDefinition>
  | Record<
      string,
      | CaseReducer<State, PayloadAction<any>>
      | CaseReducerWithPrepare<State, PayloadAction<any, string, any, any>>
    >

export type SliceSelectors<State> = {
  [K: string]: (sliceState: State, ...args: any[]) => any
}

export type ActionCreatorForCaseReducerWithPrepare<
  CR extends { prepare: any },
  Type extends string,
> = _ActionCreatorWithPreparedPayload<CR['prepare'], Type>

export type SliceActionType<
  SliceName extends string,
  ActionName extends keyof any,
> = ActionName extends string | number ? `${SliceName}/${ActionName}` : string

export type AsyncThunkSliceReducerConfig<
  State,
  ThunkArg extends any,
  Returned = unknown,
  ThunkApiConfig extends AsyncThunkConfig = {},
> = AsyncThunkReducers<State, ThunkArg, Returned, ThunkApiConfig> & {
  options?: AsyncThunkOptions<ThunkArg, ThunkApiConfig>
}

export type AsyncThunkSliceReducerDefinition<
  State,
  ThunkArg extends any,
  Returned = unknown,
  ThunkApiConfig extends AsyncThunkConfig = {},
> = AsyncThunkSliceReducerConfig<State, ThunkArg, Returned, ThunkApiConfig> &
  ReducerDefinition<ReducerType.asyncThunk> & {
    payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, ThunkApiConfig>
  }

export type ActionCreatorForCaseReducer<CR, Type extends string> = CR extends (
  state: any,
  action: infer Action,
) => any
  ? Action extends { payload: infer P }
    ? PayloadActionCreator<P, Type>
    : ActionCreatorWithoutPayload<Type>
  : ActionCreatorWithoutPayload<Type>

export type CaseReducerActions<
  CaseReducers extends SliceCaseReducers<any>,
  SliceName extends string,
> = {
  [Type in keyof CaseReducers]: CaseReducers[Type] extends infer Definition
    ? Definition extends { prepare: any }
      ? ActionCreatorForCaseReducerWithPrepare<
          Definition,
          SliceActionType<SliceName, Type>
        >
      : Definition extends AsyncThunkSliceReducerDefinition<
            any,
            infer ThunkArg,
            infer Returned,
            infer ThunkApiConfig
          >
        ? AsyncThunk<Returned, ThunkArg, ThunkApiConfig>
        : Definition extends { reducer: any }
          ? ActionCreatorForCaseReducer<
              Definition['reducer'],
              SliceActionType<SliceName, Type>
            >
          : ActionCreatorForCaseReducer<
              Definition,
              SliceActionType<SliceName, Type>
            >
    : never
}

export type SliceDefinedCaseReducers<CaseReducers extends SliceCaseReducers<any>> = {
  [Type in keyof CaseReducers]: CaseReducers[Type] extends infer Definition
    ? Definition extends AsyncThunkSliceReducerDefinition<any, any, any>
      ? Id<
          Pick<
            Required<Definition>,
            'fulfilled' | 'rejected' | 'pending' | 'settled'
          >
        >
      : Definition extends {
            reducer: infer Reducer
          }
        ? Reducer
        : Definition
    : never
}

export type RemappedSelector<S extends Selector, NewState> =
  S extends Selector<any, infer R, infer P>
    ? Selector<NewState, R, P> & { unwrapped: S }
    : never

export type SliceDefinedSelectors<
  State,
  Selectors extends SliceSelectors<State>,
  RootState,
> = {
  [K in keyof Selectors as string extends K ? never : K]: RemappedSelector<
    Selectors[K],
    RootState
  >
}

export interface Slice<
  State = any,
  CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>,
  Name extends string = string,
  ReducerPath extends string = Name,
  Selectors extends SliceSelectors<State> = SliceSelectors<State>,
> {
  /**
   * The slice name.
   */
  name: Name

  /**
   *  The slice reducer path.
   */
  reducerPath: ReducerPath

  /**
   * The slice's reducer.
   */
  reducer: Reducer<State>

  /**
   * Action creators for the types of actions that are handled by the slice
   * reducer.
   */
  actions: CaseReducerActions<CaseReducers, Name>

  /**
   * The individual case reducer functions that were passed in the `reducers` parameter.
   * This enables reuse and testing if they were defined inline when calling `createSlice`.
   */
  caseReducers: SliceDefinedCaseReducers<CaseReducers>

  /**
   * Provides access to the initial state value given to the slice.
   * If a lazy state initializer was provided, it will be called and a fresh value returned.
   */
  getInitialState: () => State

  /**
   * Get localised slice selectors (expects to be called with *just* the slice's state as the first parameter)
   */
  getSelectors(): Id<SliceDefinedSelectors<State, Selectors, State>>

  /**
   * Get globalised slice selectors (`selectState` callback is expected to receive first parameter and return slice state)
   */
  getSelectors<RootState>(
    selectState: (rootState: RootState) => State,
  ): Id<SliceDefinedSelectors<State, Selectors, RootState>>

  /**
   * Selectors that assume the slice's state is `rootState[slice.reducerPath]` (which is usually the case)
   *
   * Equivalent to `slice.getSelectors((state: RootState) => state[slice.reducerPath])`.
   */
  get selectors(): Id<
    SliceDefinedSelectors<State, Selectors, { [K in ReducerPath]: State }>
  >

  /**
   * Inject slice into provided reducer (return value from `combineSlices`), and return injected slice.
   */
  injectInto<NewReducerPath extends string = ReducerPath>(
    this: this,
    injectable: {
      inject: (
        slice: { reducerPath: string; reducer: Reducer },
        config?: InjectConfig,
      ) => void
    },
    config?: InjectIntoConfig<NewReducerPath>,
  ): InjectedSlice<State, CaseReducers, Name, NewReducerPath, Selectors>

  /**
   * Select the slice state, using the slice's current reducerPath.
   *
   * Will throw an error if slice is not found.
   */
  selectSlice(state: { [K in ReducerPath]: State }): State
}

export type InjectedSlice<
  State = any,
  CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>,
  Name extends string = string,
  ReducerPath extends string = Name,
  Selectors extends SliceSelectors<State> = SliceSelectors<State>,
> = Omit<
  Slice<State, CaseReducers, Name, ReducerPath, Selectors>,
  'getSelectors' | 'selectors'
> & {
  /**
   * Get localised slice selectors (expects to be called with *just* the slice's state as the first parameter)
   */
  getSelectors(): Id<SliceDefinedSelectors<State, Selectors, State | undefined>>

  /**
   * Get globalised slice selectors (`selectState` callback is expected to receive first parameter and return slice state)
   */
  getSelectors<RootState>(
    selectState: (rootState: RootState) => State | undefined,
  ): Id<SliceDefinedSelectors<State, Selectors, RootState>>

  /**
   * Selectors that assume the slice's state is `rootState[slice.name]` (which is usually the case)
   *
   * Equivalent to `slice.getSelectors((state: RootState) => state[slice.name])`.
   */
  get selectors(): Id<
    SliceDefinedSelectors<
      State,
      Selectors,
      { [K in ReducerPath]?: State | undefined }
    >
  >

  /**
   * Select the slice state, using the slice's current reducerPath.
   *
   * Returns initial state if slice is not found.
   */
  selectSlice(state: { [K in ReducerPath]?: State | undefined }): State
}

export type CaseReducerDefinition<
  S = any,
  A extends Action = UnknownAction,
> = CaseReducer<S, A> & ReducerDefinition<ReducerType.reducer>

export type PreventCircular<ThunkApiConfig> = {
  [K in keyof ThunkApiConfig]: K extends 'state' | 'dispatch'
    ? never
    : ThunkApiConfig[K]
}

export type ValidateSliceCaseReducers<
  S,
  ACR extends SliceCaseReducers<S>,
> = ACR & {
  [T in keyof ACR]: ACR[T] extends {
    reducer(s: S, action?: infer A): any
  }
    ? {
        prepare(...a: never[]): Omit<A, 'type'>
      }
    : {}
}
