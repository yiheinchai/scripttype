/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/set-required-deep.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type IsAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonRecursiveType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Paths<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RequiredDeep<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SetRequired<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SimplifyDeep<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StringToNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnionToTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SetRequiredDeepSinglePath<BaseType, KeyPath> = BaseType extends NonRecursiveType
	? BaseType
	: KeyPath extends `${infer Property}.${infer RestPath}`
		? {
			[Key in keyof BaseType]: Property extends `${Key & (string | number)}`
				? SetRequiredDeepSinglePath<BaseType[Key], RestPath>
				: BaseType[Key];
		}
		: SetRequired<BaseType, (KeyPath | StringToNumber<KeyPath & string>) & keyof BaseType>;

export type SetRequiredDeepHelper<BaseType, KeyPathsTuple extends UnknownArray> =
	KeyPathsTuple extends [infer KeyPath, ...infer RestPaths]
		? SetRequiredDeepHelper<SetRequiredDeepSinglePath<BaseType, KeyPath>, RestPaths>
		: BaseType;

export type SetRequiredDeep<BaseType, KeyPaths extends Paths<BaseType>> = IsAny<KeyPaths> extends true
	? SimplifyDeep<RequiredDeep<BaseType>>
	: SetRequiredDeepHelper<BaseType, UnionToTuple<KeyPaths>>;
