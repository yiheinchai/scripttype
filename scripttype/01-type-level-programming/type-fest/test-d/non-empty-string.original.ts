/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/test-d/non-empty-string.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type NonEmptyString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Assignability1<_S extends string> = unknown;

export type Test1<S extends string> = Assignability1<NonEmptyString<S>>;

export type Assignability2<_S extends string, _SS extends NonEmptyString<_S>> = unknown;

export type Test2<S extends string> = Assignability2<S, S>;
