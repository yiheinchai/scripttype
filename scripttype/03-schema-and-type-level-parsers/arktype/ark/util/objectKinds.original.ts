/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/util/objectKinds.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DescribeOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Fn<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InstanceType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type domainDescriptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type domainOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type builtinConstructors = typeof builtinConstructors

export type BuiltinObjectKind = keyof builtinConstructors

export type GlobalName = keyof typeof globalThis

export type instantiateConstructors<kind extends BuiltinObjectKind> = {
	// one of these conditions will always be true internally, but they prevent
	// failed resolutions from being inferred as any if TS is configured
	// in such a way that they are unavailable:
	// https://github.com/arktypeio/arktype/issues/1246
	[k in kind]: k extends GlobalName ? InstanceType<(typeof globalThis)[k]>
	: `${k}Constructor` extends GlobalName ?
		InstanceType<(typeof globalThis)[`${k}Constructor`]>
	:	never
}

export type instantiableObjectKind<data extends object> = {
	[kind in keyof builtinConstructors]: data extends (
		InstanceType<builtinConstructors[kind]>
	) ?
		kind
	:	never
}[keyof builtinConstructors]

export type objectKindOf<data extends object> =
	object extends data ? keyof builtinConstructors | undefined
	: data extends Fn ? "Function"
	: instantiableObjectKind<data> extends never ? undefined
	: instantiableObjectKind<data>

export type objectKindDescriptions = typeof objectKindDescriptions

export type describeObject<
	o extends object,
	opts extends DescribeOptions = {}
> =
	objectKindOf<o> extends string ?
		[opts["includeArticles"]] extends [true] ?
			objectKindDescriptions[objectKindOf<o>]
		:	objectKindOf<o>
	: [opts["includeArticles"]] extends [true] ? domainDescriptions["object"]
	: "object"

export type objectKindOrDomainOf<data> =
	data extends object ?
		objectKindOf<data> extends undefined ?
			"object"
		:	objectKindOf<data>
	:	domainOf<data>

export type Constructor<instance = {}> = abstract new (
	...args: never[]
) => instance

export type instanceOf<constructor> =
	constructor extends Constructor<infer instance> ? instance : never

export type normalizedKeyOf<t> =
	keyof t extends infer k ?
		k extends number ?
			`${k}`
		:	k
	:	never
