/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/variants/object.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ArkEnv<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type BaseMappedPropInner<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Default<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Extract<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type JsonStructure<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Key<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type OptionalMappedPropInner<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Prop<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type array<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type inferred<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type instantiateType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type intersectUnion<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type listable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type merge<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type optionalKeyOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type show<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type type<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type withDefault<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface DefaultedTypeProp<
	k extends Key = Key,
	v = unknown,
	defaultValue = v,
	$ = {}
> extends BaseTypeProp<"optional", k, v, $> {
	default: defaultValue
}

export interface BaseTypeProp<
	kind extends Prop.Kind = Prop.Kind,
	k extends Key = Key,
	/** @ts-ignore cast variance */
	out v = unknown,
	$ = {}
> {
	kind: kind
	key: k
	value: instantiateType<v, $>
	meta: ArkEnv.meta
	toJSON: () => JsonStructure
}

export type typeProp<o, k extends keyof o, $, t = o[k] & ({} | null)> =
	t extends Default<infer t, infer defaultValue> ?
		DefaultedTypeProp<k & Key, t, defaultValue, $>
	:	BaseTypeProp<
			k extends optionalKeyOf<o> ? "optional" : "required",
			k & Key,
			t,
			$
		>

export type typePropOf<o, $> =
	keyof o extends infer k ?
		k extends keyof o ?
			typeProp<o, k, $>
		:	never
	:	never

export type BaseMappedTypeProp<k extends Key, v> = merge<
	BaseMappedPropInner,
	{
		key: k
		value: type.cast<v>
	}
>

export type OptionalMappedTypeProp<k extends Key, v> = merge<
	OptionalMappedPropInner,
	{
		key: k
		value: type.cast<v>
		default?: v
	}
>

export type MappedTypeProp<k extends Key = Key, v = unknown> =
	| BaseMappedTypeProp<k, v>
	| OptionalMappedTypeProp<k, v>

export type applyHomomorphicOptionality<t, prop extends MappedTypeProp> =
	prop["kind"] extends string ? prop
	:	prop & {
			kind: prop["key"] extends optionalKeyOf<t> ? "optional" : "required"
		}

export type fromTypeProps<t, props extends array<MappedTypeProp>> = show<
	{
		[prop in props[number] as Extract<
			applyHomomorphicOptionality<t, prop>,
			{ kind: "required" }
		>["key"]]: prop["value"][inferred]
	} & {
		[prop in props[number] as Extract<
			applyHomomorphicOptionality<t, prop>,
			{ kind: "optional"; default?: never }
		>["key"]]?: prop["value"][inferred]
	} & {
		[prop in props[number] as Extract<
			applyHomomorphicOptionality<t, prop>,
			{ kind: "optional"; default: unknown }
		>["key"]]: withDefault<
			prop["value"][inferred],
			prop["default" & keyof prop]
		>
	}
>

export type constructMapped<t, transformed extends listable<MappedTypeProp>> = show<
	intersectUnion<
		fromTypeProps<t, transformed extends array ? transformed : [transformed]>
	>
>
