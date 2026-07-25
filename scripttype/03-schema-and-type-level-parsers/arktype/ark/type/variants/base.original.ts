/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/variants/base.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ErrorMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type anyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type unset<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type validateChainedAsArgs<t> =
	[t] extends [unset] ?
		[t] extends [anyOrNever] ?
			[]
		:	[
				ErrorMessage<"as requires an explicit type parameter like myType.as<t>()">
			]
	:	[]
