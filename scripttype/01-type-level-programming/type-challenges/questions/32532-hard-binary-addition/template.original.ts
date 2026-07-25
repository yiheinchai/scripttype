/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-challenges/questions/32532-hard-binary-addition/template.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type Bit = 1 | 0

export type BinaryAdd<A extends Bit[], B extends Bit[]> = any
