/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/fn.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Fn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Parameters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Return<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Type<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type applyElementLabels<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type conform<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type distill<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type get<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferTupleLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type type<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type validateInnerDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type validateTupleLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type validateFnParamDefs<paramDefs extends readonly unknown[], $> =
	paramDefs extends validateTupleLiteral<paramDefs, $, {}> ? paramDefs
	: paramDefs extends {
		[i in keyof paramDefs]: paramDefs[i] extends "..." ? paramDefs[i]
		:	validateInnerDefinition<paramDefs[i], $, {}>
	} ?
		validateTupleLiteral<paramDefs, $, {}>
	:	{ [i in keyof paramDefs]: validateInnerDefinition<paramDefs[i], $, {}> }

export type validateFnArgs<args, $> =
	args extends readonly unknown[] ?
		args extends readonly [...infer paramDefs, ":", infer returnDef] ?
			readonly [
				...validateFnParamDefs<paramDefs, $>,
				":",
				type.validate<returnDef, $>
			]
		:	validateFnParamDefs<args, $>
	:	never

export interface TypedFn<
	signature extends Fn = Fn,
	$ = {},
	meta extends TypedFn.meta = {}
> extends Callable<signature> {
	expression: string
	params: signature extends Fn<infer params> ? Type<params, $> : never
	returns: Type<
		meta extends Return.introspectable ? ReturnType<signature> : unknown,
		$
	>
}

export type BaseFnParser<$ = {}> = <
	const args extends readonly unknown[],
	paramsT extends readonly unknown[] = inferTupleLiteral<
		args extends readonly [...infer params, ":", unknown] ? params : args,
		$,
		{}
	>,
	returnT = args extends readonly [...unknown[], ":", infer returnDef] ?
		type.infer<returnDef, $>
	:	unknown
>(
	...args: {
		[i in keyof args]: conform<args[i], get<validateFnArgs<args, $>, i>>
	}
) => <
	internalSignature extends (
		...args: distill.Out<paramsT>
	) => distill.In<returnT>,
	externalSignature extends Fn = (
		...args: applyElementLabels<
			distill.In<paramsT>,
			Parameters<internalSignature>
		>
	) => args extends readonly [...unknown[], ":", unknown] ? distill.Out<returnT>
	:	ReturnType<internalSignature>
>(
	implementation: internalSignature
) => TypedFn<
	externalSignature,
	$,
	args extends readonly [...unknown[], ":", unknown] ? Return.introspectable
	:	{}
>
