/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/match.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ArkErrors<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type BaseCompletions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ErrorMessage<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ErrorType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Key<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Morph<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Out<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PropertyKey<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReturnType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type conform<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type distill<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type isDisjoint<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type numericStringKeyOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type propValueOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type show<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type type<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type unionToTuple<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type MatchParserContext<input = unknown> = {
	cases: Morph[]
	$: unknown
	input: input
	checked: boolean
	key: PropertyKey | null
}

export type from<ctx extends MatchParserContext> = ctx

export type init<$, input = unknown, checked extends boolean = false> = from<{
		cases: []
		$: $
		input: input
		checked: checked
		key: null
	}>

export type atKey<ctx extends MatchParserContext, key extends string> = from<{
		cases: ctx["cases"]
		$: ctx["$"]
		input: ctx["input"]
		checked: ctx["checked"]
		key: key
	}>

export type addCasesToContext<
	ctx extends MatchParserContext,
	cases extends unknown[]
> =
	cases extends Morph[] ?
		ctx.from<{
			$: ctx["$"]
			input: ctx["input"]
			cases: [...ctx["cases"], ...cases]
			checked: ctx["checked"]
			key: ctx["key"]
		}>
	:	never

export type DefaultCaseKeyword = "never" | "assert" | "reject"

export type DefaultCase<ctx extends MatchParserContext = MatchParserContext<any>> =
	| DefaultCaseKeyword
	| Morph<ctx["input"]>

export type addDefaultToContext<
	ctx extends MatchParserContext,
	defaultCase extends DefaultCase<ctx>
> = ctx.from<{
	$: ctx["$"]
	input: defaultCase extends "never" ? Morph.In<ctx["cases"][number]>
	:	ctx["input"]
	cases: defaultCase extends "never" | "assert" ? ctx["cases"]
	: defaultCase extends Morph ?
		ctx["checked"] extends true ?
			[(In: unknown) => ArkErrors, ...ctx["cases"], defaultCase]
		:	[...ctx["cases"], defaultCase]
	:	// we already are guaranteed ArkErrors as a possible output here
		// so don't bother adding it as an input case
		[...ctx["cases"], (In: ctx["input"]) => ArkErrors]
	checked: ctx["checked"]
	key: ctx["key"]
}>

export type CaseKeyKind = "def" | "string"

export type _finalizeCaseArg<
	t,
	ctx extends MatchParserContext,
	endpoint extends "in" | "out",
	ctxInput = ctx["input"]
> =
	ctxInput extends unknown ?
		t extends unknown ?
			distill<t, endpoint> extends infer result ?
				ctxInput extends result ?
					ctxInput
				:	show<ctxInput & result>
			:	never
		:	never
	:	never

export type maybeLiftToKey<t, ctx extends MatchParserContext> =
	ctx["key"] extends PropertyKey ? { [k in ctx["key"]]: t } : t

export type inferCaseArg<
	def,
	ctx extends MatchParserContext,
	endpoint extends "in" | "out"
> = _finalizeCaseArg<
	maybeLiftToKey<type.infer<def, ctx["$"]>, ctx>,
	ctx,
	endpoint
>

export type casesToMorphTuple<
	cases,
	ctx extends MatchParserContext,
	kind extends CaseKeyKind
> = unionToTuple<
	propValueOf<{
		[def in Exclude<keyof cases, "default">]: cases[def] extends (
			Morph<never, infer o>
		) ?
			kind extends "def" ?
				(
					In: inferCaseArg<def extends number ? `${number}` : def, ctx, "in">
				) => o
			:	(In: maybeLiftToKey<def, ctx>) => o
		:	never
	}>
>

export interface Match<In = any, cases extends Morph[] = Morph[]>
	extends Inferred<
		(In: Morph.In<cases[number]>) => Out<ReturnType<cases[number]>>
	> {
	<const data extends In>(
		data: data
	): {
		[i in numericStringKeyOf<cases>]: isDisjoint<
			data,
			Morph.In<cases[i]>
		> extends true ?
			never
		:	Morph.Out<cases[i]>
	}[numericStringKeyOf<cases>]
}

export type finalizeMatchParser<
	ctx extends MatchParserContext,
	defaultCase extends DefaultCase<ctx>
> =
	addDefaultToContext<ctx, defaultCase> extends (
		infer ctx extends MatchParserContext
	) ?
		Match<ctx["input"], ctx["cases"]>
	:	never

export type CaseParser<ctx extends MatchParserContext> = <const def, ret>(
	def: type.validate<def, ctx["$"]>,
	resolve: (In: inferCaseArg<def, ctx, "out">) => ret
) => ChainableMatchParser<
	addCasesToContext<ctx, [(In: inferCaseArg<def, ctx, "in">) => ret]>
>

export type validateCases<cases, ctx extends MatchParserContext> = {
	[def in
		| keyof cases
		| BaseCompletions<ctx["$"], {}, "default">]?: def extends "default" ?
		DefaultCase<ctx>
	: def extends number ? (In: inferCaseArg<`${def}`, ctx, "out">) => unknown
	: def extends type.validate<def, ctx["$"]> ?
		(In: inferCaseArg<def, ctx, "out">) => unknown
	:	type.validate<def, ctx["$"]>
}

export type errorCases<cases, ctx extends MatchParserContext> = {
	[def in keyof cases]?: def extends "default" ? DefaultCase<ctx>
	: def extends number ? (In: inferCaseArg<`${def}`, ctx, "out">) => unknown
	: def extends type.validate<def, ctx["$"]> ?
		(In: inferCaseArg<def, ctx, "out">) => unknown
	:	ErrorType<type.validate<def, ctx["$"]>>
} & {
	[k in BaseCompletions<ctx["$"], {}>]?: (
		In: inferCaseArg<k, ctx, "out">
	) => unknown
} & {
	default?: DefaultCase<ctx>
}

export type CaseMatchParser<ctx extends MatchParserContext> = <const cases>(
	def: cases extends validateCases<cases, ctx> ? cases : errorCases<cases, ctx>
) => addCasesToParser<cases, ctx, "def">

export type DefaultMethod<ctx extends MatchParserContext> = <
	const def extends DefaultCase<ctx>
>(
	def: def
) => finalizeMatchParser<ctx, def>

export type doubleAtMessage = typeof doubleAtMessage

export type chainedAtMessage = typeof chainedAtMessage

export type validateKey<key extends Key, ctx extends MatchParserContext> =
	ctx["key"] extends Key ? ErrorMessage<doubleAtMessage>
	: ctx["cases"]["length"] extends 0 ?
		keyof ctx["input"] extends never ?
			key
		:	conform<key, keyof ctx["input"]>
	:	ErrorMessage<chainedAtMessage>

export interface AtParser<ctx extends MatchParserContext> {
	<const key extends string>(
		key: validateKey<key, ctx>
	): ChainableMatchParser<ctx.atKey<ctx, key>>

	<
		const key extends string,
		const cases,
		ctxAtKey extends MatchParserContext = ctx.atKey<ctx, key>
	>(
		key: validateKey<key, ctx>,
		cases: cases extends validateCases<cases, ctxAtKey> ? cases
		:	errorCases<cases, ctxAtKey>
	): addCasesToParser<cases, ctxAtKey, "def">
}

export type stringValue<ctx extends MatchParserContext> =
	ctx["input"] extends string ? ctx["input"]
	: ctx["key"] extends keyof ctx["input"] ?
		ctx["input"][ctx["key"]] extends infer s extends string ?
			s
		:	never
	:	never

export type validateStringCases<cases, ctx extends MatchParserContext> =
	unknown extends ctx["input"] ?
		{
			[k in keyof cases]?: k extends "default" ? DefaultCase<ctx>
			:	(In: _finalizeCaseArg<maybeLiftToKey<k, ctx>, ctx, "out">) => unknown
			// always autocomplete the "default" key
		} & { default?: DefaultCase<ctx> }
	:	{
			[k in keyof cases]?: k extends "default" ? DefaultCase<ctx>
			: k extends stringValue<ctx> ?
				(In: _finalizeCaseArg<maybeLiftToKey<k, ctx>, ctx, "out">) => unknown
			:	ErrorType<`${k & string} must be a possible string value`>
		} & { [k in stringValue<ctx>]?: unknown } & {
			default?: DefaultCase<ctx>
		}

export interface StringsParser<ctx extends MatchParserContext> {
	<const cases>(
		def: cases extends validateStringCases<cases, ctx> ? cases
		:	validateStringCases<cases, ctx>
	): addCasesToParser<cases, ctx, "string">
}

export interface ChainableMatchParser<ctx extends MatchParserContext> {
	case: CaseParser<ctx>
	match: CaseMatchParser<ctx>
	default: DefaultMethod<ctx>
	at: AtParser<ctx>
	/** @experimental */
	strings: StringsParser<ctx>
}

export type addCasesToParser<
	cases,
	ctx extends MatchParserContext,
	kind extends CaseKeyKind
> =
	cases extends { default: infer defaultDef extends DefaultCase<ctx> } ?
		finalizeMatchParser<
			addCasesToContext<ctx, casesToMorphTuple<cases, ctx, kind>>,
			defaultDef
		>
	:	ChainableMatchParser<
			addCasesToContext<ctx, casesToMorphTuple<cases, ctx, kind>>
		>
