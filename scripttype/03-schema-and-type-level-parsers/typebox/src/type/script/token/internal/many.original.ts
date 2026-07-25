/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/script/token/internal/many.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TTake<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TIsDiscard<Discard extends string[], Input extends string> = (
  Discard extends [infer Left extends string, ...infer Right extends string[]]
    ? Input extends Left
      ? true
      : TIsDiscard<Right, Input>
    : false
)

export type TMany<Allowed extends string[], Discard extends string[], Input extends string, Result extends string = ''> = (
  TTake<Allowed, Input> extends [infer Char extends string, infer Rest extends string]
    ? TIsDiscard<Discard, Char> extends true
      ? TMany<Allowed, Discard, Rest, Result>
      : TMany<Allowed, Discard, Rest, `${Result}${Char}`>
    : [Result, Input]
)
