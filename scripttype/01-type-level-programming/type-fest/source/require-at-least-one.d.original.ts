/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/require-at-least-one.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Except<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type If<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IfNotAnyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _RequireAtLeastOne<
	ObjectType,
	KeysType extends keyof ObjectType,
> = {
	// For each `Key` in `KeysType` make a mapped type:
	[Key in KeysType]-?: Required<Pick<ObjectType, Key>> // 1. Make `Key`'s type required
		& Partial<Pick<ObjectType, Exclude<KeysType, Key>>>; // 2. Make all other keys in `KeysType` optional
}[KeysType]
& Except<ObjectType, KeysType>;

export type RequireAtLeastOne<
	ObjectType,
	KeysType extends keyof ObjectType = keyof ObjectType,
> =
	IfNotAnyOrNever<ObjectType, {
		ifNot: If<IsNever<KeysType>,
			never,
			_RequireAtLeastOne<ObjectType, If<IsAny<KeysType>, keyof ObjectType, KeysType>>>;
	}>;
