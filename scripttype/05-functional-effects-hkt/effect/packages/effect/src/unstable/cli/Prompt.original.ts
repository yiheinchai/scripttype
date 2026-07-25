/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/cli/Prompt.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Covariant<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Data<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type FileSystem<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Iterable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Path<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Terminal<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type Action<State, Output> = Data.TaggedEnum<{
  readonly Beep: {}
  readonly NextFrame: { readonly state: State }
  readonly Submit: { readonly value: Output }
}>

export type ProcessInput<A> = Data.TaggedEnum<{
  readonly Input: { readonly input: Terminal.UserInput }
  readonly Event: { readonly value: A }
}>

export type Environment = FileSystem.FileSystem | Path.Path | Terminal.Terminal

export interface Prompt<Output> extends Effect.Effect<Output, Terminal.QuitError, Environment> {
  readonly [TypeId]: {
    readonly _Output: Covariant<Output>
  }
}

export type Any = Prompt<unknown>

export type ReturnIterable<T extends Iterable<Any>> = [T] extends [Iterable<Prompt<infer A>>] ? Prompt<Array<A>>
    : never

export type ReturnTuple<T extends ReadonlyArray<unknown>> = Prompt<
    T[number] extends never ? []
      : { -readonly [K in keyof T]: [T[K]] extends [Prompt<infer _A>] ? _A : never }
  > extends infer X ? X : never

export type ReturnObject<T> = [T] extends [{ [K: string]: Any }] ? Prompt<
      {
        -readonly [K in keyof T]: [T[K]] extends [Prompt<infer _A>] ? _A : never
      }
    >
    : never

export type Return<
    Arg extends Iterable<Any> | Record<string, Any>
  > = [Arg] extends [ReadonlyArray<Any>] ? ReturnTuple<Arg>
    : [Arg] extends [Iterable<Any>] ? ReturnIterable<Arg>
    : [Arg] extends [Record<string, Any>] ? ReturnObject<Arg>
    : never

export type Op<Tag extends string, Body = {}> = Prompt<never> & Body & {
  readonly _tag: Tag
}
