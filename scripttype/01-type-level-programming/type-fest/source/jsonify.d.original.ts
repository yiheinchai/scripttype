/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/jsonify.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type EmptyObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsUnknown<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type JsonPrimitive<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type JsonValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NegativeInfinity<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PositiveInfinity<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypedArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UndefinedToOptional<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type NeverToNull<T> = IsNever<T> extends true ? null : T;

export type UndefinedToNull<T> = T extends undefined ? null : T;

export type NotJsonable = ((...arguments_: any[]) => any) | undefined | symbol;

export type JsonifyObject<T extends object> = {
	[Key in keyof T as T[Key] extends NotJsonable ? never : Key]: Jsonify<T[Key]>;
};

export type Jsonify<T> = IsAny<T> extends true
	? any
	: T extends PositiveInfinity | NegativeInfinity
		? null
		: T extends JsonPrimitive
			? T
			// Any object with toJSON is special case
			: T extends {toJSON(): infer J}
				? (() => J) extends () => JsonValue // Is J assignable to JsonValue?
					? J // Then T is Jsonable and its Jsonable value is J
					: Jsonify<J> // Maybe if we look a level deeper we'll find a JsonValue
				// Instanced primitives are objects
				: T extends Number
					? number
					: T extends String
						? string
						: T extends Boolean
							? boolean
							: T extends Map<any, any> | Set<any>
								? EmptyObject
								: T extends TypedArray
									? Record<string, number>
									: T extends NotJsonable
										? never // Non-JSONable type union was found not empty
										: T extends UnknownArray
											? JsonifyList<T>
											: T extends object
												? JsonifyObject<UndefinedToOptional<T>> // JsonifyObject recursive call for its children
												: IsUnknown<T> extends true
													? JsonValue
													: never;

export type JsonifyList<T extends UnknownArray> = T extends readonly []
	? []
	: T extends readonly [infer F, ...infer R]
		? [F, ...R] extends T // With TS 5.8.3, if `string[] & ['foo']`, `R` is `unknown[]` here, making the inferred types not equal to the original one
			? [NeverToNull<Jsonify<F>>, ...JsonifyList<R>]
			: [NeverToNull<Jsonify<F>>]
		: IsUnknown<T[number]> extends true
			? JsonValue[]
			: Array<T[number] extends NotJsonable ? null : Jsonify<UndefinedToNull<T[number]>>>;
