/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/template_literal/instantiate.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TCanInstantiate<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInstantiateTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTemplateLiteralDeferred<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTemplateLiteralEncode<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TTemplateLiteralAction<Types extends TSchema[],
  Result extends TSchema = TCanInstantiate<Types> extends true
    ? TTemplateLiteralEncode<Types>
    : TTemplateLiteralDeferred<Types>
> = Result

export type TTemplateLiteralInstantiate<Context extends TProperties, State extends TState, Types extends TSchema[],
  InstantiatedTypes extends TSchema[] = TInstantiateTypes<Context, State, Types>
> = TTemplateLiteralAction<InstantiatedTypes>
