/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/call/resolve_arguments.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Memory<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInstantiateType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TParameter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TBindArgument<Context extends TProperties, State extends TState, Name extends string, Extends extends TSchema, Type extends TSchema,
  InstantiatedArgument extends TSchema = TInstantiateType<Context, State, Type>,
> = Memory.TAssign<Context, { [_ in Name]: InstantiatedArgument }>

export type TBindParameters<Context extends TProperties, State extends TState, Parameters extends TParameter[], Arguments extends TSchema[]> = (
  Parameters extends [infer Left extends TParameter, ...infer Right extends TParameter[]]
  ? TBindArguments<Context, State, Left, Right, Arguments>
  : Context
)

export type TBindArguments<Context extends TProperties, State extends TState, ParameterLeft extends TParameter, ParameterRight extends TParameter[], Arguments extends TSchema[],
  InstantiatedExtends extends TSchema = TInstantiateType<Context, State, ParameterLeft['extends']>,
  InstantiatedEquals extends TSchema = TInstantiateType<Context, State, ParameterLeft['equals']>,
> = (
    Arguments extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
    ? TBindParameters<TBindArgument<Context, State, ParameterLeft['name'], InstantiatedExtends, Left>, State, ParameterRight, Right>
    : TBindParameters<TBindArgument<Context, State, ParameterLeft['name'], InstantiatedExtends, InstantiatedEquals>, State, ParameterRight, []>
  )

export type TResolveArgumentsContext<Context extends TProperties, State extends TState, Parameters extends TParameter[], Arguments extends TSchema[],
  Result extends TProperties = TBindParameters<Context, State, Parameters, Arguments>
> = Result
