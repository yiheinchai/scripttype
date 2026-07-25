/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/types/cyclic.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type StaticDirection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StaticType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type StaticCyclic<Stack extends string[], Direction extends StaticDirection, Context extends TProperties, This extends TProperties, Defs extends TProperties, Ref extends string, 
  Result extends unknown = (
    Ref extends keyof Defs
      ? StaticType<[...Stack, Ref], Direction, Defs, This, Defs[Ref]>
      : never
  )
> = Result
