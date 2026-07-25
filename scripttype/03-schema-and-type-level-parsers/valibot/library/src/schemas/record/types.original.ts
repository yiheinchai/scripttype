/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/schemas/record/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Brand<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MarkOptional<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Prettify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Readonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyAction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type IsLiteral<TKey extends string | number | symbol> = string extends TKey
  ? false
  : number extends TKey
    ? false
    : symbol extends TKey
      ? false
      : TKey extends Brand<string | number | symbol>
        ? false
        : true;

export type OptionalKeys<TObject extends Record<string | number | symbol, unknown>> = {
  [TKey in keyof TObject]: IsLiteral<TKey> extends true ? TKey : never;
}[keyof TObject];

export type WithQuestionMarks<
  TObject extends Record<string | number | symbol, unknown>,
> = MarkOptional<TObject, OptionalKeys<TObject>>;

export type WithReadonly<
  TValue extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
  TObject extends WithQuestionMarks<Record<string | number | symbol, unknown>>,
> =
  // NOTE: We use a structural `{ readonly pipe: readonly unknown[] }` check
  // plus indexed access instead of `SchemaWithPipe<infer TPipe>` because
  // `infer` forces TS to decompose the full `Omit + &` intersection of
  // `SchemaWithPipe`, which is expensive on large schemas (see issue #1374).
  TValue extends {
    readonly pipe: readonly unknown[];
  }
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ReadonlyAction<any> extends TValue['pipe'][number]
      ? Readonly<TObject>
      : TObject
    : TObject;

export type InferRecordInput<
  TKey extends
    | BaseSchema<string, string | number | symbol, BaseIssue<unknown>>
    | BaseSchemaAsync<string, string | number | symbol, BaseIssue<unknown>>,
  TValue extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
> = Prettify<WithQuestionMarks<Record<InferInput<TKey>, InferInput<TValue>>>>;

export type InferRecordOutput<
  TKey extends
    | BaseSchema<string, string | number | symbol, BaseIssue<unknown>>
    | BaseSchemaAsync<string, string | number | symbol, BaseIssue<unknown>>,
  TValue extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
> = Prettify<
  WithReadonly<
    TValue,
    WithQuestionMarks<Record<InferOutput<TKey>, InferOutput<TValue>>>
  >
>;
