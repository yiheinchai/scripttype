/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/set-non-nullable-deep.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type IsAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonNullableDeep<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonRecursiveType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Paths<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlySet<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SetNonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Simplify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StringToNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnionToTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SetNonNullableDeepSinglePath<BaseType, KeyPath> =
	BaseType extends NonRecursiveType | ReadonlySet<unknown> | ReadonlyMap<unknown, unknown> // Also distributes `BaseType`
		? BaseType
		: KeyPath extends `${infer Property}.${infer RestPath}`
			? {
				[Key in keyof BaseType]: Property extends `${Key & (string | number)}`
					? SetNonNullableDeepSinglePath<BaseType[Key], RestPath>
					: BaseType[Key];
			}
			: Simplify<SetNonNullable<BaseType, (KeyPath | StringToNumber<KeyPath & string>) & keyof BaseType>>;

export type SetNonNullableDeepHelper<BaseType, KeyPathsTuple extends UnknownArray> =
	KeyPathsTuple extends [infer KeyPath, ...infer RestPaths]
		? SetNonNullableDeepHelper<SetNonNullableDeepSinglePath<BaseType, KeyPath>, RestPaths>
		: BaseType;

export type SetNonNullableDeep<BaseType, KeyPaths extends Paths<BaseType>> = IsAny<KeyPaths> extends true
	? NonNullableDeep<BaseType>
	: SetNonNullableDeepHelper<BaseType, UnionToTuple<KeyPaths>>;
