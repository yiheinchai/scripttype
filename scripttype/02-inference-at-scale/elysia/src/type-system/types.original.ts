/**
 * ORIGINAL TypeScript from 02-inference-at-scale/elysia/src/type-system/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ElysiaFormData<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnsafe<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type NonEmptyArray<T> = [T, ...T[]]

export type TForm<T extends TProperties = TProperties> = TUnsafe<
	ElysiaFormData<TObject<T>['static']>
>

export type TransformFunction<T = any, U = any> = (value: T) => U

export type AssertNumericEnum<T extends Record<string, string | number>> = {
	[K in keyof T]: K extends number
		? string
		: K extends `${number}`
			? string
			: K extends string
				? number
				: never
}
