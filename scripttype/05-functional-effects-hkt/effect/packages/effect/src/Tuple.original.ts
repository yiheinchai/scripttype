/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Tuple.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Indices<T extends ReadonlyArray<unknown>> = Exclude<Partial<T>["length"], T["length"]>

export type _BuildTuple<
  T extends ReadonlyArray<unknown>,
  K,
  Acc extends ReadonlyArray<unknown> = [],
  I extends ReadonlyArray<unknown> = [] // current index counter
> = I["length"] extends T["length"] ? Acc
  : _BuildTuple<
    T,
    K,
    // If current index is in K, keep the element; otherwise skip it
    I["length"] extends K ? [...Acc, T[I["length"]]] : Acc,
    [...I, unknown]
  >

export type PickTuple<T extends ReadonlyArray<unknown>, K> = _BuildTuple<T, K>

export type OmitTuple<T extends ReadonlyArray<unknown>, K> = _BuildTuple<T, Exclude<Indices<T>, K>>

export type Evolver<T> = { readonly [I in keyof T]?: ((a: T[I]) => unknown) | undefined }

export type Evolved<T, E> = { [I in keyof T]: I extends keyof E ? (E[I] extends (...a: any) => infer R ? R : T[I]) : T[I] }
