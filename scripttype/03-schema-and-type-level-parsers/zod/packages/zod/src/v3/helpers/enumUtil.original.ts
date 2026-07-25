/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/zod/packages/zod/src/v3/helpers/enumUtil.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type UnionToIntersectionFn<T> = (T extends unknown ? (k: () => T) => void : never) extends (
    k: infer Intersection
  ) => void
    ? Intersection
    : never;

export type GetUnionLast<T> = UnionToIntersectionFn<T> extends () => infer Last ? Last : never;

export type UnionToTuple<T, Tuple extends unknown[] = []> = [T] extends [never]
    ? Tuple
    : UnionToTuple<Exclude<T, GetUnionLast<T>>, [GetUnionLast<T>, ...Tuple]>;

export type CastToStringTuple<T> = T extends [string, ...string[]] ? T : never;

export type UnionToTupleString<T> = CastToStringTuple<UnionToTuple<T>>;
