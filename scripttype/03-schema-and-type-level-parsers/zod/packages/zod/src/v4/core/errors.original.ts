/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/zod/packages/zod/src/v4/core/errors.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type $ZodCheck<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type $ZodStringFormats<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type $ZodType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PropertyKey<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type util<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface $ZodIssueBase {
  readonly code?: string;
  readonly input?: unknown;
  readonly path: PropertyKey[];
  readonly message: string;
}

export type $ZodInvalidTypeExpected =
  | "string"
  | "number"
  | "int"
  | "boolean"
  | "bigint"
  | "symbol"
  | "undefined"
  | "null"
  | "never"
  | "void"
  | "date"
  | "array"
  | "object"
  | "tuple"
  | "record"
  | "map"
  | "set"
  | "file"
  | "nonoptional"
  | "nan"
  | "function"
  | (string & {});

export interface $ZodIssueInvalidType<Input = unknown> extends $ZodIssueBase {
  readonly code: "invalid_type";
  readonly expected: $ZodInvalidTypeExpected;
  readonly input?: Input;
}

export interface $ZodIssueTooBig<Input = unknown> extends $ZodIssueBase {
  readonly code: "too_big";
  readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
  readonly maximum: number | bigint;
  readonly inclusive?: boolean;
  readonly exact?: boolean;
  readonly input?: Input;
}

export interface $ZodIssueTooSmall<Input = unknown> extends $ZodIssueBase {
  readonly code: "too_small";
  readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
  readonly minimum: number | bigint;
  /** True if the allowable range includes the minimum */
  readonly inclusive?: boolean;
  /** True if the allowed value is fixed (e.g.` z.length(5)`), not a range (`z.minLength(5)`) */
  readonly exact?: boolean;
  readonly input?: Input;
}

export interface $ZodIssueInvalidStringFormat extends $ZodIssueBase {
  readonly code: "invalid_format";
  readonly format: $ZodStringFormats | (string & {});
  readonly pattern?: string;
  readonly input?: string;
}

export interface $ZodIssueNotMultipleOf<Input extends number | bigint = number | bigint> extends $ZodIssueBase {
  readonly code: "not_multiple_of";
  readonly divisor: number;
  readonly input?: Input;
}

export interface $ZodIssueUnrecognizedKeys extends $ZodIssueBase {
  readonly code: "unrecognized_keys";
  readonly keys: string[];
  readonly input?: Record<string, unknown>;
}

export interface $ZodIssueInvalidUnionNoMatch extends $ZodIssueBase {
  readonly code: "invalid_union";
  readonly errors: $ZodIssue[][];
  readonly input?: unknown;
  readonly discriminator?: string | undefined;
  readonly options?: util.Primitive[];
  readonly inclusive?: true;
}

export interface $ZodIssueInvalidUnionMultipleMatch extends $ZodIssueBase {
  readonly code: "invalid_union";
  readonly errors: [];
  readonly input?: unknown;
  readonly discriminator?: string | undefined;
  readonly inclusive: false;
}

export type $ZodIssueInvalidUnion = $ZodIssueInvalidUnionNoMatch | $ZodIssueInvalidUnionMultipleMatch;

export interface $ZodIssueInvalidKey<Input = unknown> extends $ZodIssueBase {
  readonly code: "invalid_key";
  readonly origin: "map" | "record";
  readonly issues: $ZodIssue[];
  readonly input?: Input;
}

export interface $ZodIssueInvalidElement<Input = unknown> extends $ZodIssueBase {
  readonly code: "invalid_element";
  readonly origin: "map" | "set";
  readonly key: unknown;
  readonly issues: $ZodIssue[];
  readonly input?: Input;
}

export interface $ZodIssueInvalidValue<Input = unknown> extends $ZodIssueBase {
  readonly code: "invalid_value";
  readonly values: util.Primitive[];
  readonly input?: Input;
}

export interface $ZodIssueCustom extends $ZodIssueBase {
  readonly code: "custom";
  readonly params?: Record<string, any> | undefined;
  readonly input?: unknown;
}

export type $ZodIssue =
  | $ZodIssueInvalidType
  | $ZodIssueTooBig
  | $ZodIssueTooSmall
  | $ZodIssueInvalidStringFormat
  | $ZodIssueNotMultipleOf
  | $ZodIssueUnrecognizedKeys
  | $ZodIssueInvalidUnion
  | $ZodIssueInvalidKey
  | $ZodIssueInvalidElement
  | $ZodIssueInvalidValue
  | $ZodIssueCustom;

export type RawIssue<T extends $ZodIssueBase> = T extends any
  ? util.Flatten<
      util.MakePartial<T, "message" | "path"> & {
        /** The input data */
        readonly input: unknown;
        /** The schema or check that originated this issue. */
        readonly inst?: $ZodType | $ZodCheck;
        /** If `true`, Zod will continue executing checks/refinements after this issue. */
        readonly continue?: boolean | undefined;
      } & Record<string, unknown>
    >
  : never;

export type $ZodInternalIssue<T extends $ZodIssueBase = $ZodIssue> = T extends any ? RawIssue<T> : never;

export type $ZodRawIssue<T extends $ZodIssueBase = $ZodIssue> = $ZodInternalIssue<T>;

export type _FlattenedError<T, U = string> = {
  formErrors: U[];
  fieldErrors: {
    [P in keyof T]?: U[];
  };
};

export type $ZodFlattenedError<T, U = string> = _FlattenedError<T, U>;

export type $ZodFormattedError<T, U = string> = {
  _errors: U[];
} & util.Flatten<_ZodFormattedError<T, U>>;

export type _ZodFormattedError<T, U = string> = T extends [any, ...any[]]
  ? { [K in keyof T]?: $ZodFormattedError<T[K], U> }
  : T extends any[]
    ? { [k: number]: $ZodFormattedError<T[number], U> }
    : T extends object
      ? util.Flatten<{ [K in keyof T]?: $ZodFormattedError<T[K], U> }>
      : any;

export type $ZodErrorTree<T, U = string> = T extends util.Primitive
  ? { errors: U[] }
  : T extends [any, ...any[]]
    ? { errors: U[]; items?: { [K in keyof T]?: $ZodErrorTree<T[K], U> } }
    : T extends any[]
      ? { errors: U[]; items?: Array<$ZodErrorTree<T[number], U>> }
      : T extends object
        ? {
            errors: U[];
            properties?: { [K in keyof T]?: $ZodErrorTree<T[K], U> };
          }
        : { errors: U[] };
