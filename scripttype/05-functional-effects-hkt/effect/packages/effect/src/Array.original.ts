/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Array.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Iterable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type NonEmptyReadonlyArray<A> = readonly [A, ...Array<A>]

export type NonEmptyArray<A> = [A, ...Array<A>]

export type Infer<S extends Iterable<any>> = S extends ReadonlyArray<infer A> ? A
    : S extends Iterable<infer A> ? A
    : never

export type With<S extends Iterable<any>, A> = S extends NonEmptyReadonlyArray<any> ? NonEmptyArray<A>
    : Array<A>

export type OrNonEmpty<
    S extends Iterable<any>,
    T extends Iterable<any>,
    A
  > = S extends NonEmptyReadonlyArray<any> ? NonEmptyArray<A>
    : T extends NonEmptyReadonlyArray<any> ? NonEmptyArray<A>
    : Array<A>

export type AndNonEmpty<
    S extends Iterable<any>,
    T extends Iterable<any>,
    A
  > = S extends NonEmptyReadonlyArray<any> ? T extends NonEmptyReadonlyArray<any> ? NonEmptyArray<A>
    : Array<A>
    : Array<A>

export type Flatten<T extends ReadonlyArray<ReadonlyArray<any>>> = T extends
    NonEmptyReadonlyArray<NonEmptyReadonlyArray<any>> ? NonEmptyArray<T[number][number]>
    : Array<T[number][number]>
