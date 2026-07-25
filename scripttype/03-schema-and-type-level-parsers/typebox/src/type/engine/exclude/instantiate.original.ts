/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/exclude/instantiate.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TCanInstantiate<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TExcludeDeferred<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TExcludeOperation<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInstantiateType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TExcludeAction<Left extends TSchema, Right extends TSchema,
  Result extends TSchema = TCanInstantiate<[Left, Right]> extends true
    ? TExcludeOperation<Left, Right>
    : TExcludeDeferred<Left, Right>
> = Result

export type TExcludeInstantiate<Context extends TProperties, State extends TState, Left extends TSchema, Right extends TSchema,
  InstantiatedLeft extends TSchema = TInstantiateType<Context, State, Left>,
  InstantiatedRight extends TSchema = TInstantiateType<Context, State, Right>
> = TExcludeAction<InstantiatedLeft, InstantiatedRight>
