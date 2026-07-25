/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/ast/generic.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ErrorMessage<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type GenericAst<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type GenericParamAst<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Hkt<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnparsedScope<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type array<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type astToString<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type inferAstRoot<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type inferDefinition<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type inferExpression<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type typeToString<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type validateAst<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type writeUnsatisfiedParameterConstraintMessage<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
