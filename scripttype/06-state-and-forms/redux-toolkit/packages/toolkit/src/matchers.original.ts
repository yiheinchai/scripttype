/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/matchers.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ActionFromMatcher<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AsyncThunk<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Matcher<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnionToIntersection<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type ActionMatchingAnyOf<Matchers extends Matcher<any>[]> =
  ActionFromMatcher<Matchers[number]>

export type ActionMatchingAllOf<Matchers extends Matcher<any>[]> =
  UnionToIntersection<ActionMatchingAnyOf<Matchers>>

export type AnyAsyncThunk = {
  pending: { match: (action: any) => action is any }
  fulfilled: { match: (action: any) => action is any }
  rejected: { match: (action: any) => action is any }
}

export type PendingActionFromAsyncThunk<T extends AnyAsyncThunk> =
  ActionFromMatcher<T['pending']>

export type RejectedActionFromAsyncThunk<T extends AnyAsyncThunk> =
  ActionFromMatcher<T['rejected']>

export type RejectedWithValueActionFromAsyncThunk<T extends AnyAsyncThunk> =
  ActionFromMatcher<T['rejected']> &
    (T extends AsyncThunk<any, any, { rejectValue: infer RejectedValue }>
      ? { payload: RejectedValue }
      : unknown)

export type FulfilledActionFromAsyncThunk<T extends AnyAsyncThunk> =
  ActionFromMatcher<T['fulfilled']>

export type ActionsFromAsyncThunk<T extends AnyAsyncThunk> =
  | ActionFromMatcher<T['pending']>
  | ActionFromMatcher<T['fulfilled']>
  | ActionFromMatcher<T['rejected']>
