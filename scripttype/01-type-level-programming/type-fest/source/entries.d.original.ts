/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/entries.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type _ArrayEntry<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _MapEntry<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _ObjectEntry<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _SetEntry<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ArrayEntries<BaseType extends readonly unknown[]> = Array<_ArrayEntry<BaseType>>;

export type MapEntries<BaseType> = Array<_MapEntry<BaseType>>;

export type ObjectEntries<BaseType> = Array<_ObjectEntry<BaseType>>;

export type SetEntries<BaseType extends Set<unknown>> = Array<_SetEntry<BaseType>>;

export type Entries<BaseType> =
	BaseType extends Map<unknown, unknown> ? MapEntries<BaseType>
		: BaseType extends Set<unknown> ? SetEntries<BaseType>
			: BaseType extends readonly unknown[] ? ArrayEntries<BaseType>
				: BaseType extends object ? ObjectEntries<BaseType>
					: never;
