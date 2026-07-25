/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/helpers.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Capitalize<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Lowercase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Equal<a, b> = (<T>() => T extends a ? 1 : 2) extends <
  T
>() => T extends b ? 1 : 2
  ? true
  : false;

export type IsNever<T> = [T] extends [never] ? true : false;

export type Expect<a extends true> = a;

export type Some<bools extends boolean[]> = true extends bools[number]
  ? true
  : false;

export type Every<bools extends boolean[]> = bools[number] extends true
  ? true
  : false;

export type Extends<a, b> = [a] extends [b] ? true : false;

export type Not<a extends boolean> = a extends true ? false : true;

export type UnionToIntersection<union> = (
  union extends any ? (k: union) => void : never
) extends (k: infer intersection) => void
  ? intersection
  : never;

export type Prettify<T> = { [K in keyof T]: T[K] } | never;

export type IsTuple<a extends readonly any[]> = a extends
  | readonly []
  | readonly [any, ...any]
  | readonly [...any, any]
  ? true
  : false;

export type IsArrayStrict<a> = a extends readonly any[]
  ? Not<IsTuple<a>>
  : false;

export type RecursivePrettify<T> = IsArrayStrict<T> extends true
  ? RecursivePrettify<Extract<T, readonly any[]>[number]>[]
  : { [K in keyof T]: RecursivePrettify<T[K]> };

export type Get<it extends readonly any[]> = it["length"];

export type Iterator<
    n extends number,
    it extends any[] = []
  > = it["length"] extends n ? it : Iterator<n, [any, ...it]>;

export type Next<it extends any[]> = [any, ...it];

export type Prev<it extends any[]> = it extends readonly [any, ...infer tail]
    ? tail
    : [];

export type KebabToCamel<str> = str extends `${infer first}-${infer rest}`
  ? `${first}${KebabToCamel<Capitalize<rest>>}`
  : str;

export type SnakeToCamel<str> = str extends `${infer first}_${infer rest}`
  ? `${first}${SnakeToCamel<Capitalize<rest>>}`
  : str;

export type CamelCase<str> = KebabToCamel<SnakeToCamel<str>>;

export type UppercaseLetter =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";

export type SnakeCase<
  str,
  output extends string = ""
> = str extends `${infer first}${infer rest}`
  ? first extends UppercaseLetter
    ? output extends ""
      ? SnakeCase<rest, Lowercase<first>>
      : SnakeCase<rest, `${output}_${Lowercase<first>}`>
    : first extends "-"
    ? SnakeCase<rest, `${output}_`>
    : SnakeCase<rest, `${output}${first}`>
  : output extends ""
  ? str
  : output;

export type KebabCase<
  str,
  output extends string = ""
> = str extends `${infer first}${infer rest}`
  ? first extends UppercaseLetter
    ? output extends ""
      ? KebabCase<rest, Lowercase<first>>
      : KebabCase<rest, `${output}-${Lowercase<first>}`>
    : first extends "_"
    ? KebabCase<rest, `${output}-`>
    : KebabCase<rest, `${output}${first}`>
  : output extends ""
  ? str
  : output;

export type GetUnionLast<Union> = UnionToIntersection<
  Union extends any ? () => Union : never
> extends () => infer Last
  ? Last
  : never;

export type UnionToTuple<Union, Tuple extends unknown[] = []> = [
  Union
] extends [never]
  ? Tuple
  : UnionToTuple<
      Exclude<Union, GetUnionLast<Union>>,
      [GetUnionLast<Union>, ...Tuple]
    >;

export type Split<
  Str,
  Sep extends string,
  Acc extends string[] = []
> = Str extends ""
  ? Acc
  : Str extends `${infer T}${Sep}${infer U}`
  ? Split<U, Sep, [...Acc, T]>
  : [...Acc, Str];

export type Head<xs> = xs extends [infer first, ...any] ? first : never;
