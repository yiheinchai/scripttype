/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/set-parameter-type.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type IsUnknown<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StaticPartOfArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type VariablePartOfArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type MergeObjectToArray<TArray extends UnknownArray, TObject, TArrayCopy extends UnknownArray = TArray> =
	// If `TObject` is an array like `[0, 1, 2]`
	TObject extends UnknownArray
		// If `TObject` is a variable length array, we should use `TObject`'s type as the result type.
		? number extends TObject['length']
			? TObject
			: {
				[K in keyof TArray]:
				number extends K
					? VariablePartOfArray<TArray>[number]
					: K extends keyof TObject ? TObject[K] : TArray[K]
			}
		: TObject extends object
			// If `TObject` is an object with number keys like `{0: string, 1: number}`
			? {
				[K in keyof TArray]:
				K extends `${infer NumberK extends number}`
					? NumberK extends keyof TObject ? TObject[NumberK] : TArray[K]
					: number extends K
					// If array key `K` is `number`, means it's a rest parameter, we should set the rest parameter type to corresponding type in `TObject`.
					// example: `MergeObjectToArray<[string, ...boolean[]], {1: number}>` => `[string, ...number[]]`
						? StaticPartOfArray<TArrayCopy>['length'] extends keyof TObject
							? TObject[StaticPartOfArray<TArrayCopy>['length']]
							: TArray[K]
						: never
			} : never;

export type SetParameterType<Function_ extends (...arguments_: any[]) => unknown, P extends Record<number, unknown>> =
	// Just using `Parameters<Fn>` isn't ideal because it doesn't handle the `this` fake parameter.
	Function_ extends (this: infer ThisArgument, ...arguments_: infer Arguments) => unknown
		? (
			// If a function did not specify the `this` fake parameter, it will be inferred to `unknown`.
			// We want to detect this situation just to display a friendlier type upon hovering on an IntelliSense-powered IDE.
			IsUnknown<ThisArgument> extends true
				? (...arguments_: MergeObjectToArray<Arguments, P>) => ReturnType<Function_>
				: (this: ThisArgument, ...arguments_: MergeObjectToArray<Arguments, P>) => ReturnType<Function_>
		)
		: Function_;
