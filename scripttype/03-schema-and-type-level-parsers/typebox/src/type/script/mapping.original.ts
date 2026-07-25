/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/script/mapping.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Memory<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type S<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type T<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TIntrinsicOrCall<Target extends string, Parameters extends T.TSchema[]> = (
  [Target, Parameters] extends ['Array', [infer Type extends T.TSchema]] ? T.TArray<Type> :
  [Target, Parameters] extends ['Capitalize', [infer Type extends T.TSchema]] ? S.TCapitalizeDeferred<Type> :
  [Target, Parameters] extends ['ConstructorParameters', [infer Type extends T.TSchema]] ? S.TConstructorParametersDeferred<Type> :
  [Target, Parameters] extends ['Evaluate', [infer Type extends T.TSchema]] ? S.TEvaluateDeferred<Type> :
  [Target, Parameters] extends ['Exclude', [infer Left extends T.TSchema, infer Right extends T.TSchema]] ? S.TExcludeDeferred<Left, Right> :
  [Target, Parameters] extends ['Extract', [infer Left extends T.TSchema, infer Right extends T.TSchema]] ? S.TExtractDeferred<Left, Right> :
  [Target, Parameters] extends ['Index', [infer Type extends T.TSchema, infer Indexer extends T.TSchema]] ? S.TIndexDeferred<Type, Indexer> :
  [Target, Parameters] extends ['InstanceType', [infer Type extends T.TSchema]] ? S.TInstanceTypeDeferred<Type> :
  [Target, Parameters] extends ['KeyOf', [infer Type extends T.TSchema]] ? S.TKeyOfDeferred<Type> :
  [Target, Parameters] extends ['Lowercase', [infer Type extends T.TSchema]] ? S.TLowercaseDeferred<Type> :
  [Target, Parameters] extends ['NonNullable', [infer Type extends T.TSchema]] ? S.TNonNullableDeferred<Type> :
  [Target, Parameters] extends ['Omit', [infer Type extends T.TSchema, infer Indexer extends T.TSchema]] ? S.TOmitDeferred<Type, Indexer> :
  [Target, Parameters] extends ['Parameters', [infer Type extends T.TSchema]] ? S.TParametersDeferred<Type> :
  [Target, Parameters] extends ['Partial', [infer Type extends T.TSchema]] ? S.TPartialDeferred<Type> :
  [Target, Parameters] extends ['Pick', [infer Type extends T.TSchema, infer Indexer extends T.TSchema]] ? S.TPickDeferred<Type, Indexer> :
  [Target, Parameters] extends ['Readonly', [infer Type extends T.TSchema]] ? S.TReadonlyObjectDeferred<Type> :
  [Target, Parameters] extends ['Record', [infer Key extends T.TSchema, infer Value extends T.TSchema]] ? T.TRecordDeferred<Key, Value> :
  [Target, Parameters] extends ['Required', [infer Type extends T.TSchema]] ? S.TRequiredDeferred<Type> :
  [Target, Parameters] extends ['ReturnType', [infer Type extends T.TSchema]] ? S.TReturnTypeDeferred<Type> :
  [Target, Parameters] extends ['Uncapitalize', [infer Type extends T.TSchema]] ? S.TUncapitalizeDeferred<Type> :
  [Target, Parameters] extends ['Uppercase', [infer Type extends T.TSchema]] ? S.TUppercaseDeferred<Type> :
  T.TCallConstruct<T.TRef<Target>, Parameters>
)

export type TDelimitedDecode<Input extends ([unknown, unknown] | unknown)[], Result extends unknown[] = []> = (
  Input extends [infer Left, ...infer Right]
  ? Left extends [infer Item, infer _]
  ? TDelimitedDecode<Right, [...Result, Item]>
  : TDelimitedDecode<Right, [...Result, Left]>
  : Result
)

export type TDelimited<Input extends [unknown, unknown]>
  = Input extends [infer Left extends unknown[], infer Right extends unknown[]]
  ? TDelimitedDecode<[...Left, ...Right]>
  : []

export type TGenericParameterExtendsEqualsMapping<Input extends [unknown, unknown, unknown, unknown, unknown]> = (
  Input extends [infer Name extends string, 'extends', infer Extends extends T.TSchema, '=', infer Equals extends T.TSchema]
  ? T.TParameter<Name, Extends, Equals>
  : never
)

export type TGenericParameterExtendsMapping<Input extends [unknown, unknown, unknown]> = (
  Input extends [infer Name extends string, 'extends', infer Extends extends T.TSchema]
    ? T.TParameter<Name, Extends, Extends>
    : never
)

export type TGenericParameterEqualsMapping<Input extends [unknown, unknown, unknown]> = (
  Input extends [infer Name extends string, '=', infer Equals extends T.TSchema]
  ? T.TParameter<Name, T.TUnknown, Equals>
  : never
)

export type TGenericParameterIdentifierMapping<Input extends string,
  Result extends T.TSchema = T.TParameter<Input, T.TUnknown, T.TUnknown>
> = Result

export type TGenericParameterMapping<Input extends unknown> = (
  Input
)

export type TGenericParameterListMapping<Input extends [unknown, unknown]> = (
  TDelimited<Input>
)

export type TGenericParametersMapping<Input extends [unknown, unknown, unknown]> = (
  Input extends ['<', infer Parameters extends T.TParameter[], '>']
    ? Parameters
    : never
)

export type TGenericCallArgumentListMapping<Input extends [unknown, unknown]> = (
  TDelimited<Input>
)

export type TGenericCallArgumentsMapping<Input extends [unknown, unknown, unknown]> = (
  Input extends ['<', infer Arguments extends T.TSchema[], '>']
    ? Arguments
    : never
)

export type TGenericCallMapping<Input extends [unknown, unknown],
  Result = Input extends [infer Ref extends string, infer Arguments extends T.TSchema[]]
    ? TIntrinsicOrCall<Ref, Arguments>
    : never
> = Result

export type TOptionalSemiColonMapping<Input extends [unknown] | []>
  = null

export type TKeywordStringMapping<Input extends 'string'> = (
  T.TString
)

export type TKeywordNumberMapping<Input extends 'number'> = (
  T.TNumber
)

export type TKeywordBooleanMapping<Input extends 'boolean'> = (
  T.TBoolean
)

export type TKeywordUndefinedMapping<Input extends 'undefined'> = (
  T.TUndefined
)

export type TKeywordNullMapping<Input extends 'null'> = (
  T.TNull
)

export type TKeywordIntegerMapping<Input extends 'integer'> = (
  T.TInteger
)

export type TKeywordBigIntMapping<Input extends 'bigint'> = (
  T.TBigInt
)

export type TKeywordUnknownMapping<Input extends 'unknown'> = (
  T.TUnknown
)

export type TKeywordAnyMapping<Input extends 'any'> = (
  T.TAny
)

export type TKeywordObjectMapping<Input extends 'object'> = (
  T.TObject<{}>
)

export type TKeywordNeverMapping<Input extends 'never'> = (
  T.TNever
)

export type TKeywordSymbolMapping<Input extends 'symbol'> = (
  T.TSymbol
)

export type TKeywordVoidMapping<Input extends 'void'> = (
  T.TVoid
)

export type TKeywordThisMapping<Input extends 'this'> = (
  T.TThis
)

export type TLiteralBigIntMapping<Input extends string> = (
  Input extends `${infer Value extends bigint}` ? T.TLiteral<Value> : never
)

export type TLiteralBooleanMapping<Input extends 'true' | 'false'> = (
  Input extends 'true' ? T.TLiteral<true> : T.TLiteral<false>
)

export type TLiteralNumberMapping<Input extends string> = (
  Input extends `${infer Value extends number}` ? T.TLiteral<Value> : never
)

export type TLiteralStringMapping<Input extends string> = (
  Input extends T.TLiteralValue ? T.TLiteral<Input> : never
)

export type TTemplateInterpolateMapping<Input extends [unknown, unknown, unknown]>
  = Input extends ['${', infer Type extends T.TSchema, '}'] ? Type : never

export type TTemplateSpanMapping<Input extends string,
  Result extends T.TSchema = T.TLiteral<Input>
> = Result

export type TTemplateBodyMapping<Input extends [unknown, unknown, unknown] | [unknown]> = (
  Input extends [infer Text extends T.TSchema, infer Type extends T.TSchema, infer Rest extends T.TSchema[]] ? [Text, Type, ...Rest] :
  Input extends [infer Text extends T.TSchema] ? [Text] :
  []
)

export type TTemplateLiteralTypesMapping<Input extends [unknown, unknown, unknown],
  Result extends T.TSchema = Input extends ['`', infer Types extends T.TSchema[], '`'] ? Types : []
> = Result

export type TTemplateLiteralMapping<Input extends unknown> = (
  Input extends infer Types extends T.TSchema[] ? T.TTemplateLiteralDeferred<Types> : never
)

export type TDependentMapping<Input extends [unknown, unknown, unknown, unknown, unknown, unknown] | [unknown, unknown, unknown, unknown]> = (
  Input extends ['if', infer If extends T.TSchema, 'then', infer Then extends T.TSchema, 'else', infer Else extends T.TSchema]
    ? T.TDependent<If, Then, Else> :
  Input extends ['if', infer If extends T.TSchema, 'then', infer Then extends T.TSchema]
    ? T.TDependent<If, Then, T.TUnknown> :
  never
)

export type TKeyOfMapping<Input extends [unknown] | []> = (
  Input extends [unknown] ? true : false
)

export type TIndexArrayMappingReduce<Input extends unknown[], Result extends unknown[] = []> = (
  Input extends [infer Left extends unknown, ...infer Right extends unknown[]]
    ? Left extends ['[', infer Type extends T.TSchema, ']']
      ? TIndexArrayMappingReduce<Right, [...Result, [Type]]>
      : TIndexArrayMappingReduce<Right, [...Result, []]>
    : Result
)

export type TIndexArrayMapping<Input extends ([unknown, unknown, unknown] | [unknown, unknown])[]> = (
  Input extends unknown[]
    ? TIndexArrayMappingReduce<Input>
    : []
)

export type TExtendsMapping<Input extends [unknown, unknown, unknown, unknown, unknown, unknown] | []> = (
  Input extends ['extends', infer Type extends T.TSchema, '?', infer True extends T.TSchema, ':', infer False extends T.TSchema]
    ? [Type, True, False]
    : []
)

export type TBaseMapping<Input extends [unknown, unknown, unknown] | unknown> = (
  Input extends ['(', infer Type extends T.TSchema, ')'] ? Type :
  Input extends infer Type extends T.TSchema ? Type :
  never
)

export type TWithMapping<Input extends [unknown, unknown] | []> = (
  Input extends ['with', infer WithObject extends Record<PropertyKey, unknown>]
    ? WithObject
    : []
)

export type TFactorIndexArray<Type extends T.TSchema, IndexArray extends unknown[]> = (
  IndexArray extends [infer Left extends T.TSchema[], ...infer Right extends unknown[]] ? (
    Left extends [infer Indexer extends T.TSchema] ? TFactorIndexArray<S.TIndexDeferred<Type, Indexer>, Right> :
    Left extends [] ? TFactorIndexArray<T.TArray<Type>, Right> :
    T.TNever
  ) : Type
)

export type TFactorExtends<Type extends T.TSchema, Extends extends unknown[]> = (
  Extends extends [infer Right extends T.TSchema, infer True extends T.TSchema, infer False extends T.TSchema]
  ? S.TConditionalDeferred<Type, Right, True, False>
  : Type
)

export type TFactorWith<Type extends T.TSchema, With extends unknown> = (
  With extends Record<PropertyKey, unknown>
    ? S.TWithDeferred<Type, With>
    : Type
)

export type TFactorMapping<Input extends [unknown, unknown, unknown, unknown, unknown]> = (
  Input extends [infer KeyOf extends boolean, infer Type extends T.TSchema, infer IndexArray extends unknown[], infer Extend extends unknown[], infer WithClause extends unknown]
    ? TFactorWith<KeyOf extends true
        ? TFactorExtends<S.TKeyOfDeferred<TFactorIndexArray<Type, IndexArray>>, Extend>
        : TFactorExtends<TFactorIndexArray<Type, IndexArray>, Extend>
      , WithClause>
    : never
)

export type TExprBinaryMapping<Left extends T.TSchema, Rest extends unknown[]> = (
  Rest extends [infer Operator extends unknown, infer Right extends T.TSchema, infer Next extends unknown[]] ? (
    TExprBinaryMapping<Right, Next> extends infer Schema extends T.TSchema ? (
      Operator extends '&' ? (
        Schema extends T.TIntersect<infer Types extends T.TSchema[]>
        ? T.TIntersect<[Left, ...Types]>
        : T.TIntersect<[Left, Schema]>
      ) :
      Operator extends '|' ? (
        Schema extends T.TUnion<infer Types extends T.TSchema[]>
        ? T.TUnion<[Left, ...Types]>
        : T.TUnion<[Left, Schema]>
      ) : never
    ) : never
  ) : Left
)

export type TExprTermTailMapping<Input extends [unknown, unknown, unknown] | []> = (
  Input
)

export type TExprTermMapping<Input extends [unknown, unknown]> = (
  Input extends [infer Left extends T.TSchema, infer Rest extends unknown[]]
  ? TExprBinaryMapping<Left, Rest>
  : []
)

export type TExprTailMapping<Input extends [unknown, unknown, unknown] | []> = (
  Input
)

export type TExprMapping<Input extends [unknown, unknown]> = (
  Input extends [infer Left extends T.TSchema, infer Rest extends unknown[]]
    ? TExprBinaryMapping<Left, Rest>
    : []
)

export type TExprReadonlyMapping<Input extends [unknown, unknown]> = (
  Input extends ['readonly', infer Type extends T.TSchema]
    ? S.TAddImmutableDeferred<Type>
    : never
)

export type TExprPipeMapping<Input extends [unknown, unknown]> = (
  Input extends ['|', infer Type extends T.TSchema]
    ? Type
    : never
)

export type TGenericTypeMapping<Input extends [unknown, unknown, unknown]> = (
  Input extends [infer Arguments extends T.TParameter[], '=', infer Type extends T.TSchema]
    ? T.TGeneric<Arguments, Type>
    : never
)

export type TInferTypeMapping<Input extends [unknown, unknown, unknown, unknown] | [unknown, unknown]> = (
  Input extends ['infer', infer Name extends string, 'extends', infer Type extends T.TSchema] ? T.TInfer<Name, Type> :
  Input extends ['infer', infer Name extends string] ? T.TInfer<Name, T.TUnknown> :
  never
)

export type TTypeMapping<Input extends unknown> = (
  Input
)

export type TPropertyKeyNumberMapping<Input extends string> = (
  `${Input}`
)

export type TPropertyKeyIdentMapping<Input extends string> = (
  Input
)

export type TPropertyKeyQuotedMapping<Input extends string> = (
  Input
)

export type TPropertyKeyIndexMapping<Input extends [unknown, unknown, unknown, unknown, unknown]> = (
  Input extends ['[', string, ':', T.TInteger, ']'] ? T.TIntegerKey :
  Input extends ['[', string, ':', T.TNumber, ']'] ? T.TNumberKey :
  Input extends ['[', string, ':', T.TString, ']'] ? T.TStringKey :
  Input extends ['[', string, ':', T.TSymbol, ']'] ? T.TStringKey :
  never
)

export type TPropertyKeyMapping<Input extends unknown> = (
  Input
)

export type TReadonlyMapping<Input extends [unknown] | []> = (
  Input extends [unknown] ? true : false
)

export type TOptionalMapping<Input extends [unknown] | []> = (
  Input extends [unknown] ? true : false
)

export type TPropertyMapping<Input extends [unknown, unknown, unknown, unknown, unknown]> = (
  Input extends [infer IsReadonly extends boolean, infer Key extends string, infer IsOptional extends boolean, string, infer Type extends T.TSchema] ? {
    [_ in Key]: (
      [IsReadonly, IsOptional] extends [true, true] ? S.TAddReadonlyDeferred<S.TAddOptionalDeferred<Type>> :
      [IsReadonly, IsOptional] extends [true, false] ? S.TAddReadonlyDeferred<Type> :
      [IsReadonly, IsOptional] extends [false, true] ? S.TAddOptionalDeferred<Type> :
      Type
    )
  } : never
)

export type TPropertyDelimiterMapping<Input extends [unknown, unknown] | [unknown]> = (
  Input
)

export type TPropertyListMapping<Input extends [unknown, unknown]> = (
  TDelimited<Input>
)

export type TPropertiesReduce<PropertiesList extends T.TProperties[], Result extends [properties: T.TProperties, patternProperties: T.TProperties] = [{}, {}]> = (
  PropertiesList extends [infer Left extends T.TProperties, ...infer Right extends T.TProperties[]]
  ? (
    // [1] patternProperties
    Left extends { [_ in T.TIntegerKey]: T.TSchema } ? TPropertiesReduce<Right, [Result[0], Memory.TAssign<Result[1], Left>]> :
    Left extends { [_ in T.TNumberKey]: T.TSchema }  ? TPropertiesReduce<Right, [Result[0], Memory.TAssign<Result[1], Left>]> :
    Left extends { [_ in T.TStringKey]: T.TSchema }  ? TPropertiesReduce<Right, [Result[0], Memory.TAssign<Result[1], Left>]> :
    // [0] properties
    TPropertiesReduce<Right, [Memory.TAssign<Result[0], Left>, Result[1]]>
  ) : { [Key in keyof Result]: Result[Key] }
)

export type TPropertiesMapping<Input extends [unknown, unknown, unknown],
  Result extends [T.TProperties, T.TProperties] = Input extends ['{', infer PropertyList extends T.TProperties[], '}']
  ? TPropertiesReduce<PropertyList>
  : [{}, {}]
> = Result

export type T_Object_Mapping<Input extends unknown> = (
  Input extends [infer Properties extends T.TProperties, infer _PatternProperties extends T.TProperties]
  ? T.TObject<Properties>
  : never
)

export type TElementNamedMapping<Input extends [unknown, unknown, unknown, unknown, unknown] | [unknown, unknown, unknown, unknown] | [unknown, unknown, unknown]> = (
  Input extends [string, '?', ':', 'readonly', infer Type extends T.TSchema] ? S.TAddReadonlyDeferred<S.TAddOptionalDeferred<Type>> :
  Input extends [string, /**/ ':', 'readonly', infer Type extends T.TSchema] ? S.TAddReadonlyDeferred<Type> :
  Input extends [string, '?', ':', /*      */  infer Type extends T.TSchema] ? S.TAddOptionalDeferred<Type> :
  Input extends [string, /**/ ':', /*      */  infer Type extends T.TSchema] ? Type :
  never
)

export type TElementReadonlyOptionalMapping<Input extends [unknown, unknown, unknown]> = (
  Input extends ['readonly', infer Type extends T.TSchema, '?'] ? S.TAddReadonlyDeferred<S.TAddOptionalDeferred<Type>> : never
)

export type TElementReadonlyMapping<Input extends [unknown, unknown]> = (
  Input extends ['readonly', infer Type extends T.TSchema] ? S.TAddReadonlyDeferred<Type> : never
)

export type TElementOptionalMapping<Input extends [unknown, unknown]> = (
  Input extends [infer Type extends T.TSchema, '?'] ? S.TAddOptionalDeferred<Type> : never
)

export type TElementBaseMapping<Input extends unknown> = (
  Input
)

export type TElementMapping<Input extends [unknown, unknown] | [unknown]> = (
  Input extends ['...', infer Type extends T.TSchema] ? T.TRest<Type> :
  Input extends [infer Type extends T.TSchema] ? Type :
  never
)

export type TElementListMapping<Input extends [unknown, unknown]> = (
  TDelimited<Input>
)

export type T_Tuple_Mapping<Input extends [unknown, unknown, unknown]> = (
  Input extends ['[', infer Types extends T.TSchema[], ']'] ? T.TTuple<Types> : never
)

export type TParameterReadonlyOptionalMapping<Input extends [unknown, unknown, unknown, unknown, unknown]> = (
  Input extends [string, '?', ':', 'readonly', infer Type extends T.TSchema] ? S.TAddReadonlyDeferred<S.TAddOptionalDeferred<Type>> : never
)

export type TParameterReadonlyMapping<Input extends [unknown, unknown, unknown, unknown]> = (
  Input extends [string, ':', 'readonly', infer Type extends T.TSchema] ? S.TAddReadonlyDeferred<Type> : never
)

export type TParameterOptionalMapping<Input extends [unknown, unknown, unknown, unknown]> = (
  Input extends [string, '?', ':', infer Type extends T.TSchema] ? S.TAddOptionalDeferred<Type> : never
)

export type TParameterTypeMapping<Input extends [unknown, unknown, unknown]> = (
  Input extends [string, ':', infer Type extends T.TSchema] ? Type : never
)

export type TParameterBaseMapping<Input extends unknown> = (
  Input
)

export type TParameterMapping<Input extends [unknown, unknown] | [unknown]> = (
  Input extends ['...', infer Type extends T.TSchema] ? T.TRest<Type> :
  Input extends [infer Type extends T.TSchema] ? Type :
  never
)

export type TParameterListMapping<Input extends [unknown, unknown]> = (
  TDelimited<Input>
)

export type T_Function_Mapping<Input extends [unknown, unknown, unknown, unknown, unknown]> = (
  Input extends ['(', infer ParameterList extends T.TSchema[], ')', '=>', infer ReturnType extends T.TSchema]
    ? T.TFunction<ParameterList, ReturnType>
    : never
)

export type T_Constructor_Mapping<Input extends [unknown, unknown, unknown, unknown, unknown, unknown]> = (
  Input extends ['new', '(', infer ParameterList extends T.TSchema[], ')', '=>', infer InstanceType extends T.TSchema]
    ? T.TConstructor<ParameterList, InstanceType>
    : never
)

export type TModifierOperation = 'add' | 'remove' | 'none'

export type TApplyReadonly<Readonly extends TModifierOperation, Type extends T.TSchema> = (
  Readonly extends 'remove' ? S.TRemoveReadonlyDeferred<Type> :
  Readonly extends 'add' ? S.TAddReadonlyDeferred<Type> :
  Type
)

export type TMappedReadonlyMapping<Input extends [unknown, unknown] | [unknown] | []> = (
  Input extends ['-', 'readonly'] ? 'remove' :
  Input extends ['+', 'readonly'] ? 'add' :
  Input extends ['readonly'] ? 'add' :
  'none'
)

export type TApplyOptional<Optional extends TModifierOperation, Type extends T.TSchema> = (
  Optional extends 'remove' ? S.TRemoveOptionalDeferred<Type> :
  Optional extends 'add' ? S.TAddOptionalDeferred<Type> :
  Type
)

export type TMappedOptionalMapping<Input extends [unknown, unknown] | [unknown] | []> = (
  Input extends ['-', '?'] ? 'remove' :
  Input extends ['+', '?'] ? 'add' :
  Input extends ['?'] ? 'add' :
  'none'
)

export type TMappedAsMapping<Input extends [unknown, unknown] | []> = (
  Input extends ['as', infer Type extends T.TSchema] ? [Type] : []
)

export type T_Mapped_Mapping<Input extends [unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown]> = (
  Input extends ['{', infer Readonly extends TModifierOperation, '[', infer Key extends string, 'in', infer Type extends T.TSchema, infer As extends T.TSchema[], ']', infer Optional extends TModifierOperation, ':', infer Property extends T.TSchema, null, '}']
    ? (As extends [infer As extends T.TSchema]
      ? S.TMappedDeferred<T.TIdentifier<Key>, Type, As, TApplyReadonly<Readonly, TApplyOptional<Optional, Property>>>
      : S.TMappedDeferred<T.TIdentifier<Key>, Type, T.TRef<Key>, TApplyReadonly<Readonly, TApplyOptional<Optional, Property>>>
    ) : never
)

export type TReferenceMapping<Input extends string,
  Result extends T.TSchema = T.TRef<Input>
> = Result

export type TWithBigIntMapping<Input extends string> = (
  Input extends `${infer Value extends bigint}` ? Value : never
)

export type TWithNumberMapping<Input extends string> = (
  Input extends `${infer Value extends number}` ? Value : never
)

export type TWithBooleanMapping<Input extends 'true' | 'false'> = (
  Input extends 'true' ? true : false
)

export type TWithStringMapping<Input extends string> = (
  Input
)

export type TWithNullMapping<Input extends 'null'> = (
  null
)

export type TWithUndefinedMapping<Input extends 'undefined'>
  = undefined

export type TWithPropertyMapping<Input extends [unknown, unknown, unknown]> = (
  Input extends [infer Key extends string, ':', infer Value extends unknown]
    ? { [_ in Key]: Value }
    : never
)

export type TWithPropertyListMapping<Input extends [unknown, unknown]> = (
  TDelimited<Input>
)

export type TWithObjectMappingReduce<PropertyList extends Record<PropertyKey, unknown>[], Result extends Record<PropertyKey, unknown> = {}> = (
  PropertyList extends [infer Left extends Record<PropertyKey, unknown>, ...infer Right extends Record<PropertyKey, unknown>[]]
    ? TWithObjectMappingReduce<Right, Memory.TAssign<Result, Left>>
    : { [Key in keyof Result]: Result[Key] }
)

export type TWithObjectMapping<Input extends [unknown, unknown, unknown]> = (
  Input extends ['{', infer PropertyList extends Record<PropertyKey, unknown>[], '}']
    ? TWithObjectMappingReduce<PropertyList>
    : {}
)

export type TWithElementListMapping<Input extends [unknown, unknown]> = (
  TDelimited<Input>
)

export type TWithArrayMapping<Input extends [unknown, unknown, unknown]> = (
  Input extends ['[', infer Elements extends unknown[], ']']
    ? Elements
    : never
)

export type TWithValueMapping<Input extends unknown> = (
  Input
)

export type TPatternBigIntMapping<Input extends '-?(?:0|[1-9][0-9]*)n'> = (
  T.TBigInt
)

export type TPatternStringMapping<Input extends '.*'> = (
  T.TString
)

export type TPatternNumberMapping<Input extends '-?(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?'> = (
  T.TNumber
)

export type TPatternIntegerMapping<Input extends '-?(?:0|[1-9][0-9]*)'> = (
  T.TInteger
)

export type TPatternNeverMapping<Input extends '(?!)'> = (
  T.TNever
)

export type TPatternTextMapping<Input extends string,
  Result extends T.TSchema = T.TLiteral<Input>
> = Result

export type TPatternBaseMapping<Input extends unknown> = (
  Input
)

export type TPatternGroupMapping<Input extends [unknown, unknown, unknown]> = (
  Input extends ['(', infer Body extends T.TSchema[], ')'] ? T.TUnion<Body> : never
)

export type TPatternUnionMapping<Input extends [unknown, unknown, unknown] | [unknown] | []> = (
  Input extends [infer Term extends T.TSchema[], '|', infer Union extends T.TSchema[]] ? [...Term, ...Union] :
  Input extends [infer Term extends T.TSchema[]] ? [...Term] :
  []
)

export type TPatternTermMapping<Input extends [unknown, unknown]> = (
  Input extends [infer Left extends T.TSchema, infer Right extends T.TSchema[]]
  ? [Left, ...Right]
  : never
)

export type TPatternBodyMapping<Input extends unknown> = (
  Input
)

export type TPatternMapping<Input extends [unknown, unknown, unknown]> = (
  Input extends ['^', infer Body extends T.TSchema[], '$'] ? Body : never
)

export type TInterfaceDeclarationHeritageListMapping<Input extends [unknown, unknown]> = (
  TDelimited<Input>
)

export type TInterfaceDeclarationHeritageMapping<Input extends [unknown, unknown] | []> = (
  Input extends ['extends', infer Heritage extends T.TSchema[]]
    ? Heritage
    : []
)

export type TInterfaceDeclarationGenericMapping<Input extends [unknown, unknown, unknown, unknown, unknown]> = (
  Input extends ['interface', infer Name extends string, infer Parameters extends T.TParameter[], infer Heritage extends T.TSchema[], infer Properties extends [T.TProperties, T.TProperties]]
    ? { [_ in Name]: T.TGeneric<Parameters, S.TInterfaceDeferred<Heritage, Properties[0]>> }
    : never
)

export type TInterfaceDeclarationMapping<Input extends [unknown, unknown, unknown, unknown]> = (
  Input extends ['interface', infer Name extends string, infer Heritage extends T.TSchema[], infer Properties extends [T.TProperties, T.TProperties]]
  ? { [_ in Name]: S.TInterfaceDeferred<Heritage, Properties[0]> }
  : never
)

export type TTypeAliasDeclarationGenericMapping<Input extends [unknown, unknown, unknown, unknown, unknown]> = (
  Input extends ['type', infer Name extends string, infer Parameters extends T.TParameter[], '=', infer Type extends T.TSchema]
    ? { [_ in Name]: T.TGeneric<Parameters, Type> }
    : never
)

export type TTypeAliasDeclarationMapping<Input extends [unknown, unknown, unknown, unknown]> = (
  Input extends ['type', infer Name extends string, '=', infer Type extends T.TSchema]
    ? { [_ in Name]: Type }
    : never
)

export type TExportKeywordMapping<Input extends [unknown] | []> = (
  null // ignored-dont-care
)

export type TModuleDeclarationDelimiterMapping<Input extends [unknown, unknown] | [unknown]> = (
  Input
)

export type TModuleDeclarationListMapping<Input extends [unknown, unknown]> = (
  TPropertiesReduce<TDelimited<Input>>
)

export type TModuleDeclarationMapping<Input extends [unknown, unknown, unknown]> = (
  Input extends [null, infer ModuleDeclaration extends T.TProperties, null]
    ? ModuleDeclaration
    : never
)

export type TModuleMapping<Input extends [unknown, unknown]> = (
  Input extends [infer ModuleDeclaration extends T.TProperties, infer ModuleDeclarationList extends [T.TProperties, T.TProperties]]
    ? S.TModuleDeferred<Memory.TAssign<ModuleDeclaration, ModuleDeclarationList[0]>>
    : never
)

export type TScriptMapping<Input extends unknown> = (
  Input
)
