/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/test-d/remove-prefix.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type RemovePrefix<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Uppercase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Assignability<S extends string> = S;

export type Test1<S extends string, Prefix extends string> = Assignability<RemovePrefix<S, Prefix>>;

export type Test2<S extends Uppercase<string>, Prefix extends '-' | '/' | '#'> = Assignability<RemovePrefix<S, Prefix>>;
