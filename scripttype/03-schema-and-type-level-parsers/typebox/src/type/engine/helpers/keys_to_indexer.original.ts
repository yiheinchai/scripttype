/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/helpers/keys_to_indexer.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteralValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TKeysToLiterals<Keys extends PropertyKey[], Result extends TLiteral[] = []> = (
  Keys extends [infer Left extends PropertyKey, ...infer Right extends PropertyKey[]]
    ? (
      Left extends TLiteralValue
        ? TKeysToLiterals<Right, [...Result, TLiteral<Left>]>
        : TKeysToLiterals<Right, Result>
    ) : Result
)

export type TKeysToIndexer<Keys extends PropertyKey[],
  Literals extends TLiteral[] = TKeysToLiterals<Keys>,
  Result extends TSchema = TUnion<Literals>
> = Result
