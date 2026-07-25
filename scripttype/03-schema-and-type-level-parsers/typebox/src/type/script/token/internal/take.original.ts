/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/script/token/internal/take.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type TTakeVariant<Variant extends string, Input extends string> = (
  Input extends `${Variant}${infer Rest extends string}` 
    ? [Variant, Rest]
    : []
)

export type TTake<Variants extends string[], Input extends string> = (
  Variants extends [infer ValueLeft extends string, ...infer ValueRight extends string[]]
  ? TTakeVariant<ValueLeft, Input> extends [infer Take extends string, infer Rest extends string] 
    ? [Take, Rest]
    : TTake<ValueRight, Input>
  : []
)
