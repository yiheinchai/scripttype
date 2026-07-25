/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/combineSlices.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type NonUndefined<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PreloadedStateShapeFromReducersMapObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Reducer<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StateFromReducersMapObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnionToIntersection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SliceLike<ReducerPath extends string, State, PreloadedState = State> = {
  reducerPath: ReducerPath
  reducer: Reducer<State, any, PreloadedState>
}

export type AnySliceLike = SliceLike<string, any>

export type SliceLikeReducerPath<A extends AnySliceLike> =
  A extends SliceLike<infer ReducerPath, any> ? ReducerPath : never

export type SliceLikeState<A extends AnySliceLike> =
  A extends SliceLike<any, infer State, any> ? State : never

export type SliceLikePreloadedState<A extends AnySliceLike> =
  A extends SliceLike<any, any, infer PreloadedState> ? PreloadedState : never

export type WithSlice<A extends AnySliceLike> = {
  [Path in SliceLikeReducerPath<A>]: SliceLikeState<A>
}

export type WithSlicePreloadedState<A extends AnySliceLike> = {
  [Path in SliceLikeReducerPath<A>]: SliceLikePreloadedState<A>
}

export type ExistingSliceLike<DeclaredState, PreloadedState> = {
  [ReducerPath in keyof DeclaredState]: SliceLike<
    ReducerPath & string,
    NonUndefined<DeclaredState[ReducerPath]>,
    NonUndefined<PreloadedState[ReducerPath & keyof PreloadedState]>
  >
}[keyof DeclaredState]

export type ReducerMap = Record<string, Reducer>

export type InitialState<Slices extends Array<AnySliceLike | ReducerMap>> =
  UnionToIntersection<
    Slices[number] extends infer Slice
      ? Slice extends AnySliceLike
        ? WithSlice<Slice>
        : StateFromReducersMapObject<Slice>
      : never
  >

export type InitialPreloadedState<Slices extends Array<AnySliceLike | ReducerMap>> =
  UnionToIntersection<
    Slices[number] extends infer Slice
      ? Slice extends AnySliceLike
        ? WithSlicePreloadedState<Slice>
        : PreloadedStateShapeFromReducersMapObject<Slice>
      : never
  >
