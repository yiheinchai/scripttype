/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-pattern/src/types/DistributeUnions.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BuildMany<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Flatten<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsMatching<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsPlainObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsStrictArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Length<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MaybeAddReadonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnionToTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ValueOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Values<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Distribute<unions extends readonly any[]> =
  unions extends readonly [
    { cases: infer cases; path: infer path },
    ...infer tail
  ]
    ? cases extends { value: infer value; subUnions: infer subUnions }
      ? [
          [value, path],
          ...Distribute<Extract<subUnions, readonly any[]>>,
          ...Distribute<tail>
        ]
      : never
    : [];

export type ArrayToVariadicUnion<input, excluded> = MaybeAddReadonly<
  | (input extends readonly [any, ...any] | readonly [...any, any] ? never : [])
  | (excluded extends readonly [...any, any]
      ? [...Extract<input, readonly any[]>, ValueOf<input>]
      : [ValueOf<input>, ...Extract<input, readonly any[]>]),
  IsReadonlyArray<input>
>;

export type FindUnions<
  a,
  p,
  path extends PropertyKey[] = []
> = unknown extends p
  ? []
  : IsAny<p> extends true
  ? [] // Don't try to find unions after 5 levels
  : Length<path> extends 5
  ? []
  : IsUnion<a> extends true
  ? [
      {
        cases: a extends any
          ? {
              value: a;
              subUnions: FindUnionsMany<a, p, path>;
            }
          : never;
        path: path;
      }
    ]
  : [a, p] extends [readonly any[], readonly any[]]
  ? [a, p] extends [
      readonly [infer a1, infer a2, infer a3, infer a4, infer a5],
      readonly [infer p1, infer p2, infer p3, infer p4, infer p5]
    ]
    ? [
        ...FindUnions<a1, p1, [...path, 0]>,
        ...FindUnions<a2, p2, [...path, 1]>,
        ...FindUnions<a3, p3, [...path, 2]>,
        ...FindUnions<a4, p4, [...path, 3]>,
        ...FindUnions<a5, p5, [...path, 4]>
      ]
    : [a, p] extends [
        readonly [infer a1, infer a2, infer a3, infer a4],
        readonly [infer p1, infer p2, infer p3, infer p4]
      ]
    ? [
        ...FindUnions<a1, p1, [...path, 0]>,
        ...FindUnions<a2, p2, [...path, 1]>,
        ...FindUnions<a3, p3, [...path, 2]>,
        ...FindUnions<a4, p4, [...path, 3]>
      ]
    : [a, p] extends [
        readonly [infer a1, infer a2, infer a3],
        readonly [infer p1, infer p2, infer p3]
      ]
    ? [
        ...FindUnions<a1, p1, [...path, 0]>,
        ...FindUnions<a2, p2, [...path, 1]>,
        ...FindUnions<a3, p3, [...path, 2]>
      ]
    : [a, p] extends [
        readonly [infer a1, infer a2],
        readonly [infer p1, infer p2]
      ]
    ? [...FindUnions<a1, p1, [...path, 0]>, ...FindUnions<a2, p2, [...path, 1]>]
    : [a, p] extends [readonly [infer a1], readonly [infer p1]]
    ? FindUnions<a1, p1, [...path, 0]>
    : /**
     * Special case when matching with a variadic tuple on a regular array.
     * in this case we turn the input array `A[]` into `[] | [A, ...A[]]`
     * to remove one of these cases during DeepExclude.
     */
    p extends readonly [] | readonly [any, ...any] | readonly [...any, any]
    ? IsStrictArray<Extract<a, readonly any[]>> extends false
      ? []
      : [
          ArrayToVariadicUnion<a, p> extends infer aUnion
            ? {
                cases: aUnion extends any
                  ? {
                      value: aUnion;
                      subUnions: [];
                    }
                  : never;
                path: path;
              }
            : never
        ]
    : []
  : a extends Set<any>
  ? []
  : a extends Map<any, any>
  ? []
  : [IsPlainObject<a>, IsPlainObject<p>] extends [true, true]
  ? Flatten<
      Values<{
        [k in keyof a & keyof p]: FindUnions<a[k], p[k], [...path, k]>;
      }>
    >
  : [];

export type FindUnionsMany<
  a,
  p,
  path extends PropertyKey[] = []
> = UnionToTuple<
  (
    p extends any
      ? IsMatching<a, p> extends true
        ? FindUnions<a, p, path>
        : []
      : never
  ) extends readonly (infer T)[]
    ? T
    : never
>;

export type DistributeMatchingUnions<a, p> = IsAny<a> extends true
  ? any
  : BuildMany<a, Distribute<FindUnionsMany<a, p>>>;
