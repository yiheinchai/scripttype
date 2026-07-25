/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/pick/instantiate.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TCanInstantiate<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInstantiateType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TPickDeferred<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TPickAction<Type extends TSchema, Indexer extends TSchema,
  Result extends TSchema = TCanInstantiate<[Type, Indexer]> extends true
    ? TFromType<Type, Indexer>
    : TPickDeferred<Type, Indexer>
> = Result

export type TPickInstantiate<Context extends TProperties, State extends TState, Type extends TSchema, Indexer extends TSchema,
  InstantiatedType extends TSchema = TInstantiateType<Context, State, Type>,
  InstantiatedIndexer extends TSchema = TInstantiateType<Context, State, Indexer>,
> = TPickAction<InstantiatedType, InstantiatedIndexer>
