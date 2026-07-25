/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/require-all-or-none.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type If<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IfNotAnyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RequireNone<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type RequireAll<ObjectType, KeysType extends keyof ObjectType> = Required<Pick<ObjectType, KeysType>>;

export type _RequireAllOrNone<ObjectType, KeysType extends keyof ObjectType> = (
	| RequireAll<ObjectType, KeysType>
	| RequireNone<KeysType>
) & Omit<ObjectType, KeysType>;

export type RequireAllOrNone<ObjectType, KeysType extends keyof ObjectType = keyof ObjectType> =
	IfNotAnyOrNever<ObjectType, {
		ifNot: If<IsNever<KeysType>,
			ObjectType,
			_RequireAllOrNone<ObjectType, If<IsAny<KeysType>, keyof ObjectType, KeysType>>>;
	}>;
