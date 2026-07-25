/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/variants/object.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ArkEnv<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseMappedPropInner<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Default<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type JsonStructure<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OptionalMappedPropInner<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Prop<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type array<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferred<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type instantiateType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type intersectUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type listable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type merge<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type optionalKeyOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type show<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type type<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type withDefault<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
