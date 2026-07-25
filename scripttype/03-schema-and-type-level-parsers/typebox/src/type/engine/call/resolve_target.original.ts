/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/call/resolve_target.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TGeneric<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TParameter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRef<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TFromGeneric<Name extends string, Parameters extends TParameter[], Expression extends TSchema> = (
  [Name, TGeneric<Parameters, Expression>]
)

export type TFromNotGeneric = (
  ['(not-generic)', TNever]
)

export type TFromType<Context extends TProperties, Name extends string, Type extends TSchema, Arguments extends TSchema[]> = (
  Type extends TGeneric<infer Parameters extends TParameter[], infer Expression extends TSchema> ? TFromGeneric<Name, Parameters, Expression> :
  Type extends TRef<infer Ref extends string> ? TFromRef<Context, Ref, Arguments> :
  TFromNotGeneric
)

export type TFromNotResolvable = (
  ['(not-resolvable)', TNever]
)

export type TFromRef<Context extends TProperties, Ref extends string, Arguments extends TSchema[]> = (
  Ref extends keyof Context
  ? TFromType<Context, Ref, Context[Ref], Arguments>
  : TFromNotResolvable
)

export type TResolveTarget<Context extends TProperties, Target extends TSchema, Arguments extends TSchema[],
  Result extends [string, TSchema] = TFromType<Context, '(anonymous)', Target, Arguments>
> = Result
