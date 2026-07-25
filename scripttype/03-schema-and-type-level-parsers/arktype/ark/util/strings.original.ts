/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/util/strings.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Lowercase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Uppercase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type whitespaceChars<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type firstChar<s extends string> =
	s extends `${infer head}${string}` ? head : ""

export type charsAfterFirst<s extends string> =
	s extends `${string}${infer tail}` ? tail : ""

export type lastChar<s extends string> =
	s extends `${infer head}${infer tail}` ?
		tail extends "" ?
			head
		:	lastChar<tail>
	:	s

export type charsBeforeLast<s extends string> =
	s extends `${infer head}${infer tail}` ?
		tail extends "" ?
			""
		:	`${head}${charsBeforeLast<tail>}`
	:	""

export type contains<s extends string, sub extends string> =
	s extends `${string}${sub}${string}` ? true : false

export type WhitespaceChar = keyof typeof whitespaceChars

export type trimEnd<s extends string> =
	s extends `${infer init}${WhitespaceChar}` ? trimEnd<init> : s

export type trimStart<s extends string> =
	s extends `${WhitespaceChar}${infer tail}` ? trimEnd<tail> : s

export type trim<s extends string> = trimEnd<trimStart<s>>

export type isStringLiteral<t> =
	[t] extends [string] ?
		[string] extends [t] ? false
		: Uppercase<t> extends Uppercase<Lowercase<t>> ?
			Lowercase<t> extends Lowercase<Uppercase<t>> ?
				true
			:	false
		:	false
	:	false
