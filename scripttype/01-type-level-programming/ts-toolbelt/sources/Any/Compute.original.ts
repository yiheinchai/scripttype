/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Any/Compute.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BuiltIn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Depth<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Has<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type If<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ComputeRaw<A extends any> =
    A extends Function
    ? A
    : {[K in keyof A]: A[K]} & unknown

export type ComputeFlat<A extends any> =
    A extends BuiltIn ? A :
    A extends Array<any>
    ? A extends Array<Record<Key, any>>
      ? Array<{[K in keyof A[number]]: A[number][K]} & unknown>
      : A
    : A extends ReadonlyArray<any>
      ? A extends ReadonlyArray<Record<Key, any>>
        ? ReadonlyArray<{[K in keyof A[number]]: A[number][K]} & unknown>
        : A
      : {[K in keyof A]: A[K]} & unknown;

export type ComputeDeep<A extends any, Seen = never> =
    A extends BuiltIn ? A : If<Has<Seen, A>, A, (
      A extends Array<any>
      ? A extends Array<Record<Key, any>>
        ? Array<{[K in keyof A[number]]: ComputeDeep<A[number][K], A | Seen>} & unknown>
        : A
      : A extends ReadonlyArray<any>
        ? A extends ReadonlyArray<Record<Key, any>>
          ? ReadonlyArray<{[K in keyof A[number]]: ComputeDeep<A[number][K], A | Seen>} & unknown>
          : A
        : {[K in keyof A]: ComputeDeep<A[K], A | Seen>} & unknown
    )>;

export type Compute<A extends any, depth extends Depth = 'deep'> = {
    'flat': ComputeFlat<A>
    'deep': ComputeDeep<A>
}[depth]
