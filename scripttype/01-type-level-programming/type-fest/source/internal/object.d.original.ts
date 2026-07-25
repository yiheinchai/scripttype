/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/internal/object.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FilterDefinedKeys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FilterOptionalKeys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type If<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IfNotAnyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsEqual<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type KeysOfUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MapsSetsOrArrays<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Merge<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonRecursiveType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Primitive<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RequiredKeysOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Simplify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StringToNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ToString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type BuildObject<Key extends PropertyKey, Value, CopiedFrom extends object = {}> =
	Key extends keyof CopiedFrom
		? Pick<{[_ in keyof CopiedFrom]: Value}, Key>
		: Key extends `${infer NumberKey extends number}`
			? NumberKey extends keyof CopiedFrom
				? Pick<{[_ in keyof CopiedFrom]: Value}, NumberKey>
				: {[_ in Key]: Value}
			: {[_ in Key]: Value};

export type IsPlainObject<T> =
	IsNever<T> extends true
		? false
		: T extends NonRecursiveType | MapsSetsOrArrays
			? false
			: T extends object
				? true
				: false;

export type ObjectValue<T, K> =
	K extends keyof T
		? T[K]
		: ToString<K> extends keyof T
			? T[ToString<K>]
			: K extends `${infer NumberK extends number}`
				? NumberK extends keyof T
					? T[NumberK]
					: never
				: never;

export type UndefinedToOptional<T extends object> = Simplify<
	{
	// Property is not a union with `undefined`, keep it as-is.
		[Key in keyof Pick<T, FilterDefinedKeys<T>>]: T[Key];
	} & {
	// Property _is_ a union with defined value. Set as optional (via `?`) and remove `undefined` from the union.
		[Key in keyof Pick<T, FilterOptionalKeys<T>>]?: Exclude<T[Key], undefined>;
	}
>;

export type HomomorphicPick<T, Keys extends KeysOfUnion<T>> = {
	[P in keyof T as Extract<P, Keys>]: T[P]
};

export type ValueOfUnion<Union, Key extends KeysOfUnion<Union>> =
	Union extends unknown ? Key extends keyof Union ? Union[Key] : never : never;

export type ReadonlyKeysOfUnion<Union> = Union extends unknown ? keyof {
	[Key in keyof Union as IsEqual<{[K in Key]: Union[Key]}, {readonly [K in Key]: Union[Key]}> extends true ? Key : never]: never
} : never;

export type _ApplyDefaultOptions<
	Options,
	Defaults,
	SpecifiedOptions,
> =
	If<IsAny<SpecifiedOptions>, Defaults,
		If<IsNever<SpecifiedOptions>, Defaults,
			Merge<Defaults, {
				[Key in keyof SpecifiedOptions
				as undefined extends Required<Options>[Key & keyof Options] ? Key : undefined extends SpecifiedOptions[Key] ? never : Key
				]: SpecifiedOptions[Key]
			}>>>;

export type ApplyDefaultOptions<
	Options extends object,
	Defaults extends Simplify<Omit<Required<Options>, RequiredKeysOf<Options>> & Partial<Record<RequiredKeysOf<Options>, never>>>,
	SpecifiedOptions extends Options,
> =
	_ApplyDefaultOptions<Options, Defaults, SpecifiedOptions> extends infer Result extends Required<Options> // `extends Required<Options>` ensures that `ApplyDefaultOptions<SomeOption, ...>` is always assignable to `Required<SomeOption>`
		? Result
		: never;

export type CollapseLiterals<T> = {} extends T
	? T
	: T extends infer U & {}
		? U
		: T;

export type _UnwrapBrand<T, Base> = T extends Primitive
	? T extends infer U & Pick<T, Exclude<keyof T, KeysOfUnion<Base>>>
		? U
		: T
	: T;

export type UnwrapBrand<T> = IfNotAnyOrNever<T, {ifNot: _UnwrapBrand<T, Primitive>}>;

export type NormalizedKeys<Keys extends PropertyKey> =
	| Keys
	| (string extends Keys ? number : never)
	| StringToNumber<Keys & string>
	| ToString<Keys & number>;
