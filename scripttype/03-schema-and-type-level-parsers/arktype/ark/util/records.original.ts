/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/util/records.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Extract<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Fn<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Pick<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Primitive<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PropertyKey<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TypedPropertyDescriptor<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type array<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type defined<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type intersectUnion<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type show<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type Dict<k extends string = string, v = unknown> = {
	readonly [_ in k]: v
}

export type dict<v = unknown, k extends string = string> = {
	[_ in k]: v
}

export type propwiseXor<a, b> =
	| show<a & { [k in keyof b]?: undefined }>
	| show<b & { [k in keyof a]?: undefined }>

export type unionToPropwiseXor<
	props extends object,
	branchKey extends PropertyKey = keyof intersectUnion<props>
> =
	props extends infer distributed ?
		show<
			distributed & {
				// ensure keys not present on the current branch are undefined
				[k in branchKey]?: k extends keyof distributed ? unknown : undefined
			}
		>
	:	never

export type requireKeys<o, key extends keyof o> = o & {
	[requiredKey in key]-?: defined<o[requiredKey]>
}

export type _require<o, depth extends 1[], maxDepth extends number> =
	depth["length"] extends maxDepth ? o
	: o extends object ?
		o extends Fn ?
			o
		:	{
				[k in keyof o]-?: _require<o[k], [...depth, 1], maxDepth>
			}
	:	o

export type require<o, maxDepth extends number = 1> = _require<o, [], maxDepth>

export type PartialRecord<k extends PropertyKey = PropertyKey, v = unknown> = {
	[_ in k]?: v
}

export type isSafelyMappable<t> =
	{ [k in keyof t]: t[k] } extends t ? true : false

export type KeySet<key extends string = string> = { readonly [_ in key]?: 1 }

export type keySetOf<o extends object> = KeySet<Extract<keyof o, string>>

export type _mutable<o, depth extends 1[], maxDepth extends number> =
	depth["length"] extends maxDepth ? o
	: o extends Primitive ? o
	: o extends Fn ? o
	: {
			-readonly [k in keyof o]: _mutable<o[k], [...depth, 1], maxDepth>
		}

export type mutable<o, maxDepth extends number = 1> = _mutable<o, [], maxDepth>

export type entryOf<o> = {
	[k in keyof o]-?: [k, o[k] & ({} | null)]
}[o extends readonly unknown[] ? keyof o & number : keyof o] &
	unknown

export type entriesOf<o extends object> = entryOf<o>[]

export type Entry<
	key extends PropertyKey = PropertyKey,
	value = unknown
> = readonly [key: key, value: value]

export type fromEntries<entries extends readonly Entry[]> = show<{
	[entry in entries[number] as entry[0]]: entry[1]
}>

export type keyOf<o> =
	o extends array ?
		number extends o["length"] ?
			`${number}`
		:	keyof o & `${number}`
	: keyof o extends infer k ?
		k extends string ? k
		: k extends number ? `${k}`
		: never
	:	never

export type unionKeyOf<t> = t extends unknown ? keyof t : never

export type extractKeyed<o extends object, k extends unionKeyOf<o>> = Extract<
	o,
	{ [_ in k]?: unknown }
>

export type extractDefinedKey<o extends object, k extends unionKeyOf<o>> = show<
	extractKeyed<o, k> & { [_ in k]: {} | null }
>

export type requiredKeyOf<o> =
	keyof o extends infer k ?
		k extends keyof o ?
			o extends { [_ in k]-?: o[k] } ?
				k
			:	never
		:	never
	:	never

export type optionalKeyOf<o> = Exclude<keyof o, requiredKeyOf<o>>

export type omit<o, key extends keyof o> = {
	[k in keyof o as k extends key ? never : k]: o[k]
}

export type merge<base, props> =
	base extends unknown ?
		props extends unknown ?
			keyof base & keyof props extends never ?
				show<base & props>
			:	show<omit<base, keyof props & keyof base> & props>
		:	never
	:	never

export type override<
	base,
	merged extends { [k in keyof base]?: unknown }
> = merge<base, merged>

export type propValueOf<o> = o[keyof o]

export type pick<o, key extends keyof o> =
	o extends unknown ?
		{
			[k in keyof o as k extends key ? k : never]: o[k]
		}
	:	// could also consider adding the following to extract literal keys from
		// index signatures as optional. doesn't match existing TS behavior though:
		//  & { [k in keyof o as key extends k ? key : never]?: o[k] }
		never

export type ifEmptyObjectLiteral<t, onTrue = true, onFalse = false> =
	[unknown, t & (null | undefined)] extends [t | null | undefined, never] ?
		onTrue
	:	onFalse

export type invert<t extends Record<PropertyKey, PropertyKey>> = {
	[k in t[keyof t]]: {
		[k2 in keyof t]: t[k2] extends k ? k2 : never
	}[keyof t]
} & unknown

export type _withJsDoc<o, jsDocSource> = {
	[k in keyof jsDocSource]-?: o[k & keyof o]
}

export type withJsDoc<o, jsDocSource> = show<
	keyof o extends keyof jsDocSource ?
		keyof jsDocSource extends keyof o ?
			_withJsDoc<o, jsDocSource>
		:	Pick<_withJsDoc<o, jsDocSource>, keyof o & keyof jsDocSource>
	:	Pick<_withJsDoc<o, jsDocSource>, keyof o & keyof jsDocSource> & {
			[k in Exclude<keyof o, keyof jsDocSource>]: o[k]
		}
>

export type propertyDescriptorsOf<o extends object> = {
	[k in keyof o]: TypedPropertyDescriptor<o[k]>
}

export type keyWithValue<t, constraint> =
	keyof t extends infer k ?
		k extends keyof t ?
			t[k] extends constraint ?
				k
			:	never
		:	never
	:	never
