/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/readonly-tuple.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Readonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TupleOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ReadonlyTuple<Element, Length extends number> = Readonly<TupleOf<Length, Element>>;
