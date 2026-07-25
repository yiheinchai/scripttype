/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/script/token/span.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TNewLine<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTake<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTrim<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUntil<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TMultiLine<Start extends string, End extends string, Input extends string> = (
  TTake<[Start], Input> extends [infer _, infer Rest extends string]
    ? TUntil<[End], Rest> extends [infer Until extends string, infer UntilRest extends string]
      ? TTake<[End], UntilRest> extends [infer _ extends string, infer Rest extends string]
        ? [`${Until}`, Rest]
        : [] // fail: did not match End
      : [] // fail: did not match Until
    : [] // fail: did not match Start
)

export type TSingleLine<Start extends string, End extends string, Input extends string> = (
  TTake<[Start], Input> extends [infer _ extends string, infer Rest extends string]
    ? TUntil<[TNewLine, End], Rest> extends [infer Until extends string, infer UntilRest extends string]
      ? TTake<[End], UntilRest> extends [infer _ extends string, infer EndRest extends string]
        ? [`${Until}`, EndRest]
        : [] // fail: did not match End
      : [] // fail: did not match Until
    : [] // fail: not match Start
)

export type TSpan<Start extends string, End extends string, MultiLine extends boolean, Input extends string> = (
  MultiLine extends true
    ? TMultiLine<Start, End, TTrim<Input>>
    : TSingleLine<Start, End, TTrim<Input>>
)
