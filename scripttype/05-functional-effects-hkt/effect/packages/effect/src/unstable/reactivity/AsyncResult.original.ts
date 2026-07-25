/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/reactivity/AsyncResult.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Cause<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LazyArg<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Option<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pipeable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Predicate<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlySet<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Refinement<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Types<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface Initial<A, E = never> extends AsyncResult.Proto<A, E> {
  readonly _tag: "Initial"
}

export interface Success<A, E = never> extends AsyncResult.Proto<A, E> {
  readonly _tag: "Success"
  readonly value: A
  readonly timestamp: number
}

export interface Failure<A, E = never> extends AsyncResult.Proto<A, E> {
  readonly _tag: "Failure"
  readonly cause: Cause.Cause<E>
  readonly previousSuccess: Option.Option<Success<A, E>>
}

export type AsyncResult<A, E = never> = Initial<A, E> | Success<A, E> | Failure<A, E>

export type With<R extends AsyncResult<any, any>, A, E> = R extends Initial<infer _A, infer _E> ? Initial<A, E>
  : R extends Success<infer _A, infer _E> ? Success<A, E>
  : R extends Failure<infer _A, infer _E> ? Failure<A, E>
  : never

export interface Interrupt {
  readonly _: unique symbol
}

export interface Defect {
  readonly _: unique symbol
}

export type Builder<Out, A, E, I, F> =
  & Pipeable
  & {
    onWaiting<B>(f: (result: AsyncResult<A, E>) => B): Builder<Out | B, A, E, I, F>
    orElse<B>(orElse: LazyArg<B>): Out | B
    orNull(): Out | null
    render(): [A | I] extends [never] ? Out : Out | null
  }
  & ([A | E | I | F] extends [never] ? {
      exhaustive(): Out
    } :
    unknown)
  & ([I] extends [never] ? unknown :
    {
      onInitial<B>(f: (result: Initial<A, E>) => B): Builder<Out | B, A, E, never, F>
      onInitialOrWaiting<B>(f: (result: AsyncResult<A, E>) => B): Builder<Out | B, A, E, never, F>
    })
  & ([A] extends [never] ? unknown :
    {
      onSuccess<B>(f: (value: A, result: Success<A, E>) => B): Builder<Out | B, never, E, I, F>
    })
  & ([E] extends [never] ? unknown : {
    onError<B>(f: (error: E, result: Failure<A, E>) => B): Builder<Out | B, A, never, I, F>

    onErrorIf<B extends E, C>(
      refinement: Refinement<E, B>,
      f: (error: B, result: Failure<A, E>) => C
    ): Builder<Out | C, A, Types.EqualsWith<E, B, E, Exclude<E, B>>, I, F>
    onErrorIf<C>(
      predicate: Predicate<E>,
      f: (error: E, result: Failure<A, E>) => C
    ): Builder<Out | C, A, E, I, F>

    onErrorTag<const Tags extends ReadonlyArray<Types.Tags<E>>, B>(
      tags: Tags,
      f: (error: Types.ExtractTag<E, Tags[number]>, result: Failure<A, E>) => B
    ): Builder<Out | B, A, Types.ExcludeTag<E, Tags[number]>, I, F>
    onErrorTag<const Tag extends Types.Tags<E>, B>(
      tag: Tag,
      f: (error: Types.ExtractTag<E, Tag>, result: Failure<A, E>) => B
    ): Builder<Out | B, A, Types.ExcludeTag<E, Tag>, I, F>
  })
  & ([E | F] extends [never] ? unknown : {
    onFailure<B>(f: (cause: Cause.Cause<E>, result: Failure<A, E>) => B): Builder<Out | B, A, never, I, never>
  })
  & (Interrupt extends F ? {
      onInterrupt<B>(
        f: (interruptors: ReadonlySet<number>, result: Failure<A, E>) => B
      ): Builder<Out | B, A, E, I, Exclude<F, Interrupt>>
    } :
    unknown)
  & (Defect extends F ? {
      onDefect<B>(f: (defect: unknown, result: Failure<A, E>) => B): Builder<Out | B, A, E, I, Exclude<F, Defect>>
    } :
    unknown)
