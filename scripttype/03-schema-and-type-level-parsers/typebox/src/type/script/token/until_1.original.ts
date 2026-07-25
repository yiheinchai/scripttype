/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/script/token/until_1.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TUntil<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TUntil_1<End extends string[], Input extends string> = (
  TUntil<End, Input> extends [infer Until extends string, infer UntilRest extends string] 
    ? Until extends '' 
      ? [] // fail: match has no characters
      : [Until, UntilRest]
    : [] // fail: did not match Until
)
