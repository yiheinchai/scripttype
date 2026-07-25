/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/conditional/instantiate.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TCanInstantiate<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TConditionalDeferred<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TExtends<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInstantiateType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TConditionalOperation<Context extends TProperties, State extends TState, Left extends TSchema, Right extends TSchema, True extends TSchema, False extends TSchema,
  ExtendsResult extends ExtendsResult.TResult = TExtends<Context, Left, Right>,
> = (
  ExtendsResult extends ExtendsResult.TExtendsUnion<infer InferredContext extends TProperties> ? TUnion<[TInstantiateType<InferredContext, State, True>, TInstantiateType<Context, State,False>]> :
  ExtendsResult extends ExtendsResult.TExtendsTrue<infer InferredContext extends TProperties> ? TInstantiateType<InferredContext, State, True> :
  TInstantiateType<Context, State, False>
)

export type TConditionalAction<Context extends TProperties, State extends TState, Left extends TSchema, Right extends TSchema, True extends TSchema, False extends TSchema,
  Result extends TSchema = TCanInstantiate<[Left, Right]> extends true
    ? TConditionalOperation<Context, State, Left, Right, True, False>
    : TConditionalDeferred<Left, Right, True, False>
> = Result

export type TConditionalInstantiate<Context extends TProperties, State extends TState, Left extends TSchema, Right extends TSchema, True extends TSchema, False extends TSchema,
  InstaniatedLeft extends TSchema = TInstantiateType<Context, State, Left>,
  InstaniatedRight extends TSchema = TInstantiateType<Context, State, Right>,
> = TConditionalAction<Context, State, InstaniatedLeft, InstaniatedRight, True, False>
