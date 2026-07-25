/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/internal/type.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type IsAny<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsNever<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Primitive<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
