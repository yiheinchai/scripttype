/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/value/convert/try/try_result.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type TOk<Value extends unknown = unknown> = {
  value: Value
}

export type TFail = undefined

export type TResult<Value extends unknown = unknown> = 
  | TOk<Value> 
  | TFail
