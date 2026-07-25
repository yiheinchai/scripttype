/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/tuple-to-union.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type TupleToUnion<ArrayType> = ArrayType extends readonly unknown[] ? ArrayType[number] : never;
