/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/script/token/const.ts, for comparison with the ScriptType alongside.
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
type TTrimWhitespace<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TWhiteSpace<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TTakeConst<Const extends string, Input extends string> = (
  TTake<[Const], Input>
)

export type TConst<Const extends string, Input extends string> = (
  Const extends '' ? ['', Input] :
  Const extends `${infer First extends string}${string}` ? (
    First extends TNewLine ? TTakeConst<Const, TTrimWhitespace<Input>> :
    First extends TWhiteSpace ? TTakeConst<Const, Input> :
    TTakeConst<Const, TTrim<Input>>
  ) : never
)
