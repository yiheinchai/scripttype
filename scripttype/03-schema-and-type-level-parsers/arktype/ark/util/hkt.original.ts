/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/util/hkt.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Hkt<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type constructor<constraints extends unknown[] = any> =
		new () => Hkt<constraints>

export type apply<
		hkt extends Hkt,
		args extends { [i in keyof args]: hkt["constraints"][i] }
	> = (hkt & {
		[args]: args
	})["body"]
