/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/schema/static/required.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type XStaticRequired<_Stack extends string[], _Root extends XSchema, Schema extends XSchema, Keys extends string[],
  // If the 'properties' keyword is present, we return {} and trust the 'Properties' inference 
  // path to resolve the 'required' keyword. If 'properties' is absent, we generate an object 
  // where each key is assigned an 'unknown' type, as 'required' without 'properties' 
  // still implies that the keys should exist on the object.
  Result extends Record<PropertyKey, unknown> = Schema extends XProperties ? {} : Record<Keys[number], unknown>
> = Result
