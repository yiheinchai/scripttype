/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/extends/extends_right.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Memory<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TDependent<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEnum<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEnumValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEvaluateEnum<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEvaluateTemplateLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TExtendsLeft<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInfer<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TIntersect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTemplateLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnknown<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TExtendsRightInfer<Inferred extends TProperties, Name extends string, Left extends TSchema, Right extends TSchema,
  Result extends Result.TResult = (
    TExtendsLeft<Inferred, Left, Right> extends Result.TExtendsTrueLike<infer CheckInferred extends TProperties>
      ? Result.TExtendsTrue<Memory.TAssign<Memory.TAssign<Inferred, CheckInferred>, { [_ in Name]: Left }>>
      : Result.TExtendsFalse
  )
> = Result

export type TExtendsRightAny<Inferred extends TProperties, _Left extends TSchema,
  Result extends Result.TResult = Result.TExtendsTrue<Inferred>
> = Result

export type TExtendsRightDependent<Inferred extends TProperties, Left extends TSchema, If extends TSchema, Then extends TSchema, Else extends TSchema,
  Result extends Result.TResult = TExtendsLeft<Inferred, Left, If> extends Result.TExtendsTrueLike<infer Inferred extends TProperties>
    ? (TExtendsLeft<Inferred, Left, Then> extends Result.TExtendsTrueLike<infer Inferred extends TProperties> // excessive-stack-depth-prevention
      ? Result.TExtendsTrue<Inferred>
      : Result.TExtendsFalse) // excessive-stack-depth-prevention
    : (TExtendsLeft<Inferred, Left, Else> extends Result.TExtendsTrueLike<infer Inferred extends TProperties> // excessive-stack-depth-prevention
      ? Result.TExtendsTrue<Inferred>
      : Result.TExtendsFalse) // excessive-stack-depth-prevention
> = Result

export type TExtendsRightEnum<Inferred extends TProperties, Left extends TSchema, Right extends TEnumValue[],
  Evaluated extends TSchema = TEvaluateEnum<Right>
> = TExtendsLeft<Inferred, Left, Evaluated>

export type TExtendsRightIntersect<Inferred extends TProperties, Left extends TSchema, Right extends TSchema[]> = (
  Right extends [infer Head extends TSchema, ...infer Tail extends TSchema[]]
  ? TExtendsLeft<Inferred, Left, Head> extends Result.TExtendsTrueLike<infer Inferred extends TProperties> 
    ? TExtendsRightIntersect<Inferred, Left, Tail>
    : Result.TExtendsFalse
  : Result.TExtendsTrue<Inferred>
)

export type TExtendsRightTemplateLiteral<Inferred extends TProperties, Left extends TSchema, Right extends string,
  Evaluated extends TSchema = TEvaluateTemplateLiteral<Right>
> = TExtendsLeft<Inferred, Left, Evaluated>

export type TExtendsRightUnion<Inferred extends TProperties, Left extends TSchema, Right extends TSchema[]> = (
  Right extends [infer Head extends TSchema, ...infer Tail extends TSchema[]]
    ? TExtendsLeft<Inferred, Left, Head> extends Result.TExtendsTrueLike<infer Inferred extends TProperties> 
      ? Result.TExtendsTrue<Inferred>
      : TExtendsRightUnion<Inferred, Left, Tail>
    : Result.TExtendsFalse
)

export type TExtendsRight<Inferred extends TProperties, Left extends TSchema, Right extends TSchema> = (
  Right extends TAny ? TExtendsRightAny<Inferred, Left> :
  Right extends TDependent<infer If extends TSchema, infer Then extends TSchema, infer Else extends TSchema> ? TExtendsRightDependent<Inferred, Left, If, Then, Else> :
  Right extends TEnum<infer Values extends TEnumValue[]> ? TExtendsRightEnum<Inferred, Left, Values> :
  Right extends TInfer<infer Name extends string, infer Type extends TSchema> ? TExtendsRightInfer<Inferred, Name, Left, Type> :
  Right extends TTemplateLiteral<infer Pattern extends string> ? TExtendsRightTemplateLiteral<Inferred, Left, Pattern> :
  Right extends TIntersect<infer Types extends TSchema[]> ? TExtendsRightIntersect<Inferred, Left, Types> :
  Right extends TUnion<infer Types extends TSchema[]> ? TExtendsRightUnion<Inferred, Left, Types> :
  Right extends TUnknown ? Result.TExtendsTrue<Inferred> :
  Result.TExtendsFalse
)
