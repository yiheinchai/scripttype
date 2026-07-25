/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/extends/extends.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TCyclic<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TCyclicExtends<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TExtendsLeft<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnknown<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnsafe<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TCanonical<Type extends TSchema> = (
  Type extends TCyclic ? TCyclicExtends<Type> : 
  Type extends TUnsafe ? TUnknown : 
  Type
)

export type TExtends<Inferred extends TProperties, Left extends TSchema, Right extends TSchema,
  CanonicalLeft extends TSchema = TCanonical<Left>,
  CanonicalRight extends TSchema = TCanonical<Right>
> = TExtendsLeft<Inferred, CanonicalLeft, CanonicalRight>
