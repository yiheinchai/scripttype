/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/ref/instantiate.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TInstantiateType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRef<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TRefInstantiate<Context extends TProperties, State extends TState, Type extends TRef, Ref extends string> = (
  Ref extends State['visited'][number]
    ? Type
    : Ref extends keyof Context
      ? TInstantiateType<Context, TState<State['callstack'], [...State['visited'], Ref]>, Context[Ref]>
      : Type
)
