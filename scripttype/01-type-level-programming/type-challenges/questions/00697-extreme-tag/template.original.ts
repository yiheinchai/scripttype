/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-challenges/questions/00697-extreme-tag/template.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type GetTags<B> = any

export type Tag<B, T extends string> = any

export type UnTag<B> = any

export type HasTag<B, T extends string> = any

export type HasTags<B, T extends readonly string[]> = any

export type HasExactTags<B, T extends readonly string[]> = any
