/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/zod/packages/zod/src/v4/core/schemas.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type JSONSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ProcessParams<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StandardSchemaV1<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ToJSONSchemaContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type checks<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type core<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type errors<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type util<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type version<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface ParsePayload<T = unknown> {
  value: T;
  issues: errors.$ZodRawIssue[];
  /** A way to mark a whole payload as aborted. Used in codecs/pipes. */
  aborted?: boolean;
  /** @internal Marks a value as a fallback that an outer wrapper (e.g.
   * $ZodOptional) may override with its own interpretation when input was
   * undefined. Set by $ZodCatch when catchValue substitutes and by every
   * $ZodTransform invocation. */
  fallback?: boolean | undefined;
}

export type CheckFn<T> = (input: ParsePayload<T>) => util.MaybeAsync<void>;

export type $ZodStandardSchema<T> = StandardSchemaV1.Props<core.input<T>, core.output<T>>;

export type $ZodLooseShape = Record<string, any>;

export type OptionalOutSchema = { _zod: { optout: "optional" } };

export type $InferObjectOutput<T extends $ZodLooseShape, Extra extends Record<string, unknown>> = string extends keyof T
  ? util.IsAny<T[keyof T]> extends true
    ? Record<string, unknown>
    : Record<string, core.output<T[keyof T]>>
  : keyof (T & Extra) extends never
    ? Record<string, never>
    : util.Prettify<
        {
          -readonly [k in keyof T as T[k] extends OptionalOutSchema ? never : k]: T[k]["_zod"]["output"];
        } & {
          -readonly [k in keyof T as T[k] extends OptionalOutSchema ? k : never]?: T[k]["_zod"]["output"];
        } & Extra
      >;

export type OptionalInSchema = { _zod: { optin: "optional" } };

export type $InferObjectInput<T extends $ZodLooseShape, Extra extends Record<string, unknown>> = string extends keyof T
  ? util.IsAny<T[keyof T]> extends true
    ? Record<string, unknown>
    : Record<string, core.input<T[keyof T]>>
  : keyof (T & Extra) extends never
    ? Record<string, never>
    : util.Prettify<
        {
          -readonly [k in keyof T as T[k] extends OptionalInSchema ? never : k]: T[k]["_zod"]["input"];
        } & {
          -readonly [k in keyof T as T[k] extends OptionalInSchema ? k : never]?: T[k]["_zod"]["input"];
        } & Extra
      >;

export interface $ZodTypeDef {
  type:
    | "string"
    | "number"
    | "int"
    | "boolean"
    | "bigint"
    | "symbol"
    | "null"
    | "undefined"
    | "void" // merge with undefined?
    | "never"
    | "any"
    | "unknown"
    | "date"
    | "object"
    | "record"
    | "file"
    | "array"
    | "tuple"
    | "union"
    | "intersection"
    | "map"
    | "set"
    | "enum"
    | "literal"
    | "nullable"
    | "optional"
    | "nonoptional"
    | "success"
    | "transform"
    | "default"
    | "prefault"
    | "catch"
    | "nan"
    | "pipe"
    | "readonly"
    | "template_literal"
    | "promise"
    | "lazy"
    | "function"
    | "custom";
  error?: errors.$ZodErrorMap<never> | undefined;
  checks?: checks.$ZodCheck<never>[];
}

export interface ParseContextInternal<T extends errors.$ZodIssueBase = never> extends ParseContext<T> {
  readonly async?: boolean | undefined;
  readonly direction?: "forward" | "backward";
  readonly skipChecks?: boolean;
}

export interface $ZodTypeInternals<out O = unknown, out I = unknown> extends _$ZodTypeInternals {
  /** @internal The inferred output type */
  output: O; //extends { $out: infer O } ? O : Out;
  /** @internal The inferred input type */
  input: I; //extends { $in: infer I } ? I : In;
}

export interface $ZodType<
  O = unknown,
  I = unknown,
  Internals extends $ZodTypeInternals<O, I> = $ZodTypeInternals<O, I>,
> {
  _zod: Internals;
  "~standard": $ZodStandardSchema<this>;
}

export interface _$ZodTypeInternals {
  /** The `@zod/core` version of this schema */
  version: typeof version;

  /** Schema definition. */
  def: $ZodTypeDef;
  // types: Types;

  /** @internal Randomly generated ID for this schema. */
  // id: string;

  /** @internal List of deferred initializers. */
  deferred: util.AnyFunc[] | undefined;

  /** @internal Parses input and runs all checks (refinements). */
  run(payload: ParsePayload<any>, ctx: ParseContextInternal): util.MaybeAsync<ParsePayload>;

  /** @internal Parses input, doesn't run checks. */
  parse(payload: ParsePayload<any>, ctx: ParseContextInternal): util.MaybeAsync<ParsePayload>;

  /** @internal  Stores identifiers for the set of traits implemented by this schema. */
  traits: Set<string>;

  /** @internal Indicates that a schema output type should be considered optional inside objects.
   * @default Required
   */

  /** @internal */
  optin?: "optional" | undefined;
  /** @internal */
  optout?: "optional" | undefined;

  /** @internal The set of literal values that will pass validation. Must be an exhaustive set. Used to determine optionality in z.record().
   *
   * Defined on: enum, const, literal, null, undefined
   * Passthrough: optional, nullable, branded, default, catch, pipe
   * Todo: unions?
   */
  values?: util.PrimitiveSet | undefined;

  /** Default value bubbled up from  */
  // default?: unknown | undefined;

  /** @internal A set of literal discriminators used for the fast path in discriminated unions. */
  propValues?: util.PropValues | undefined;

  /** @internal This flag indicates that a schema validation can be represented with a regular expression. Used to determine allowable schemas in z.templateLiteral(). */
  pattern: RegExp | undefined;

  /** @internal The constructor function of this schema. */
  constr: new (
    def: any
  ) => $ZodType;

  /** @internal A catchall object for bag metadata related to this schema. Commonly modified by checks using `onattach`. */
  bag: Record<string, unknown>;

  /** @internal The set of issues this schema might throw during type checking. */
  isst: errors.$ZodIssueBase;

  /** @internal Subject to change, not a public API. */
  processJSONSchema?:
    | ((ctx: ToJSONSchemaContext, json: JSONSchema.BaseSchema, params: ProcessParams) => void)
    | undefined;

  /** An optional method used to override `toJSONSchema` logic. */
  toJSONSchema?: () => unknown;

  /** @internal The parent of this schema. Only set during certain clone operations. */
  parent?: $ZodType | undefined;
}

export type SomeType = { _zod: _$ZodTypeInternals };

export type $catchall<T extends SomeType> = {
  out: { [k: string]: core.output<T> };
  in: { [k: string]: core.input<T> };
};

export type $InferUnionOutput<T extends SomeType> = T extends any ? core.output<T> : never;

export type $InferUnionInput<T extends SomeType> = T extends any ? core.input<T> : never;

export type IsOptionalIn<T extends SomeType> = T extends OptionalInSchema ? true : false;

export type IsOptionalOut<T extends SomeType> = T extends OptionalOutSchema ? true : false;

export type TupleInputTypeNoOptionals<T extends util.TupleItems> = {
  [k in keyof T]: core.input<T[k]>;
};

export type TupleInputTypeWithOptionals<T extends util.TupleItems> = T extends readonly [
  ...infer Prefix extends SomeType[],
  infer Tail extends SomeType,
]
  ? Tail["_zod"]["optin"] extends "optional"
    ? [...TupleInputTypeWithOptionals<Prefix>, core.input<Tail>?]
    : TupleInputTypeNoOptionals<T>
  : [];

export type $InferTupleInputType<T extends util.TupleItems, Rest extends SomeType | null> = [
  ...TupleInputTypeWithOptionals<T>,
  ...(Rest extends SomeType ? core.input<Rest>[] : []),
];

export type TupleOutputTypeNoOptionals<T extends util.TupleItems> = {
  [k in keyof T]: core.output<T[k]>;
};

export type TupleOutputTypeWithOptionals<T extends util.TupleItems> = T extends readonly [
  ...infer Prefix extends SomeType[],
  infer Tail extends SomeType,
]
  ? Tail["_zod"]["optout"] extends "optional"
    ? [...TupleOutputTypeWithOptionals<Prefix>, core.output<Tail>?]
    : TupleOutputTypeNoOptionals<T>
  : [];

export type $InferTupleOutputType<T extends util.TupleItems, Rest extends SomeType | null> = [
  ...TupleOutputTypeWithOptionals<T>,
  ...(Rest extends SomeType ? core.output<Rest>[] : []),
];

export type $ZodRecordKey = $ZodType<string | number | symbol, unknown>;

export type $partial = { "~~partial": true };

export type $InferZodRecordOutput<
  Key extends $ZodRecordKey = $ZodRecordKey,
  Value extends SomeType = $ZodType,
> = Key extends $partial
  ? Partial<Record<core.output<Key>, core.output<Value>>>
  : Record<core.output<Key>, core.output<Value>>;

export type $InferZodRecordInput<
  Key extends $ZodRecordKey = $ZodRecordKey,
  Value extends SomeType = $ZodType,
> = Key extends $partial
  ? Partial<Record<core.input<Key> & PropertyKey, core.input<Value>>>
  : Record<core.input<Key> & PropertyKey, core.input<Value>>;

export type $InferEnumOutput<T extends util.EnumLike> = T[keyof T] & {};

export type $InferEnumInput<T extends util.EnumLike> = T[keyof T] & {};

export type UndefinedToEmptyString<T> = T extends undefined ? "" : T;

export type LiteralPart = Exclude<util.Literal, symbol>;

export type AppendToTemplateLiteral<
  Template extends string,
  Suffix extends LiteralPart | $ZodType,
> = Suffix extends LiteralPart
  ? `${Template}${UndefinedToEmptyString<Suffix>}`
  : Suffix extends $ZodType
    ? `${Template}${core.output<Suffix> extends infer T extends LiteralPart ? UndefinedToEmptyString<T> : never}`
    : never;

export type ConcatenateTupleOfStrings<T extends string[]> = T extends [
  infer First extends string,
  ...infer Rest extends string[],
]
  ? Rest extends string[]
    ? First extends ""
      ? ConcatenateTupleOfStrings<Rest>
      : `${First}${ConcatenateTupleOfStrings<Rest>}`
    : never
  : "";

export interface SchemaPartInternals extends $ZodTypeInternals<LiteralPart, LiteralPart> {
  pattern: RegExp;
}

export interface SchemaPart extends $ZodType {
  _zod: SchemaPartInternals;
}

export type $ZodTemplateLiteralPart = LiteralPart | SchemaPart;

export type ConvertPartsToStringTuple<Parts extends $ZodTemplateLiteralPart[]> = {
  [K in keyof Parts]: Parts[K] extends LiteralPart
    ? `${UndefinedToEmptyString<Parts[K]>}`
    : Parts[K] extends $ZodType
      ? `${core.output<Parts[K]> extends infer T extends LiteralPart ? UndefinedToEmptyString<T> : never}`
      : never;
};

export type ToTemplateLiteral<Parts extends $ZodTemplateLiteralPart[]> = ConcatenateTupleOfStrings<
  ConvertPartsToStringTuple<Parts>
>;

export type $PartsToTemplateLiteral<Parts extends $ZodTemplateLiteralPart[]> = [] extends Parts
  ? ``
  : Parts extends [...infer Rest, infer Last extends $ZodTemplateLiteralPart]
    ? Rest extends $ZodTemplateLiteralPart[]
      ? AppendToTemplateLiteral<$PartsToTemplateLiteral<Rest>, Last>
      : never
    : never;

export type $ZodFunctionArgs = $ZodType<unknown[], unknown[]>;

export type $ZodFunctionIn = $ZodFunctionArgs;

export type $ZodFunctionOut = $ZodType;

export type $InferInnerFunctionType<Args extends $ZodFunctionIn, Returns extends $ZodFunctionOut> = (
  ...args: $ZodFunctionIn extends Args ? never[] : core.output<Args>
) => core.input<Returns>;

export type $InferInnerFunctionTypeAsync<Args extends $ZodFunctionIn, Returns extends $ZodFunctionOut> = (
  ...args: $ZodFunctionIn extends Args ? never[] : core.output<Args>
) => util.MaybeAsync<core.input<Returns>>;

export type $InferOuterFunctionType<Args extends $ZodFunctionIn, Returns extends $ZodFunctionOut> = (
  ...args: $ZodFunctionIn extends Args ? never[] : core.input<Args>
) => core.output<Returns>;

export type $InferOuterFunctionTypeAsync<Args extends $ZodFunctionIn, Returns extends $ZodFunctionOut> = (
  ...args: $ZodFunctionIn extends Args ? never[] : core.input<Args>
) => Promise<core.output<Returns>>;
