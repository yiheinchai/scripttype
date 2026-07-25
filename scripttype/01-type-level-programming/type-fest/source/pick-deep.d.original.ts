/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/pick-deep.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BuildObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonRecursiveType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Paths<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Simplify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SimplifyDeep<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TupleOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnionToIntersection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PickDeepArray<ArrayType extends UnknownArray, P extends string | number> =
	// Handle paths that are `${number}.${string}`
	P extends `${infer ArrayIndex extends number}.${infer SubPath}`
		// When `ArrayIndex` is equal to `number`
		? number extends ArrayIndex
			? ArrayType extends unknown[]
				? Array<InternalPickDeep<NonNullable<ArrayType[number]>, SubPath>>
				: ArrayType extends readonly unknown[]
					? ReadonlyArray<InternalPickDeep<NonNullable<ArrayType[number]>, SubPath>>
					: never
			// When `ArrayIndex` is a number literal
			: ArrayType extends unknown[]
				? [...TupleOf<ArrayIndex>, InternalPickDeep<NonNullable<ArrayType[ArrayIndex]>, SubPath>]
				: ArrayType extends readonly unknown[]
					? readonly [...TupleOf<ArrayIndex>, InternalPickDeep<NonNullable<ArrayType[ArrayIndex]>, SubPath>]
					: never
		// When the path is equal to `number`
		: P extends `${infer ArrayIndex extends number}`
			// When `ArrayIndex` is `number`
			? number extends ArrayIndex
				? ArrayType
				// When `ArrayIndex` is a number literal
				: ArrayType extends unknown[]
					? [...TupleOf<ArrayIndex>, ArrayType[ArrayIndex]]
					: ArrayType extends readonly unknown[]
						? readonly [...TupleOf<ArrayIndex>, ArrayType[ArrayIndex]]
						: never
			: never;

export type PickDeepObject<RecordType extends object, P extends string | number> =
	P extends `${infer RecordKeyInPath}.${infer SubPath}`
		? ObjectValue<RecordType, RecordKeyInPath> extends infer ObjectV
			? IsNever<ObjectV> extends false
				? BuildObject<RecordKeyInPath, InternalPickDeep<NonNullable<ObjectV>, SubPath>, RecordType>
				: never
			: never
		: ObjectValue<RecordType, P> extends infer ObjectV
			? IsNever<ObjectV> extends false
				? BuildObject<P, ObjectV, RecordType>
				: never
			: never;

export type InternalPickDeep<T, Path extends string | number> =
	T extends NonRecursiveType
		? never
		: T extends UnknownArray ? PickDeepArray<T, Path>
			: T extends object ? Simplify<PickDeepObject<T, Path>>
				: never;

export type PickDeep<T, PathUnion extends Paths<T>> =
	T extends NonRecursiveType
		? never
		: T extends UnknownArray
			? UnionToIntersection<{
				[P in PathUnion]: InternalPickDeep<T, P>;
			}[PathUnion]
			>
			: T extends object
				? SimplifyDeep<UnionToIntersection<{
					[P in PathUnion]: InternalPickDeep<T, P>;
				}[PathUnion]>>
				: never;
