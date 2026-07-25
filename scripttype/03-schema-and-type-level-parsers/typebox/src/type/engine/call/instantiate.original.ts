/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/call/instantiate.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TCallConstruct<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TDistributeArguments<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEvaluateUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TGeneric<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInstantiateType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInstantiateTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TParameter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRef<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TResolveArgumentsContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TResolveTarget<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TPeek<State extends TState, 
  Result extends string = State['callstack'] extends [...infer _ extends string[], infer Top extends string] ? Top : ''
> = Result

export type TIsTailCall<State extends TState, Name extends string,
  Result extends boolean = TPeek<State> extends Name ? true : false
> = Result

export type TCallDispatch<Context extends TProperties, State extends TState, Target extends TRef, Parameters extends TParameter[], Expression extends TSchema, Arguments extends TSchema[],
  ArgumentsContext extends TProperties = TResolveArgumentsContext<Context, State, Parameters, Arguments>,
  ReturnType extends TSchema = TInstantiateType<ArgumentsContext, TState<[...State['callstack'], Target['$ref']], State['visited']>, Expression>,
> = TInstantiateType<ArgumentsContext, TState<[], []>, ReturnType>

export type TCallDistributed<Context extends TProperties, State extends TState, Target extends TRef, Parameters extends TParameter[], Expression extends TSchema, DistributedArguments extends TSchema[][], Result extends TSchema[] = []> = (
  DistributedArguments extends [infer Arguments extends TSchema[], ...infer DistributedArguments extends TSchema[][]]
    ? TCallDispatch<Context, State, Target, Parameters, Expression, Arguments> extends infer ReturnType extends TSchema // excessive-stack-depth-prevention
      ? TCallDistributed<Context, State, Target, Parameters, Expression, DistributedArguments, [...Result, ReturnType]>
      : never // unreachable - excessive-stack-depth-prevention
    : Result
)

export type TCallImmediate<Context extends TProperties, State extends TState, Target extends TRef, Parameters extends TParameter[], Expression extends TSchema, InstantiatedArguments extends TSchema[],
  DistributedArguments extends TSchema[][] = TDistributeArguments<Parameters, InstantiatedArguments, Expression>,
  ReturnTypes extends TSchema[] = TCallDistributed<Context, State, Target, Parameters, Expression, DistributedArguments>,
  Result extends TSchema = ReturnTypes['length'] extends 1 ? ReturnTypes[0] : TEvaluateUnion<ReturnTypes>
> = Result

export type TCallInstantiate<Context extends TProperties, State extends TState, Target extends TSchema, Arguments extends TSchema[],
  InstantiatedArguments extends TSchema[] = TInstantiateTypes<Context, State, Arguments>,
  Resolved extends [string, TSchema] = TResolveTarget<Context, Target, Arguments>,
  Name extends string = Resolved[0], 
  Type extends TSchema = Resolved[1],
  Result extends TSchema = (
    Type extends TGeneric<infer Parameters extends TParameter[], infer Expression extends TSchema>
    ? TIsTailCall<State, Name> extends true
      ? TCallConstruct<TRef<Name>, InstantiatedArguments>
      : TCallImmediate<Context, State, TRef<Name>, Parameters, Expression, InstantiatedArguments>
    : TCallConstruct<Target, InstantiatedArguments>
  )> = Result
