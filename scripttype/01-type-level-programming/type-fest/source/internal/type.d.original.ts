/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/internal/type.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type IsAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Primitive<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type IsBothExtends<BaseType, FirstType, SecondType> = FirstType extends BaseType
	? SecondType extends BaseType
		? true
		: false
	: false;

export type HasMultipleCallSignatures<T extends (...arguments_: any[]) => unknown> =
	T extends {(...arguments_: infer A): unknown; (...arguments_: infer B): unknown}
		? B extends A
			? A extends B
				? false
				: true
			: true
		: false;

export type IsNotFalse<T extends boolean> = [T] extends [false] ? false : true;

export type IsPrimitive<T> = [T] extends [Primitive] ? true : false;

export type Not<A extends boolean> = A extends true
	? false
	: A extends false
		? true
		: never;

export type IfNotAnyOrNever<T, Cases extends {ifNot: unknown; ifAny?: unknown; ifNever?: unknown}> =
	IsAny<T> extends true
		? 'ifAny' extends keyof Cases
			? Cases['ifAny']
			: any
		: IsNever<T> extends true
			? 'ifNever' extends keyof Cases
				? Cases['ifNever']
				: never
			: Cases['ifNot'];

export type IsAnyOrNever<T> = IsNotFalse<IsAny<T> | IsNever<T>>;
