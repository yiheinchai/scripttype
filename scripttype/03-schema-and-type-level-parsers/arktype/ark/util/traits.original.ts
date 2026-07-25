/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/util/traits.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Trait<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type array<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type intersectParameters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type satisfy<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type show<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TraitConstructor<
	params extends array = any[],
	instance extends object = {},
	statics = {},
	abstractMethods extends object = {},
	abstractProps extends object = {},
	abstractStatics extends object = {}
> = statics &
	(new (...args: params) => Trait<{
		abstractMethods: abstractMethods
		abstractProps: abstractProps
		abstractStatics: abstractStatics
	}> &
		instance)

export type TraitCompositionKind = "abstract" | "implementation"

export type CompositionState = {
	validated: array
	remaining: array
	params: array
	kind: TraitCompositionKind
	implemented: object
	abstractMethods: object
	abstractProps: object
	abstractStatics: object
	statics: object
}

export type intersectImplementations<l, r> = {
	[k in keyof l]: k extends keyof r ?
		l[k] extends (...args: infer lArgs) => infer lReturn ?
			r[k] extends (...args: infer rArgs) => infer rReturn ?
				// ensure function intersections aren't handled as overloads which leads to unsafe behavior
				(...args: intersectParameters<lArgs, rArgs>) => lReturn & rReturn
			:	l[k] & r[k]
		:	l[k] & r[k]
	:	l[k]
} & Omit<r, keyof l>

export type finalizeState<s extends CompositionState> = satisfy<
	CompositionState,
	{
		params: s["params"]
		validated: s["validated"]
		remaining: s["remaining"]
		kind: s["kind"]
		implemented: show<s["implemented"]>
		statics: show<Omit<s["statics"], keyof typeof Trait>>
		abstractMethods: show<Omit<s["abstractMethods"], keyof s["implemented"]>>
		abstractProps: show<Omit<s["abstractProps"], keyof s["implemented"]>>
		abstractStatics: show<Omit<s["abstractStatics"], keyof s["statics"]>>
	}
>

export type _compose<s extends CompositionState> =
	s["remaining"] extends (
		readonly [
			TraitConstructor<
				infer params,
				infer instance,
				infer statics,
				infer abstractMethods,
				infer abstractProps,
				infer abstractStatics
			>,
			...infer tail
		]
	) ?
		_compose<{
			validated: [...s["validated"], s["remaining"][0]]
			remaining: tail
			kind: s["kind"]
			params: intersectParameters<s["params"], params>
			implemented: intersectImplementations<
				s["implemented"],
				Omit<instance, keyof abstractMethods | keyof abstractProps>
			>
			statics: intersectImplementations<
				s["statics"],
				Omit<statics, keyof abstractStatics>
			>
			abstractMethods: intersectImplementations<
				s["abstractMethods"],
				abstractMethods
			>
			abstractProps: intersectImplementations<s["abstractProps"], abstractProps>
			abstractStatics: intersectImplementations<
				s["abstractStatics"],
				abstractStatics
			>
		}>
	:	finalizeState<s>

export type composeTraits<
	traits extends array,
	kind extends TraitCompositionKind
> = _compose<{
	validated: []
	remaining: traits
	kind: kind
	params: []
	implemented: {}
	abstractMethods: {}
	abstractProps: {}
	abstractStatics: {}
	statics: {}
}>

export type implementationOf<s extends CompositionState> =
	s["abstractMethods"] &
		({} extends s["abstractProps"] ? {}
		:	{
				construct: (...args: s["params"]) => s["abstractProps"]
			}) &
		({} extends s["abstractStatics"] ? {}
		:	{
				statics: s["abstractStatics"]
			})
