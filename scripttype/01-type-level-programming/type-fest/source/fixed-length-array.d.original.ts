/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/fixed-length-array.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Except<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TupleOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift';

export type FixedLengthArray<Element, Length extends number> =
	Except<TupleOf<Length, Element>, ArrayLengthMutationKeys | number | 'length'>
	& {readonly length: Length}
	& (number extends Length ? {[n: number]: Element} : {});
