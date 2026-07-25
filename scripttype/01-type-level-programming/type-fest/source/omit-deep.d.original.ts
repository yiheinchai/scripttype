/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/omit-deep.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ArraySplice<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExactKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsArrayReadonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsEqual<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LiteralUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonRecursiveType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Paths<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SetArrayAccess<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SimplifyDeep<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ToString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnionToTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type OmitDeepArrayWithOnePath<ArrayType extends UnknownArray, P extends string | number> =
	// Handle paths that are `${number}.${string}`
	P extends `${infer ArrayIndex extends number}.${infer SubPath}`
		// If `ArrayIndex` is equal to `number`
		? number extends ArrayIndex
			? Array<OmitDeepWithOnePath<NonNullable<ArrayType[number]>, SubPath>>
			// If `ArrayIndex` is a number literal
			: ArraySplice<ArrayType, ArrayIndex, 1, [OmitDeepWithOnePath<NonNullable<ArrayType[ArrayIndex]>, SubPath>]>
		// If the path is equal to `number`
		: P extends `${infer ArrayIndex extends number}`
			// If `ArrayIndex` is `number`
			? number extends ArrayIndex
				? []
				// If `ArrayIndex` is a number literal
				: ArraySplice<ArrayType, ArrayIndex, 1, [unknown]>
			: ArrayType;

export type OmitDeepObjectWithOnePath<ObjectT extends object, P extends string | number> =
	P extends `${infer RecordKeyInPath}.${infer SubPath}`
		? {
			[Key in keyof ObjectT]:
			IsEqual<RecordKeyInPath, ToString<Key>> extends true
				? ExactKey<ObjectT, Key> extends infer RealKey
					? RealKey extends keyof ObjectT
						? OmitDeepWithOnePath<ObjectT[RealKey], SubPath>
						: ObjectT[Key]
					: ObjectT[Key]
				: ObjectT[Key]
		}
		: ExactKey<ObjectT, P> extends infer Key
			? IsNever<Key> extends true
				? ObjectT
				: Key extends PropertyKey
					? Omit<ObjectT, Key>
					: ObjectT
			: ObjectT;

export type OmitDeepWithOnePath<T, Path extends string | number> =
	T extends NonRecursiveType
		? T
		: T extends UnknownArray ? SetArrayAccess<OmitDeepArrayWithOnePath<T, Path>, IsArrayReadonly<T>>
			: T extends object ? OmitDeepObjectWithOnePath<T, Path>
				: T;

export type OmitDeepHelper<T, PathTuple extends UnknownArray> =
	PathTuple extends [infer Path, ...infer RestPaths]
		? OmitDeepHelper<OmitDeepWithOnePath<T, Path & (string | number)>, RestPaths>
		: T;

export type OmitDeep<T, PathUnion extends LiteralUnion<Paths<T>, string>> =
	SimplifyDeep<
		OmitDeepHelper<T, UnionToTuple<PathUnion>>,
		UnknownArray>;
