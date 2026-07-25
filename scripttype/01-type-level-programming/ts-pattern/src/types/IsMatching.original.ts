/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-pattern/src/types/IsMatching.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type All<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Equal<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsLiteral<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsPlainObject<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsUnion<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Length<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Primitives<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ValueOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type IsMatchingArray<
  a extends readonly any[],
  b extends readonly any[]
> = b extends readonly []
  ? true // if b is an empty array and a is an array, the pattern matches.
  : b extends readonly [infer b1, ...infer bRest]
  ? a extends readonly [infer a1, ...infer aRest]
    ? IsMatching<a1, b1> extends true
      ? IsMatchingArray<aRest, bRest>
      : false
    : // if a is shorter than b, doesn't match
    // example: a is [], b is [any, ...any[]]
    a extends readonly []
    ? false
    : IsMatching<ValueOf<a>, b1> extends true
    ? IsMatchingArray<a, bRest>
    : false
  : b extends readonly [...infer bInit, infer b1]
  ? a extends readonly [...infer aInit, infer a1]
    ? IsMatching<a1, b1> extends true
      ? IsMatchingArray<aInit, bInit>
      : false
    : // if a is shorter than b, doesn't match
    // example: a is [], b is [any, ...any[]]
    a extends readonly []
    ? false
    : IsMatching<ValueOf<a>, b1> extends true
    ? IsMatchingArray<a, bInit>
    : false
  : IsMatching<ValueOf<a>, ValueOf<b>>;

export type IsMatching<a, b> = true extends IsUnion<a> | IsUnion<b>
  ? true extends (
      b extends any ? (a extends any ? IsMatching<a, b> : never) : never
    )
    ? true
    : false
  : // Special case for unknown, because this is the type
  // of the inverted `_` wildcard pattern, which should
  // match everything.
  unknown extends b
  ? true
  : // Special case for `{}`, because this is the type
  // of the inverted `P.nonNullable` wildcard pattern,
  // which should match all objects.
  {} extends b
  ? true
  : b extends Primitives
  ? // if the pattern is a primitive, we want to check if there is
    // an overlap between a and b!
    a extends b
    ? true
    : b extends a
    ? true
    : false
  : Equal<a, b> extends true
  ? true
  : b extends readonly any[]
  ? a extends readonly any[]
    ? // both tuples
      All<[IsLiteral<Length<a>>, IsLiteral<Length<b>>]> extends true
      ? // lengths are different
        Equal<Length<a>, Length<b>> extends false
        ? false
        : IsMatchingTuple<a, b>
      : IsMatchingArray<a, b>
    : false
  : IsPlainObject<b> extends true
  ? true extends ( // `true extends union` means "if some cases of the a union are matching"
      a extends any // loop over the `a` union
        ? [keyof b & keyof a] extends [never] // if no common keys
          ? false
          : /**
           * Intentionally not using ValueOf, to avoid reaching the
           * 'type instanciation is too deep error'.
           */
          { [k in keyof b & keyof a]: IsMatching<a[k], b[k]> }[keyof b &
              keyof a] extends true
          ? true // all values are matching
          : false
        : never
    )
    ? true
    : false
  : b extends a
  ? true
  : false;

export type IsMatchingTuple<a extends readonly any[], b extends readonly any[]> = [
  a,
  b
] extends [readonly [], readonly []]
  ? true
  : [a, b] extends [
      readonly [infer a1, ...infer aRest],
      readonly [infer b1, ...infer bRest]
    ]
  ? IsMatching<a1, b1> extends true
    ? IsMatchingTuple<aRest, bRest>
    : false
  : false;
