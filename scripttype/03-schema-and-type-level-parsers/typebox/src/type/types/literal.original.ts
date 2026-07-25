/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/types/literal.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type TLiteralValue = string | number | boolean | bigint

export type StaticLiteral<Value extends TLiteralValue> = (
  Value
)

export type TLiteralTypeName<Value extends TLiteralValue> = (
  Value extends bigint ? 'bigint' :
  Value extends boolean ? 'boolean' :
  Value extends number ? 'number' :
  Value extends string ? 'string' :
  never
)
