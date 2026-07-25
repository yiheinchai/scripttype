/**
 * ORIGINAL TypeScript from 07-compiler-internals/typescript/src/compiler/corePublic.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Comparison<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type EqualityComparer<T> = (a: T, b: T) => boolean;

export type Comparer<T> = (a: T, b: T) => Comparison;
