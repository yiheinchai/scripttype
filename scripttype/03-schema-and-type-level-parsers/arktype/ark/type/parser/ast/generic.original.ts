/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/ast/generic.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ErrorMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GenericAst<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GenericParamAst<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Hkt<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnparsedScope<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type array<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type astToString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferAstRoot<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferExpression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type typeToString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type validateAst<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type writeUnsatisfiedParameterConstraintMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type GenericInstantiationAst<
	generic extends GenericAst = GenericAst,
	argAsts extends unknown[] = unknown[]
> = [generic, "<>", argAsts]

export type resolveScope<g$, $> =
	// If the generic was defined in the current scope, its definition can be
	// resolved using the same scope as that of the input args.
	g$ extends UnparsedScope ? $
	:	// Otherwise, use the scope that was explicitly bound to it.
		g$

export type inferGenericInstantiation<
	g extends GenericAst,
	argAsts extends unknown[],
	$,
	args
> =
	g["bodyDef"] extends Hkt ?
		Hkt.apply<
			g["bodyDef"],
			{ [i in keyof argAsts]: inferExpression<argAsts[i], $, args> }
		>
	:	inferDefinition<
			g["bodyDef"],
			resolveScope<g["$"], $>,
			{
				// intersect `${number}` to ensure that only array indices are mapped
				[i in keyof g["names"] & `${number}` as g["names"][i]]: inferExpression<
					argAsts[i & keyof argAsts],
					resolveScope<g["arg$"], $>,
					args
				>
			}
		>

export type validateGenericArgs<
	params extends array<GenericParamAst>,
	argAsts extends array,
	$,
	args,
	indices extends 1[]
> =
	argAsts extends readonly [infer arg, ...infer argsTail] ?
		validateAst<arg, $, args> extends infer e extends ErrorMessage ? e
		: inferAstRoot<arg, $, args> extends params[indices["length"]][1] ?
			validateGenericArgs<params, argsTail, $, args, [...indices, 1]>
		:	ErrorMessage<
				writeUnsatisfiedParameterConstraintMessage<
					params[indices["length"]][0],
					typeToString<params[indices["length"]][1]>,
					astToString<arg>
				>
			>
	:	undefined

export type validateGenericInstantiation<
	g extends GenericAst,
	argAsts extends unknown[],
	$,
	args
> = validateGenericArgs<g["paramsAst"], argAsts, $, args, []>
