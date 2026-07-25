/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/call/distribute_arguments.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TDeferred<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TParameter<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TRef<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TUnion<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type TCollectDistributionNames<Expression extends TSchema, Result extends string[] = []> = (
  // Conditional
  Expression extends TDeferred<'Conditional', [infer Left extends TSchema, infer _Right extends TSchema, infer True extends TSchema, infer False extends TSchema]>
    ? Left extends TRef
      ? TCollectDistributionNames<True, TCollectDistributionNames<False, [...Result, Left['$ref']]>>
      : TCollectDistributionNames<True, TCollectDistributionNames<False, Result>>
  // Mapped
  : Expression extends TDeferred<'Mapped', [infer _Identifier extends TSchema, infer Type extends TSchema, infer _As extends TSchema, infer _Property extends TSchema]>
    ? (
      Type extends TDeferred<'KeyOf', [infer Ref extends TRef]> ? [...Result, Ref['$ref']] :
      Result
    ) : Result
)

export type TBuildDistributionArray<Parameters extends TParameter[], Names extends string[], Result extends boolean[] = []> = (
  Parameters extends [infer Left extends TParameter, ...infer Right extends TParameter[]]
  ? Left['name'] extends Names[number]
  ? TBuildDistributionArray<Right, Names, [...Result, true]>
  : TBuildDistributionArray<Right, Names, [...Result, false]>
  : Result
)

export type TZipDistributionArray<Arguments extends TSchema[], DistributionArray extends boolean[], Result extends [boolean, TSchema][] = []> = (
  Arguments extends [infer ArgumentLeft extends TSchema, ...infer ArgumentRight extends TSchema[]]
    ? DistributionArray extends [infer BooleanLeft extends boolean, ...infer BooleanRight extends boolean[]]
      ? TZipDistributionArray<ArgumentRight, BooleanRight, [...Result, [BooleanLeft, ArgumentLeft]]>
      : Result
    : Result
)

export type TExpand<Type extends TSchema> = (
  Type extends TUnion<infer Types extends TSchema[]>
  ? [...Types]
  : [Type]
)

export type TAppend<Current extends TSchema[][], Type extends TSchema, Result extends TSchema[][] = []> = (
  Current extends [infer Left extends TSchema[], ...infer Right extends TSchema[][]]
  ? TAppend<Right, Type, [...Result, [...Left, Type]]>
  : Result
)

export type TCross<Current extends TSchema[][], Variants extends TSchema[], Result extends TSchema[][] = []> = (
  Variants extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
  ? TCross<Current, Right, [...Result, ...TAppend<Current, Left>]>
  : Result
)

export type TDistribute<ZippedArguments extends [boolean, TSchema][], Result extends TSchema[][] = [[]]> = (
  ZippedArguments extends [infer Left extends [boolean, TSchema], ...infer Right extends [boolean, TSchema][]]
  ? Left[0] extends true
  ? TDistribute<Right, TCross<Result, TExpand<Left[1]>>>
  : TDistribute<Right, TCross<Result, [Left[1]]>> // - no-expansion
  : Result
)

export type TDistributeArguments<Parameters extends TParameter[], Arguments extends TSchema[], Expression extends TSchema,
  DistributionNames extends string[] = TCollectDistributionNames<Expression>,
  DistributionArray extends boolean[] = TBuildDistributionArray<Parameters, DistributionNames>,
  ZippedArguments extends [boolean, TSchema][] = TZipDistributionArray<Arguments, DistributionArray>,
  Result extends TSchema[][] = (
    Expression extends TDeferred<'Conditional', TSchema[]>
      ? TDistribute<ZippedArguments>
      : Expression extends TDeferred<'Mapped', TSchema[]>
        ? TDistribute<ZippedArguments>
        : [Arguments]
  )> = Result
