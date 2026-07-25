/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/system/memory/assign.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ObjectLike = Record<PropertyKey, any>

export type TAssign<Left extends ObjectLike, Right extends ObjectLike,
  Assigned extends ObjectLike = Omit<Left, keyof Right> & Right
> = {[Key in keyof Assigned]: Assigned[Key] } & {}
