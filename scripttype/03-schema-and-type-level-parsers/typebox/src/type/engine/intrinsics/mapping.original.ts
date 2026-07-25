/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/intrinsics/mapping.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export interface TMappingType {
  input: string
  output: string
}

export type TApplyMapping<Mapping extends TMappingType, Value extends string> = (
  (Mapping & { input: Value })['output']
)
