/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/match/impl/match.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Call<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Extract<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Fn<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PartialApply<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Primitive<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnionToIntersection<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type arg<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type unset<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type GetWithDefault<Obj, K, Def> = K extends keyof Obj ? Obj[K] : Def;

export type ReplaceArgsWithConstraint<pattern> = pattern extends arg<
  any,
  infer Constraint
>
  ? Constraint
  : pattern extends Primitive
  ? pattern
  : pattern extends [any, ...any]
  ? { [key in keyof pattern]: ReplaceArgsWithConstraint<pattern[key]> }
  : pattern extends (infer V)[]
  ? ReplaceArgsWithConstraint<V>[]
  : pattern extends object
  ? { [key in keyof pattern]: ReplaceArgsWithConstraint<pattern[key]> }
  : pattern;

export type DoesMatch<value, pattern> =
  value extends ReplaceArgsWithConstraint<pattern> ? true : false;

export type ExtractArgObject<value, pattern> = pattern extends arg<infer N, any>
  ? { [K in N]: value }
  : pattern extends []
  ? {}
  : [value, pattern] extends [
      [infer valueFirst, ...infer valueRest],
      [infer patternFirst, ...infer patternRest]
    ]
  ? ExtractArgObject<valueRest, patternRest> &
      ExtractArgObject<valueFirst, patternFirst>
  : [value, pattern] extends [(infer valueFirst)[], (infer patternFirst)[]]
  ? ExtractArgObject<valueFirst, patternFirst>
  : [value, pattern] extends [object, object]
  ? UnionToIntersection<
      {
        [k in keyof value & keyof pattern]: ExtractArgObject<
          value[k],
          pattern[k]
        >;
      }[keyof value & keyof pattern]
    >
  : {};

export type WithDefaultArgs<Args extends any[], Def> = [Args[number]] extends [unset]
  ? Def
  : Args;

export type ArgObjectToArgs<T> = [
  GetWithDefault<T, 0, unset>,
  GetWithDefault<T, 1, unset>,
  GetWithDefault<T, 2, unset>,
  GetWithDefault<T, 3, unset>
];

export type ExtractArgs<value, pattern> = WithDefaultArgs<
  ArgObjectToArgs<ExtractArgObject<value, pattern>>,
  [value]
>;

export type With<pattern, handler> = { pattern: pattern; handler: handler };

export type Match<value, patterns extends With<any, any>[]> = patterns extends [
  With<infer pattern, infer handler>,
  ...infer restPatterns extends With<any, any>[]
]
  ? DoesMatch<value, pattern> extends true
    ? handler extends Fn
      ? Call<PartialApply<Extract<handler, Fn>, ExtractArgs<value, pattern>>>
      : handler
    : Match<value, restPatterns>
  : never;
