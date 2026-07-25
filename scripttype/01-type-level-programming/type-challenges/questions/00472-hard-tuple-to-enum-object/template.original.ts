/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-challenges/questions/00472-hard-tuple-to-enum-object/template.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type Enum<T extends readonly string[], N extends boolean = false> = any
