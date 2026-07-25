/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/schema/static/enum.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type XStaticEnum<Values extends unknown[], Result extends unknown = never> = (
  Values extends [infer Left extends unknown, ...infer Right extends unknown[]]
  ? XStaticEnum<Right, Left | Result>
  : Result
)
