/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/cyclic/target.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRef<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TResolve<Defs extends TProperties, Ref extends string> = (
  Ref extends keyof Defs
    ? Defs[Ref] extends TRef<infer Ref extends string> 
      ? TResolve<Defs, Ref>
      : Defs[Ref]
    : TNever
)

export type TCyclicTarget<Defs extends TProperties, Ref extends string,
  Result extends TSchema = TResolve<Defs, Ref>
> = Result
