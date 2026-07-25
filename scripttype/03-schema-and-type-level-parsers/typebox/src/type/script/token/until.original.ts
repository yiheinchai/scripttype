/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/script/token/until.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type TTakeOne<Input extends string> = (
  Input extends `${infer Left extends string}${infer Right extends string}`
    ? [Left, Right]
    : []
)

export type TIsInputMatchSentinal<End extends string[], Input extends string> = (
  End extends [infer Left extends string, ...infer Right extends string[]] 
    ? Input extends `${Left}${string}` 
      ? true
      : TIsInputMatchSentinal<Right, Input>
    : false
)

export type TUntil<End extends string[], Input extends string, Result extends string = ''> = (
  TTakeOne<Input> extends [infer One extends string, infer Rest extends string]
    ? TIsInputMatchSentinal<End, Input> extends true
      ? [Result, Input]                      // ok: at sentinal 
      : TUntil<End, Rest, `${Result}${One}`> // fail: advance + 1
    : []
)
