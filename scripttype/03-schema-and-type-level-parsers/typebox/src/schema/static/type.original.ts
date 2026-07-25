/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/schema/static/type.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type XFromTypeName<TypeName extends string> = (
  // jsonschema
  TypeName extends 'object' ? object :
  TypeName extends 'array' ? {} :
  TypeName extends 'boolean' ? boolean :
  TypeName extends 'integer' ? number :
  TypeName extends 'number' ? number :
  TypeName extends 'null' ? null :
  TypeName extends 'string' ? string :
  // xschema
  TypeName extends 'bigint' ? bigint :
  TypeName extends 'symbol' ? symbol :
  TypeName extends 'undefined' ? undefined : 
  TypeName extends 'void' ? void :
  // xschema - structural objects
  TypeName extends 'asyncIterator' ? {} :
  TypeName extends 'constructor' ? {} :
  TypeName extends 'function' ? {} :
  TypeName extends 'iterator' ? {} :
  unknown
)

export type XFromTypeNames<TypeNames extends string[], Result extends unknown = never> = (
  TypeNames extends readonly [infer Left extends string, ...infer Right extends string[]]
    ? XFromTypeNames<Right, Result | XFromTypeName<Left>>
    : Result
)

export type XStaticType<TypeName extends string[] | string> = (
  TypeName extends string[] ? XFromTypeNames<TypeName> :
  TypeName extends string ? XFromTypeName<TypeName> :
  unknown
)
