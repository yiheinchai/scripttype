/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Chunk.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Covariant<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface IArray<A> {
  readonly _tag: "IArray"
  readonly array: ReadonlyArray<A>
}

export interface Chunk<out A> extends Iterable<A>, Equal.Equal, Pipeable, Inspectable {
  readonly [TypeId]: {
    readonly _A: Covariant<A>
  }
  readonly length: number
  right: Chunk<A>
  left: Chunk<A>
  backing: Backing<A>
  depth: number
}

export interface IConcat<A> {
  readonly _tag: "IConcat"
  readonly left: Chunk<A>
  readonly right: Chunk<A>
}

export interface ISingleton<A> {
  readonly _tag: "ISingleton"
  readonly a: A
}

export interface IEmpty {
  readonly _tag: "IEmpty"
}

export interface ISlice<A> {
  readonly _tag: "ISlice"
  readonly chunk: Chunk<A>
  readonly offset: number
  readonly length: number
}

export type Backing<A> =
  | IArray<A>
  | IConcat<A>
  | ISingleton<A>
  | IEmpty
  | ISlice<A>

export type Infer<S extends Chunk<any>> = S extends Chunk<infer A> ? A : never

export interface NonEmptyChunk<out A> extends Chunk<A>, NonEmptyIterable<A> {}

export type With<S extends Chunk<any>, A> = S extends NonEmptyChunk<any> ? NonEmptyChunk<A> : Chunk<A>

export type OrNonEmpty<S extends Chunk<any>, T extends Chunk<any>, A> = S extends NonEmptyChunk<any> ?
    NonEmptyChunk<A>
    : T extends NonEmptyChunk<any> ? NonEmptyChunk<A>
    : Chunk<A>

export type AndNonEmpty<S extends Chunk<any>, T extends Chunk<any>, A> = S extends NonEmptyChunk<any> ?
    T extends NonEmptyChunk<any> ? NonEmptyChunk<A>
    : Chunk<A> :
    Chunk<A>

export type Flatten<T extends Chunk<Chunk<any>>> = T extends NonEmptyChunk<NonEmptyChunk<infer A>> ? NonEmptyChunk<A>
    : T extends Chunk<Chunk<infer A>> ? Chunk<A>
    : never
