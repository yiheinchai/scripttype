/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/record/instantiate.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TCanInstantiate<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInstantiateType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRecordDeferred<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TRecordAction<Key extends TSchema, Value extends TSchema,
  Result extends TSchema = TCanInstantiate<[Key]> extends true
    ? TFromKey<Key, Value>
    : TRecordDeferred<Key, Value>
> = Result

export type TRecordInstantiate<Context extends TProperties, State extends TState, Key extends TSchema, Value extends TSchema,
  InstantiatedKey extends TSchema = TInstantiateType<Context, State, Key>,
  InstantiatedValue extends TSchema = TInstantiateType<Context, State, Value>,
> = TRecordAction<InstantiatedKey, InstantiatedValue>
