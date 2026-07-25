/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/regex/regex.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ErrorMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RegexExecArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type State<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type parseState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type UnicodeFlag = "v" | "u"

export type Flags =
	`${"d" | ""}${"g" | ""}${"i" | ""}${"m" | ""}${"s" | ""}${UnicodeFlag | ""}${"y" | ""}`

export type IndexedCaptures = Array<string | undefined>

export type NamedCaptures = Record<string, string | undefined>

export type RegexContext = {
	flags?: Flags
	captures?: IndexedCaptures
	names?: NamedCaptures
}

export interface Regex<
	out pattern extends string = string,
	// @ts-ignore (override variance)
	out ctx extends RegexContext = RegexContext
> extends RegExp {
	[inferred]: pattern
	infer: pattern
	inferCaptures: ctx["captures"] extends IndexedCaptures ? ctx["captures"] : []
	inferNamedCaptures: ctx["names"] extends NamedCaptures ? ctx["names"] : {}
	inferExecArray: RegexExecArray<
		[pattern, ...this["inferCaptures"]],
		this["inferNamedCaptures"],
		this["flags"]
	>

	flags: ctx["flags"] extends Flags ? ctx["flags"] : ""

	test(s: string): s is pattern

	exec(s: string): this["inferExecArray"] | null
	// allow extension of base RegExp with more accurate types
	// since parameters are identical, this overload will never be hit
	exec(s: string): never
}

export type regex<
	pattern extends string = string,
	ctx extends RegexContext = RegexContext
> = Regex<pattern, ctx>

export type parse<src extends string, flags extends Flags = ""> = parseState<
		State.initialize<src, flags>
	>

export type infer<src extends string, flags extends Flags = ""> =
		parse<src, flags> extends Regex<infer pattern> ? pattern : never

export type validate<src extends string, flags extends Flags = ""> =
		parse<src, flags> extends infer e extends ErrorMessage ? e : src
