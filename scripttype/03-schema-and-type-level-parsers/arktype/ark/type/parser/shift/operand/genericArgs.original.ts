/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/shift/operand/genericArgs.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ErrorMessage<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type GenericAst<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StaticState<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type array<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type genericParamNames<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type join<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type parseUntilFinalizer<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type s<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type writeUnclosedGroupMessage<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type ParsedArgs<
	result extends unknown[] = unknown[],
	unscanned extends string = string
> = {
	result: result
	unscanned: unscanned
}

export type writeInvalidGenericArgCountMessage<
	name extends string,
	params extends array<string>,
	argDefs extends array<string>
> = `${name}<${join<
	params,
	", "
>}> requires exactly ${params["length"]} args (got ${argDefs["length"]}${argDefs["length"] extends (
	0
) ?
	""
:	`: ${join<argDefs, ",">}`})`

export type _parseGenericArgs<
	name extends string,
	g extends GenericAst,
	unscanned extends string,
	$,
	args,
	argDefs extends string[],
	argAsts extends unknown[]
> =
	parseUntilFinalizer<s.initialize<unscanned>, $, args> extends (
		infer finalArgState extends StaticState
	) ?
		{
			defs: [
				...argDefs,
				finalArgState["scanned"] extends `${infer def}${"," | ">"}` ? def
				:	finalArgState["scanned"]
			]
			asts: [...argAsts, finalArgState["root"]]
			unscanned: finalArgState["unscanned"]
		} extends (
			{
				defs: infer nextDefs extends string[]
				asts: infer nextAsts extends unknown[]
				unscanned: infer nextUnscanned extends string
			}
		) ?
			finalArgState["finalizer"] extends ">" ?
				nextAsts["length"] extends g["paramsAst"]["length"] ?
					ParsedArgs<nextAsts, nextUnscanned>
				:	s.error<
						writeInvalidGenericArgCountMessage<
							name,
							genericParamNames<g["paramsAst"]>,
							nextDefs
						>
					>
			: finalArgState["finalizer"] extends "," ?
				_parseGenericArgs<name, g, nextUnscanned, $, args, nextDefs, nextAsts>
			: finalArgState["finalizer"] extends ErrorMessage ? finalArgState
			: s.error<writeUnclosedGroupMessage<">">>
		:	never
	:	never

export type parseGenericArgs<
	name extends string,
	g extends GenericAst,
	unscanned extends string,
	$,
	args
> = _parseGenericArgs<name, g, unscanned, $, args, [], []>
