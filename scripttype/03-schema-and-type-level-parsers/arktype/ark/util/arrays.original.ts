/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/util/arrays.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Readonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type anyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type conform<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type isDisjoint<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type parseNonNegativeInteger<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type DuplicateData<val = unknown> = { element: val; indices: number[] }

export type array<t = unknown> = readonly t[]

export type join<
	segments extends array<string>,
	delimiter extends string,
	result extends string = ""
> =
	segments extends (
		readonly [infer head extends string, ...infer tail extends string[]]
	) ?
		join<
			tail,
			delimiter,
			result extends "" ? head : `${result}${delimiter}${head}`
		>
	:	result

export type pathToString<
	segments extends string[],
	delimiter extends string = "/"
> = segments extends [] ? "/" : join<segments, delimiter>

export type filter<t extends array, constraint, result extends unknown[] = []> =
	t extends readonly [infer head, ...infer tail] ?
		filter<
			tail,
			constraint,
			head extends constraint ? [...result, head] : result
		>
	:	result

export type _multiply<
		base extends array,
		result extends array,
		count extends number,
		i extends 1[]
	> =
		i["length"] extends count ? result
		:	_multiply<base, [...result, ...base], count, [...i, 1]>

export type multiply<t extends array, count extends number> = _multiply<
		t,
		[],
		count,
		[]
	>

export type nextSegments<segments extends 1[][]> =
		segments extends [unknown, ...infer nextSegments extends 1[][]] ?
			nextSegments
		:	never

export type buildFromSegments<
		element,
		result extends 1[],
		segments extends 1[][],
		count extends number,
		next extends 1[] = [...result, ...segments[0]]
	> =
		// next is just right
		next["length"] extends count ? { [i in keyof next]: element }
		: `${count}` extends keyof next ?
			// next is too long
			buildFromSegments<element, result, nextSegments<segments>, count>
		:	// next is too short
			buildFromSegments<element, next, nextSegments<segments>, count>

export type two = [1, 1]

export type three = [...two, ...two]

export type four = [...three, ...three]

export type five = [...four, ...four]

export type six = [...five, ...five]

export type seven = [...six, ...six]

export type eight = [...seven, ...seven]

export type nine = [...eight, ...eight]

export type ten = [...nine, ...nine]

export type eleven = [...ten, ...ten]

export type twelve = [...eleven, ...eleven]

export type thirteen = [...twelve, ...twelve]

export type fourteen = [...thirteen, ...thirteen]

export type one = [1]

export type zero = []

export type exponentials = [
	fourteen,
	thirteen,
	twelve,
	eleven,
	ten,
	nine,
	eight,
	seven,
	six,
	five,
	four,
	three,
	two,
	one,
	zero
]

export type repeat<element, count extends number> = buildFromSegments<
		element,
		[],
		exponentials.max<count>,
		count
	>

export type minLength<element, minLength extends number> = readonly [
		...multiply<[element], minLength>,
		...element[]
	]

export type listable<t> = t | readonly t[]

export type flattenListable<t> = t extends array<infer element> ? element : t

export type longerThan<t extends array, n extends number> =
	`${n}` extends keyof t ? true : false

export type CollapsingList<t = unknown> =
	| readonly []
	| t
	| readonly [t, t, ...t[]]

export type headOf<t extends array> = t[0]

export type tailOf<t extends array> =
	t extends readonly [unknown, ...infer tail] ? tail : never

export type lastIndexOf<t extends array> = tailOf<t>["length"]

export type lastOf<t extends array> = t[lastIndexOf<t>]

export type initOf<t extends array> =
	t extends readonly [...infer init, unknown] ? init : never

export type numericStringKeyOf<t extends array> = Extract<keyof t, `${number}`>

export type arrayIndexOf<a extends array> =
	keyof a extends infer k ? parseNonNegativeInteger<k & string> : never

export type liftArray<t> =
	t extends array ?
		[t] extends [anyOrNever] ?
			t[]
		:	t
	:	t[]

export type appendableValue<to extends array | undefined> =
	to extends array<infer element> ?
		element extends array ?
			array<element>
		:	listable<element>
	:	never

export type groupableKeyOf<o> =
	keyof o extends infer k ?
		k extends keyof o ?
			o[k] extends PropertyKey ?
				k
			:	never
		:	never
	:	never

export type groupBy<element, discriminant extends groupableKeyOf<element>> = {
	[k in element[discriminant] & PropertyKey]?: (element extends unknown ?
		isDisjoint<element[discriminant], k> extends true ?
			never
		:	element
	:	never)[]
} & unknown

export type validateExhaustiveKeys<
	keys extends readonly PropertyKey[],
	expectedKey extends PropertyKey
> =
	keys extends readonly [infer head, ...infer tail extends PropertyKey[]] ?
		readonly [
			conform<head, expectedKey>,
			...validateExhaustiveKeys<tail, Exclude<expectedKey, head>>
		]
	: [expectedKey] extends [never] ? []
	: [expectedKey]

export type labelElement<element, labels extends readonly unknown[]> =
	labels extends readonly [unknown] ? { [K in keyof labels]: element }
	: labels extends readonly [...infer head, unknown] ?
		labelElement<element, head>
	:	[_: element]

export type labelOptionalElement<element, label extends readonly unknown[]> =
	label extends readonly [unknown] ? { [K in keyof label]?: element }
	: label extends readonly [...infer head, unknown] ?
		labelOptionalElement<element, head>
	:	[_?: element]

export type applyRestElementLabels<
	t extends readonly unknown[],
	labels extends readonly unknown[]
> =
	t extends readonly [] ? []
	: labels extends readonly [unknown, ...infer tail] ?
		[...labelOptionalElement<t[0], labels>, ...applyRestElementLabels<t, tail>]
	:	t

export type applyOptionalElementLabels<
	t extends readonly unknown[],
	labels extends readonly unknown[]
> =
	labels extends readonly [unknown, ...infer labelsTail] ?
		t extends readonly [infer head, ...infer tail] ?
			[
				...labelOptionalElement<head, labels>,
				...applyOptionalElementLabels<tail, labelsTail>
			]
		:	applyRestElementLabels<t, labels>
	:	t

export type applyElementLabels<
	t extends readonly unknown[],
	labels extends readonly unknown[]
> =
	labels extends [unknown, ...infer labelsTail] ?
		t extends readonly [infer head, ...infer tail] ?
			readonly [
				...labelElement<head, labels>,
				...applyElementLabels<tail, labelsTail>
			]
		:	applyOptionalElementLabels<Required<t>, labels>
	:	t

export type _setIndex<
	arr extends readonly unknown[],
	i extends number,
	to extends arr[number],
	result extends arr[number][]
> =
	arr extends readonly [infer head, ...infer tail] ?
		_setIndex<tail, i, to, [...result, result["length"] extends i ? to : head]>
	:	result

export type setIndex<
	arr extends readonly unknown[],
	i extends number,
	to extends arr[number]
> =
	// preserve mutability of original array
	arr extends arr[number][] ? _setIndex<arr, i, to, []>
	:	Readonly<_setIndex<arr, i, to, []>>

export type _max<n extends number, filtered extends unknown[]> =
		`${n}` extends keyof filtered[0] ? _max<n, tailOf<filtered>> : filtered

export type max<n extends number> = _max<n, exponentials>
