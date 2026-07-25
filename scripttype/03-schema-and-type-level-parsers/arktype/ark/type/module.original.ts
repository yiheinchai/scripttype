/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/module.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Generic<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GenericAst<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PreparsedNodeResolution<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RootModule<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Type<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type anyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Submodule<exports extends {}> = RootModule<
	exports &
		("root" extends keyof exports ? { [inferred]: exports["root"] } : {})
>

export interface BoundModule<exports extends {}, $>
	extends RootModule<bindExportsToScope<exports, $>> {}

export type instantiateExport<t, $> =
	[t] extends [PreparsedNodeResolution] ?
		[t] extends [anyOrNever] ? Type<t, $>
		: t extends GenericAst<infer params, infer body, infer body$> ?
			Generic<params, body, body$, $>
		: t extends Submodule<infer exports> ? BoundModule<exports, $>
		: never
	:	Type<t, $>

export type bindExportsToScope<exports, $> = {
	[k in keyof exports]: instantiateExport<exports[k], $>
} & unknown

export type exportScope<$> = bindExportsToScope<$, $>
