/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/tagged.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type PropertyKey<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type tag<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type TagContainer<Token> = {
	readonly [tag]: Token;
};

export type Tag<Token extends PropertyKey, TagMetadata> = TagContainer<{[K in Token]: TagMetadata}>;

export type Tagged<Type, TagName extends PropertyKey, TagMetadata = never> = Type & Tag<TagName, TagMetadata>;

export type GetTagMetadata<Type extends Tag<TagName, unknown>, TagName extends PropertyKey> = Type[typeof tag][TagName];

export type RemoveAllTags<T> = T extends Tag<PropertyKey, any>
	? {
		[ThisTag in keyof T[typeof tag]]: T extends Tagged<infer Type, ThisTag, T[typeof tag][ThisTag]>
			? RemoveAllTags<Type>
			: never
	}[keyof T[typeof tag]]
	: T;

export type UnwrapTagged<TaggedType extends Tag<PropertyKey, any>> =
	RemoveAllTags<TaggedType>;

export type Opaque<Type, Token = unknown> = Type & TagContainer<Token>;

export type UnwrapOpaque<OpaqueType extends TagContainer<unknown>> =
	OpaqueType extends Tag<PropertyKey, any>
		? RemoveAllTags<OpaqueType>
		: OpaqueType extends Opaque<infer Type, OpaqueType[typeof tag]>
			? Type
			: OpaqueType;
