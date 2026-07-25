/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/util/generics.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ErrorMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Primitive<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type unionToTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type show<t> = { [k in keyof t]: t[k] } & unknown

export type evaluate<t> = { [k in keyof t]: t[k] } & unknown

export type get<t, k extends PropertyKey> = t[k & keyof t]

export type conform<t, base> = t extends base ? t : base

export type exact<t extends object, u extends object> = {
	[k in keyof t]: k extends keyof u ? conform<t[k], u[k]> : never
}

export type exactMessageOnError<t extends object, u extends object> = {
	[k in keyof t]: k extends keyof u ? conform<t[k], u[k]>
	:	ErrorMessage<`'${k & string}' is not a valid key`>
} & u

export type promisable<t> = t | Promise<t>

export type leftIfEqual<l, r> = [l, r] extends [r, l] ? l : r

export type andPreserveUnknown<l, r> =
	unknown extends l & r ? unknown : show<l & r>

export type equals<l, r> = [l, r] extends [r, l] ? true : false

export type exactEquals<l, r> =
	(<_>() => _ extends l ? 1 : 2) extends <_>() => _ extends r ? 1 : 2 ? true
	:	false

export type Brand<t = unknown, id = unknown> = t & {
	readonly [brand]: [t, id]
}

export type unbrand<t> = t extends Brand<infer base, string> ? base : never

export type satisfy<base, t extends base> = t

export type defined<t> = t & ({} | null)

export type autocomplete<suggestions extends string> =
	| suggestions
	| (string & {})

export type collectWidenedType<t, remaining extends unknown[], result = never> =
	remaining extends [infer head, ...infer tail] ?
		collectWidenedType<t, tail, t extends head ? result | head : result>
	:	result

export type widen<t, supertypes> = collectWidenedType<
	t,
	unionToTuple<supertypes>
>

export type narrowTuple<t extends readonly unknown[]> =
	t extends readonly [infer head, ...infer tail] ?
		readonly [head, ...narrowTuple<tail>]
	:	[]

export type narrow<t> =
	t extends Primitive ? t
	: t extends readonly unknown[] ? narrowTuple<t>
	: { [k in keyof t]: narrow<t[k]> }
