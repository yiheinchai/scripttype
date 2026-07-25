/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/keywords/keywords.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Brand<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferredMorph<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type To<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Type<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type bindThis<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type distill<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type instantiateType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type validateDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type validate<def, $ = {}, args = bindThis<def>> = validateDefinition<
		def,
		$,
		args
	>

export type instantiate<def, $ = {}, args = bindThis<def>> = instantiateType<
		inferDefinition<def, $, args>,
		$
	>

export type infer<def, $ = {}, args = bindThis<def>> = inferDefinition<
		def,
		$,
		args
	>

export type In<def, $ = {}, args = {}> = distill.In<
			inferDefinition<def, $, args>
		>

export type Out<def, $ = {}, args = {}> = distill.introspectable.Out<
				inferDefinition<def, $, args>
			>

export type brand<t, id> =
		t extends InferredMorph<infer i, infer o> ?
			o["introspectable"] extends true ?
				(In: i) => To<Brand<o["t"], id>>
			:	(In: i) => Out<Brand<o["t"], id>>
		:	Brand<t, id>

export type type<t = unknown, $ = {}> = Type<t, $>
