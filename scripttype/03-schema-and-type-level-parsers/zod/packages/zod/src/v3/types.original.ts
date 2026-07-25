/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/zod/packages/zod/src/v3/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Generator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IssueData<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Readonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlySet<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ZodArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ZodError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ZodNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ZodObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ZodOptional<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ZodTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ZodType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type objectUtil<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TypeOf<T extends ZodType<any, any, any>> = T["_output"];

export type input<T extends ZodType<any, any, any>> = T["_input"];

export type output<T extends ZodType<any, any, any>> = T["_output"];

export type SafeParseSuccess<Output> = {
  success: true;
  data: Output;
  error?: never;
};

export type SafeParseError<Input> = {
  success: false;
  error: ZodError<Input>;
  data?: never;
};

export type SafeParseReturnType<Input, Output> = SafeParseSuccess<Output> | SafeParseError<Input>;

export type ZodTypeAny = ZodType<any, any, any>;

export type ArrayCardinality = "many" | "atleastone";

export type arrayOutputType<
  T extends ZodTypeAny,
  Cardinality extends ArrayCardinality = "many",
> = Cardinality extends "atleastone" ? [T["_output"], ...T["_output"][]] : T["_output"][];

export type ZodNonEmptyArray<T extends ZodTypeAny> = ZodArray<T, "atleastone">;

export type mergeTypes<A, B> = {
  [k in keyof A | keyof B]: k extends keyof B ? B[k] : k extends keyof A ? A[k] : never;
};

export type ZodRawShape = { [k: string]: ZodTypeAny };

export type UnknownKeysParam = "passthrough" | "strict" | "strip";

export type baseObjectOutputType<Shape extends ZodRawShape> = {
  [k in keyof Shape]: Shape[k]["_output"];
};

export type CatchallOutput<T extends ZodType> = ZodType extends T ? unknown : { [k: string]: T["_output"] };

export type PassthroughType<T extends UnknownKeysParam> = T extends "passthrough" ? { [k: string]: unknown } : unknown;

export type objectOutputType<
  Shape extends ZodRawShape,
  Catchall extends ZodTypeAny,
  UnknownKeys extends UnknownKeysParam = UnknownKeysParam,
> = objectUtil.flatten<objectUtil.addQuestionMarks<baseObjectOutputType<Shape>>> &
  CatchallOutput<Catchall> &
  PassthroughType<UnknownKeys>;

export type baseObjectInputType<Shape extends ZodRawShape> = objectUtil.addQuestionMarks<{
  [k in keyof Shape]: Shape[k]["_input"];
}>;

export type CatchallInput<T extends ZodType> = ZodType extends T ? unknown : { [k: string]: T["_input"] };

export type objectInputType<
  Shape extends ZodRawShape,
  Catchall extends ZodTypeAny,
  UnknownKeys extends UnknownKeysParam = UnknownKeysParam,
> = objectUtil.flatten<baseObjectInputType<Shape>> & CatchallInput<Catchall> & PassthroughType<UnknownKeys>;

export type deoptional<T extends ZodTypeAny> = T extends ZodOptional<infer U>
  ? deoptional<U>
  : T extends ZodNullable<infer U>
    ? ZodNullable<deoptional<U>>
    : T;

export type noUnrecognized<Obj extends object, Shape extends object> = {
  [k in keyof Obj]: k extends keyof Shape ? Obj[k] : never;
};

export type ZodDiscriminatedUnionOption<Discriminator extends string> = ZodObject<
  { [key in Discriminator]: ZodTypeAny } & ZodRawShape,
  UnknownKeysParam,
  ZodTypeAny
>;

export type AssertArray<T> = T extends any[] ? T : never;

export type ZodTupleItems = [ZodTypeAny, ...ZodTypeAny[]];

export type OutputTypeOfTuple<T extends ZodTupleItems | []> = AssertArray<{
  [k in keyof T]: T[k] extends ZodType<any, any, any> ? T[k]["_output"] : never;
}>;

export type OutputTypeOfTupleWithRest<
  T extends ZodTupleItems | [],
  Rest extends ZodTypeAny | null = null,
> = Rest extends ZodTypeAny ? [...OutputTypeOfTuple<T>, ...Rest["_output"][]] : OutputTypeOfTuple<T>;

export type InputTypeOfTuple<T extends ZodTupleItems | []> = AssertArray<{
  [k in keyof T]: T[k] extends ZodType<any, any, any> ? T[k]["_input"] : never;
}>;

export type InputTypeOfTupleWithRest<
  T extends ZodTupleItems | [],
  Rest extends ZodTypeAny | null = null,
> = Rest extends ZodTypeAny ? [...InputTypeOfTuple<T>, ...Rest["_input"][]] : InputTypeOfTuple<T>;

export type BRAND<T extends string | number | symbol> = {
  [BRAND]: { [k in T]: true };
};

export type RecordType<K extends string | number | symbol, V> = [string] extends [K]
  ? Record<K, V>
  : [number] extends [K]
    ? Record<K, V>
    : [symbol] extends [K]
      ? Record<K, V>
      : [BRAND<string | number | symbol>] extends [K]
        ? Record<K, V>
        : Partial<Record<K, V>>;

export type OuterTypeOfFunction<
  Args extends ZodTuple<any, any>,
  Returns extends ZodTypeAny,
> = Args["_input"] extends Array<any> ? (...args: Args["_input"]) => Returns["_output"] : never;

export type InnerTypeOfFunction<
  Args extends ZodTuple<any, any>,
  Returns extends ZodTypeAny,
> = Args["_output"] extends Array<any> ? (...args: Args["_output"]) => Returns["_input"] : never;

export type ArrayKeys = keyof any[];

export type Indices<T> = Exclude<keyof T, ArrayKeys>;

export type EnumValues<T extends string = string> = readonly [T, ...T[]];

export type Values<T extends EnumValues> = {
  [k in T[number]]: k;
};

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export type FilterEnum<Values, ToExclude> = Values extends []
  ? []
  : Values extends [infer Head, ...infer Rest]
    ? Head extends ToExclude
      ? FilterEnum<Rest, ToExclude>
      : [Head, ...FilterEnum<Rest, ToExclude>]
    : never;

export type typecast<A, T> = A extends T ? A : never;

export interface RefinementCtx {
  addIssue: (arg: IssueData) => void;
  path: (string | number)[];
}

export type Refinement<T> = (arg: T, ctx: RefinementCtx) => any;

export type SuperRefinement<T> = (arg: T, ctx: RefinementCtx) => void | Promise<void>;

export type RefinementEffect<T> = {
  type: "refinement";
  refinement: (arg: T, ctx: RefinementCtx) => any;
};

export type TransformEffect<T> = {
  type: "transform";
  transform: (arg: T, ctx: RefinementCtx) => any;
};

export type PreprocessEffect<T> = {
  type: "preprocess";
  transform: (arg: T, ctx: RefinementCtx) => any;
};

export type Effect<T> = RefinementEffect<T> | TransformEffect<T> | PreprocessEffect<T>;

export type ZodOptionalType<T extends ZodTypeAny> = ZodOptional<T>;

export type ZodNullableType<T extends ZodTypeAny> = ZodNullable<T>;

export type BuiltIn =
  | (((...args: any[]) => any) | (new (...args: any[]) => any))
  | { readonly [Symbol.toStringTag]: string }
  | Date
  | Error
  | Generator
  | Promise<unknown>
  | RegExp;

export type MakeReadonly<T> = T extends Map<infer K, infer V>
  ? ReadonlyMap<K, V>
  : T extends Set<infer V>
    ? ReadonlySet<V>
    : T extends [infer Head, ...infer Tail]
      ? readonly [Head, ...Tail]
      : T extends Array<infer V>
        ? ReadonlyArray<V>
        : T extends BuiltIn
          ? T
          : Readonly<T>;
