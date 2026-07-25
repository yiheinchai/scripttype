/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/util/flatMorph.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Entry<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type array<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type conform<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type intersectUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type listable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type show<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type GroupedEntry = readonly [key: { group: Key }, value: unknown]

export type GroupableEntry = Entry<Key> | Entry<number> | GroupedEntry

export type fromGroupableEntries<entries extends readonly GroupableEntry[]> = {
	[entry in entries[number] as entry extends GroupedEntry ? entry[0]["group"]
	:	conform<entry[0], PropertyKey>]: entry extends GroupedEntry ? entry[1][]
	:	entry[1]
}

export type objectFromListableEntries<transformed extends readonly GroupableEntry[]> =
	show<intersectUnion<fromGroupableEntries<transformed>>>

export type _arrayFromListableEntries<
	transformed extends Entry,
	result extends unknown[]
> =
	[transformed] extends [never] ? result
	: Extract<transformed, Entry<result["length"]>> extends (
		infer next extends Entry
	) ?
		Exclude<transformed, next> extends infer remaining extends Entry ?
			[transformed] extends [remaining] ?
				[...result, ...transformed[1][]]
			:	_arrayFromListableEntries<remaining, [...result, next[1]]>
		:	never
	:	[...result, ...transformed[1][]]

export type arrayFromListableEntries<transformed extends Entry> =
	Entry<number, never> extends transformed ? transformed[1][]
	:	_arrayFromListableEntries<transformed, []>

export type extractEntrySets<e extends listable<GroupableEntry>> =
	e extends readonly GroupableEntry[] ? e : [e]

export type extractEntries<e extends listable<Entry>> =
	e extends readonly Entry[] ? e[number] : e

export type entryArgsWithIndex<o> = {
	[k in keyof o]-?: [k: k, v: Exclude<o[k], undefined>, i: number]
}[keyof o]

export type numericArrayEntry<a extends array> =
	number extends a["length"] ? [number, a[number]]
	:	{
			[i in keyof a]: i extends `${infer n extends number}` ? [n, a[i]] : never
		}[number]

export type ListableEntry = listable<GroupableEntry>

export type fromMappedEntries<transformed extends ListableEntry> =
	[transformed] extends [listable<Entry<number>>] ?
		arrayFromListableEntries<extractEntries<transformed>>
	:	objectFromListableEntries<extractEntrySets<transformed>>
