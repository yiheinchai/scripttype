/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/mapped/mapped_operation.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Memory<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TEvaluateIntersect<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TEvaluateTemplateLiteral<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TIdentifier<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TInstantiateType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TLiteral<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TMappedVariants<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TObject<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TProperties<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TState<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TTemplateLiteral<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
