/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/server/src/unstable-core-do-not-import/parser.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type StandardSchemaV1<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ParserZodEsque<TInput, TParsedInput> = {
  _input: TInput;
  _output: TParsedInput;
};

export type ParserValibotEsque<TInput, TParsedInput> = {
  schema: {
    _types?: {
      input: TInput;
      output: TParsedInput;
    };
  };
};

export type ParserArkTypeEsque<TInput, TParsedInput> = {
  inferIn: TInput;
  infer: TParsedInput;
};

export type ParserStandardSchemaEsque<TInput, TParsedInput> = StandardSchemaV1<
  TInput,
  TParsedInput
>;

export type ParserMyZodEsque<TInput> = {
  parse: (input: any) => TInput;
};

export type ParserSuperstructEsque<TInput> = {
  create: (input: unknown) => TInput;
};

export type ParserCustomValidatorEsque<TInput> = (
  input: unknown,
) => Promise<TInput> | TInput;

export type ParserYupEsque<TInput> = {
  validateSync: (input: unknown) => TInput;
};

export type ParserScaleEsque<TInput> = {
  assert(value: unknown): asserts value is TInput;
};

export type ParserWithoutInput<TInput> =
  | ParserCustomValidatorEsque<TInput>
  | ParserMyZodEsque<TInput>
  | ParserScaleEsque<TInput>
  | ParserSuperstructEsque<TInput>
  | ParserYupEsque<TInput>;

export type ParserWithInputOutput<TInput, TParsedInput> =
  | ParserZodEsque<TInput, TParsedInput>
  | ParserValibotEsque<TInput, TParsedInput>
  | ParserArkTypeEsque<TInput, TParsedInput>
  | ParserStandardSchemaEsque<TInput, TParsedInput>;

export type Parser = ParserWithInputOutput<any, any> | ParserWithoutInput<any>;

export type inferParser<TParser extends Parser> =
  TParser extends ParserStandardSchemaEsque<infer $TIn, infer $TOut>
    ? {
        in: $TIn;
        out: $TOut;
      }
    : TParser extends ParserWithInputOutput<infer $TIn, infer $TOut>
      ? {
          in: $TIn;
          out: $TOut;
        }
      : TParser extends ParserWithoutInput<infer $InOut>
        ? {
            in: $InOut;
            out: $InOut;
          }
        : never;

export type ParseFn<TType> = (value: unknown) => Promise<TType> | TType;
