/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/util/keys.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type NonNegativeIntegerLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type array<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type join<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type toArkKey<o, k extends keyof o> =
	k extends number ?
		[o, number] extends [array, k] ?
			NonNegativeIntegerLiteral
		:	`${k}`
	:	k

export type arkArrayKeyOf<a extends array> =
	number extends a["length"] ? NonNegativeIntegerLiteral
	: keyof a extends infer i ?
		i extends `${number}` ?
			i
		:	never
	:	never

export type arkObjectLiteralKeyOf<o extends object> =
	keyof o extends infer k ?
		k extends number ?
			`${k}`
		:	k
	:	never

export type arkKeyOf<o> =
	[o] extends [object] ?
		[o] extends [array] ?
			arkArrayKeyOf<o>
		:	arkObjectLiteralKeyOf<o>
	:	never

export type arkIndexableOf<o> =
	arkKeyOf<o> extends infer k ?
		k extends `${infer index extends number}` ?
			index | k
		:	k
	:	never

export type arkGet<o, k extends arkIndexableOf<o>> = o[k extends keyof o ? k
: NonNegativeIntegerLiteral extends k ? number & keyof o
: k extends number ? `${k}` & keyof o
: never]

export type writeInvalidKeysMessage<
	o extends string,
	keys extends array<string>
> = `Key${keys["length"] extends 1 ? "" : "s"} ${join<keys, ", ">} ${keys["length"] extends 1 ? "does" : "do"} not exist on ${o}`
