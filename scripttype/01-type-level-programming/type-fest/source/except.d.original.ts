/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/except.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ApplyDefaultOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsEqual<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Filter<KeyType, ExcludeType> = IsEqual<KeyType, ExcludeType> extends true ? never : (KeyType extends ExcludeType ? never : KeyType);

export type ExceptOptions = {
	/**
	Disallow assigning non-specified properties.

	Note that any omitted properties in the resulting type will be present in autocomplete as `undefined`.

	@default false
	*/
	requireExactProps?: boolean;
};

export type _Except<ObjectType, KeysType extends keyof ObjectType, Options extends Required<ExceptOptions>> = {
	[KeyType in keyof ObjectType as Filter<KeyType, KeysType>]: ObjectType[KeyType];
} & (Options['requireExactProps'] extends true
	? Partial<Record<KeysType, never>>
	: {});

export type DefaultExceptOptions = {
	requireExactProps: false;
};

export type Except<ObjectType, KeysType extends keyof ObjectType, Options extends ExceptOptions = {}> =
	_Except<ObjectType, KeysType, ApplyDefaultOptions<ExceptOptions, DefaultExceptOptions, Options>>;
