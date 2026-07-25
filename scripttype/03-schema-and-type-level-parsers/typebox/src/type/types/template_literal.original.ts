/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/types/template_literal.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TDeferred<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TParseTemplateIntoTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTemplateLiteralAction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTemplateLiteralStatic<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type StaticTemplateLiteral<Pattern extends string> = (
  TTemplateLiteralStatic<Pattern>
)

export type TTemplateLiteralDeferred<Types extends TSchema[] = TSchema[]> = (
  TDeferred<'TemplateLiteral', [Types]>
)

export type TTemplateLiteralFromTypes<Types extends TSchema[],
  Result extends TSchema = TTemplateLiteralAction<Types>
> = Result

export type TTemplateLiteralFromString<Template extends string,
  Types extends TSchema[] = TParseTemplateIntoTypes<Template>,
  Result extends TSchema = TTemplateLiteralFromTypes<Types>
> = Result
