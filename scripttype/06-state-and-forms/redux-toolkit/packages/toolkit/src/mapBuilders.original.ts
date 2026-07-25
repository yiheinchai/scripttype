/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/mapBuilders.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Action<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AsyncThunk<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AsyncThunkConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CaseReducer<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
