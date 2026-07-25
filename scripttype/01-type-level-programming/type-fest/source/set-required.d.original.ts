/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/set-required.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Except<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HomomorphicPick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type If<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsArrayReadonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OptionalKeysOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Parameters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Readonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Simplify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SetArrayRequired<
	TArray extends UnknownArray,
	Keys,
	Counter extends any[] = [],
	Accumulator extends UnknownArray = [],
> = TArray extends unknown // For distributing `TArray` when it's a union
	? keyof TArray & `${number}` extends never
		// Exit if `TArray` is empty (e.g., []), or
		// `TArray` contains no non-rest elements preceding the rest element (e.g., `[...string[]]` or `[...string[], string]`).
		? [...Accumulator, ...TArray]
		: TArray extends readonly [(infer First)?, ...infer Rest]
			? '0' extends OptionalKeysOf<TArray> // If the first element of `TArray` is optional
				? `${Counter['length']}` extends `${Keys & (string | number)}` // If the current index needs to be required
					? SetArrayRequired<Rest, Keys, [...Counter, any], [...Accumulator, First]>
					// If the current element is optional, but it doesn't need to be required,
					// then we can exit early, since no further elements can now be made required.
					: [...Accumulator, ...TArray]
				: SetArrayRequired<Rest, Keys, [...Counter, any], [...Accumulator, TArray[0]]>
			: never // Should never happen, since `[(infer F)?, ...infer R]` is a top-type for arrays.
	: never;

export type _SetRequired<BaseType, Keys extends keyof BaseType> =
	BaseType extends UnknownArray
		? SetArrayRequired<BaseType, Keys> extends infer ResultantArray
			? If<IsArrayReadonly<BaseType>, Readonly<ResultantArray>, ResultantArray>
			: never
		: Simplify<
		// Pick just the keys that are optional from the base type.
			Except<BaseType, Keys>
		// Pick the keys that should be required from the base type and make them required.
			& Required<HomomorphicPick<BaseType, Keys>>
		>;

export type SetRequired<BaseType, Keys extends keyof BaseType> =
	(BaseType extends (...arguments_: never) => any
		? (...arguments_: Parameters<BaseType>) => ReturnType<BaseType>
		: unknown)
	& _SetRequired<BaseType, Keys>;
