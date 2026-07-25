/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/exact.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ArrayElement<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsEqual<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsUnknown<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type KeysOfUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Primitive<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Exact<ParameterType, InputType> =
	// Before distributing, check if the two types are equal and if so, return the parameter type immediately
	IsEqual<ParameterType, InputType> extends true ? ParameterType
		// If the parameter is a primitive, return it as is immediately to avoid it being converted to a complex type
		: ParameterType extends Primitive ? ParameterType
			// If the parameter is an unknown, return it as is immediately to avoid it being converted to a complex type
			: IsUnknown<ParameterType> extends true ? unknown
				// If the parameter is a Function, return it as is because this type is not capable of handling function, leave it to TypeScript
				: ParameterType extends Function ? ParameterType
					// Convert union of array to array of union: A[] & B[] => (A & B)[]
					: ParameterType extends unknown[] ? Array<Exact<ArrayElement<ParameterType>, ArrayElement<InputType>>>
						// In TypeScript, Array is a subtype of ReadonlyArray, so always test Array before ReadonlyArray.
						: ParameterType extends readonly unknown[] ? ReadonlyArray<Exact<ArrayElement<ParameterType>, ArrayElement<InputType>>>
							: ExactObject<ParameterType, InputType>;

export type ExactObject<ParameterType, InputType> = {[Key in keyof ParameterType]: Exact<ParameterType[Key], ObjectValue<InputType, Key>>}
	& Record<Exclude<keyof InputType, KeysOfUnion<ParameterType>>, never>;
