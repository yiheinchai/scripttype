/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/attest/bench/bench.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BenchAssertions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BenchTypeAssertions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type BenchableFunction = () => unknown | Promise<unknown>

export type InitialBenchAssertions<Fn extends BenchableFunction> =
	BenchAssertions<Fn> & BenchTypeAssertions
