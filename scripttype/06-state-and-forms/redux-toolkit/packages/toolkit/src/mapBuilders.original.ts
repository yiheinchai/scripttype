/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/mapBuilders.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Action<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AsyncThunk<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AsyncThunkConfig<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type CaseReducer<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReturnType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type AsyncThunkReducers<
  State,
  ThunkArg extends any,
  Returned = unknown,
  ThunkApiConfig extends AsyncThunkConfig = {},
> = {
  pending?: CaseReducer<
    State,
    ReturnType<AsyncThunk<Returned, ThunkArg, ThunkApiConfig>['pending']>
  >
  rejected?: CaseReducer<
    State,
    ReturnType<AsyncThunk<Returned, ThunkArg, ThunkApiConfig>['rejected']>
  >
  fulfilled?: CaseReducer<
    State,
    ReturnType<AsyncThunk<Returned, ThunkArg, ThunkApiConfig>['fulfilled']>
  >
  settled?: CaseReducer<
    State,
    ReturnType<
      AsyncThunk<Returned, ThunkArg, ThunkApiConfig>['rejected' | 'fulfilled']
    >
  >
}

export type TypedActionCreator<Type extends string> = {
  (...args: any[]): Action<Type>
  type: Type
}
