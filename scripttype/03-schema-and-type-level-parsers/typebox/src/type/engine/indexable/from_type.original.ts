/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/indexable/from_type.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TCyclic<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TDependent<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEnum<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEnumValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromCyclic<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromDependent<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromEnum<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromIntersect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromTemplateLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TIntersect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteralValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTemplateLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TFromType<Indexer extends TSchema,
  Result extends string[] = (
    Indexer extends TCyclic<infer Defs extends TProperties, infer Ref extends string> ? TFromCyclic<Defs, Ref> :
    Indexer extends TDependent<infer If extends TSchema, infer Then extends TSchema, infer Else extends TSchema> ? TFromDependent<If, Then, Else> :
    Indexer extends TEnum<infer Values extends TEnumValue[]> ? TFromEnum<Values> :
    Indexer extends TIntersect<infer Types extends TSchema[]> ? TFromIntersect<Types> :
    Indexer extends TLiteral<infer Value extends TLiteralValue> ? TFromLiteral<Value> :
    Indexer extends TTemplateLiteral<infer Pattern extends string> ? TFromTemplateLiteral<Pattern> :
    Indexer extends TUnion<infer Types extends TSchema[]> ? TFromUnion<Types> :
    []
  )
> = Result
