/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/record/from_key_template_literal.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TEvaluateTemplateLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TIsTemplateLiteralFinite<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TParsePatternIntoTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TFromTemplateKey<Pattern extends string, Value extends TSchema,
  Types extends TSchema[] = TParsePatternIntoTypes<Pattern>,
  Finite extends boolean = TIsTemplateLiteralFinite<Types>,
  Result extends TSchema = Finite extends true ? TFromKey<TEvaluateTemplateLiteral<Pattern>, Value> : TRecord<Pattern, Value>
> = Result
