/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/mapped/mapped_operation.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Memory<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEvaluateIntersect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEvaluateTemplateLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TIdentifier<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInstantiateType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TMappedVariants<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTemplateLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TCanonicalAs<InstantiatedAs extends TSchema,
  Result extends TSchema = InstantiatedAs extends TTemplateLiteral<infer Pattern extends string> 
    ? TEvaluateTemplateLiteral<Pattern> 
    : InstantiatedAs
> = Result

export type TMappedVariant<Context extends TProperties, State extends TState, Identifier extends TIdentifier, Variant extends TSchema, As extends TSchema, Property extends TSchema,
  VariantContext extends TProperties = Memory.TAssign<Context, { [_ in Identifier['name']]: Variant }>,
  InstantiatedAs extends TSchema = TInstantiateType<VariantContext, State, As>,
  CanonicalAs extends TSchema = TCanonicalAs<InstantiatedAs>,
  InstantiatedProperty extends TSchema = TInstantiateType<VariantContext, State, Property>,
  Result extends TProperties = CanonicalAs extends TLiteral<string | number>
    ? { [_ in CanonicalAs['const']]: InstantiatedProperty }
    : {}
> = Result

export type TMappedProperties<Context extends TProperties, State extends TState, Identifier extends TIdentifier, Variants extends TSchema[], As extends TSchema, Property extends TSchema, Result extends TProperties[] = []> = (
  Variants extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
    ? TMappedProperties<Context, State, Identifier, Right, As, Property, [...Result, TMappedVariant<Context, State, Identifier, Left, As, Property>]>
    : Result
)

export type TReduceProperties<Properties extends TProperties[], Result extends TSchema[] = []> = (
  Properties extends [infer Left extends TProperties, ...infer Right extends TProperties[]]
    ? TReduceProperties<Right, [...Result, TObject<Left>]>
    : Result
)

export type TMappedOperation<Context extends TProperties, State extends TState, Identifier extends TIdentifier, Type extends TSchema, As extends TSchema, Property extends TSchema,
  Variants extends TSchema[] = TMappedVariants<Type>,
  MappedProperties extends TProperties[] = TMappedProperties<Context, State, Identifier, Variants, As, Property>,
  MappedObjects extends TSchema[] = TReduceProperties<MappedProperties>,
  Result extends TSchema = TEvaluateIntersect<MappedObjects>
> = Result
