/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/script/token/internal/trim.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Char<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type CloseComment = typeof CloseComment

export type TDiscardMultiLineComment<Input extends string> = (
  Input extends `${string}${CloseComment}${infer Rest extends string}` ? Rest :
  ''
)

export type OpenComment = typeof OpenComment

export type LineComment = typeof LineComment

export type W0 = ` `

export type W1 = `${W0}${W0}`

export type W2 = `${W1}${W1}`

export type W3 = `${W2}${W2}`

export type W4 = `${W3}${W3}`

export type TTrimWhitespace<Input extends string> = (
  Input extends `${OpenComment}${infer Rest extends string}` ? TTrimWhitespace<TDiscardMultiLineComment<Rest>> :
  Input extends `${LineComment}${infer Rest extends string}` ? TTrimWhitespace<TDiscardLineComment<Rest>> :
  Input extends `${W4}${infer Rest extends string}` ? TTrimWhitespace<Rest> :
  Input extends `${W3}${infer Rest extends string}` ? TTrimWhitespace<Rest> :
  Input extends `${W1}${infer Rest extends string}` ? TTrimWhitespace<Rest> :
  Input extends `${W0}${infer Rest extends string}` ? TTrimWhitespace<Rest> :
  Input
)

export type TDiscardLineComment<Input extends string> = (
  Input extends `${string}${Char.TNewLine}${infer Rest extends string}` 
    ? TTrimWhitespace<`${Char.TNewLine}${Rest}`> 
    : ''
)

export type TTrim<Input extends string> = (
  Input extends `${OpenComment}${infer Rest extends string}` ? TTrim<TDiscardMultiLineComment<Rest>> :
  Input extends `${LineComment}${infer Rest extends string}` ? TTrim<TDiscardLineComment<Rest>> :
  Input extends `${Char.TNewLine}${infer Rest extends string}` ? TTrim<Rest> :
  Input extends `${Char.TTabSpace}${infer Rest extends string}` ? TTrim<Rest> :
  Input extends `${W4}${infer Rest extends string}` ? TTrim<Rest> :
  Input extends `${W3}${infer Rest extends string}` ? TTrim<Rest> :
  Input extends `${W1}${infer Rest extends string}` ? TTrim<Rest> :
  Input extends `${W0}${infer Rest extends string}` ? TTrim<Rest> :
  Input
)
