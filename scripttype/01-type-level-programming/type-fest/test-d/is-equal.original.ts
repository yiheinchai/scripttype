/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/test-d/is-equal.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type IsEqual<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type BranchOnWrappedTupleMatches<Tpl> = (Tpl extends [[0, 2]] ? 'Foo' : 'Bar');

export type BranchOnWrappedTupleDoesNotMatch<Tpl> = (Tpl extends [[0, 1]] ? 'Foo' : 'Bar');

export type BranchOnTupleMatches<Tpl> = (Tpl extends [0, 2] ? 'Foo' : 'Bar');

export type BranchOnTupleDoesNotMatch<Tpl> = (Tpl extends [0, 1] ? 'Foo' : 'Bar');

export type Assignability<T, U, _V extends IsEqual<T, U>> = any;

export type TestAssignability<T> = Assignability<T, T, true>;
