/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/absolute.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type StringToNumber<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type Absolute<N extends number | bigint> = N extends bigint // Also, distributes `N`
	? `${N}` extends `-${infer Magnitude extends bigint}`
		? Magnitude
		: N
	: `${N}` extends `-${infer Magnitude}` // This doesn't use the `extends number` constraint approach because that fails with the `-Infinity` case
		? StringToNumber<Magnitude>
		: N;
