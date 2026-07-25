/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/evaluate/composite.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TAddOptional<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TAddReadonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEvaluateIntersect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TOptional<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TReadonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRemoveOptional<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRemoveReadonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTupleElementsToProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnreachable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TIsReadonlyProperty<Left extends TSchema, Right extends TSchema> = (
  Left extends TReadonly<Left> ? Right extends TReadonly<Right> ? true : false : false
)

export type TIsOptionalProperty<Left extends TSchema, Right extends TSchema> = (
  Left extends TOptional<Left> ? Right extends TOptional<Right> ? true : false : false
)

export type TCompositeProperty<Left extends TSchema, Right extends TSchema,
  IsReadonly extends boolean = TIsReadonlyProperty<Left, Right>,
  IsOptional extends boolean = TIsOptionalProperty<Left, Right>,
  Evaluated extends TSchema = TEvaluateIntersect<[Left, Right]>,
  // Modifiers need to be discarded and re-applied
  Property extends TSchema = TRemoveReadonly<TRemoveOptional<Evaluated>>
> = (
  [IsReadonly, IsOptional] extends [true, true] ? TAddReadonly<TAddOptional<Property>> :
  [IsReadonly, IsOptional] extends [true, false] ? TAddReadonly<Property> :
  [IsReadonly, IsOptional] extends [false, true] ? TAddOptional<Property> :
  Property
)

export type TCompositePropertyKey<Left extends TProperties, Right extends TProperties, Key extends PropertyKey,
  Result extends TSchema = (
    Key extends keyof Left 
      ? Key extends keyof Right
        ? TCompositeProperty<Left[Key], Right[Key]>
        : Left[Key]
      : Key extends keyof Right
        ? Right[Key]
        : TNever
  )
> = Result

export type TCompositeProperties<Left extends TProperties, Right extends TProperties,
  Result extends TProperties = {
    [Key in keyof (Right & Left)]: TCompositePropertyKey<Left, Right, Key>
  }
> = Result

export type TGetProperties<Type extends TSchema,
  Result extends TProperties = (
    Type extends TObject<infer Properties extends TProperties> ? Properties :
    Type extends TTuple<infer Types extends TSchema[]> ? TTupleElementsToProperties<Types> :
    TUnreachable // {} 
  )
> = Result

export type TComposite<Left extends TSchema, Right extends TSchema,
  LeftProperties extends TProperties = TGetProperties<Left>,
  RightProperties extends TProperties = TGetProperties<Right>,
  Properties extends TProperties = TCompositeProperties<LeftProperties, RightProperties>,
  Result extends TSchema = TObject<Properties>
> = Result
