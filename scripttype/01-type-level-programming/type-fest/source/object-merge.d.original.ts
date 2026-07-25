/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/object-merge.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type If<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IfNotAnyOrNever<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsExactOptionalPropertyTypesEnabled<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsNever<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsOptionalKeyOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MapsSetsOrArrays<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type NormalizedKeys<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type OmitIndexSignature<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PickIndexSignature<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PropertyKey<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Required<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RequiredKeysOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Simplify<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type _ObjectMerge<
	First extends object,
	Second extends object,
	NormalizedFirstLiteralKeys extends PropertyKey,
	NormalizedSecondLiteralKeys extends PropertyKey,
	NormalizedFirst extends object,
	NormalizedSecond extends object,
> = Simplify<{
	// Map over literal keys of `Second`, except those that are optional and also present in `First`.
	-readonly [P in keyof Second as P extends NormalizedSecondLiteralKeys
		? P extends NormalizedFirstLiteralKeys
			? If<IsOptionalKeyOf<Second, P>, never, P>
			: P
		: never]:
			| Second[P]
			| (P extends NormalizedKeys<keyof PickIndexSignature<First>>
				? If<IsOptionalKeyOf<Second, P>, First[NormalizedKeys<P> & keyof First], never>
				: never)
} & {
	// Map over literal keys of `First`, except those that are not present in `Second`.
	-readonly [P in keyof First as P extends NormalizedFirstLiteralKeys
		? P extends NormalizedSecondLiteralKeys
			? never
			: P
		: never]:
			| First[P]
				// If there's a matching index signature in `Second`, then add the type for it as well,
				// for example, in `ObjectMerge<{a: string}, {[x: string]: number}>`, `a` is of type `string | number`.
			| (P extends NormalizedKeys<keyof Second>
				? Second[NormalizedKeys<P> & keyof Second]
				: never);
} & {
	// Map over non-literal keys of `Second`.
	-readonly [P in keyof Second as P extends NormalizedSecondLiteralKeys ? never : P]:
		| Second[P]
			// If there's a matching key in `First`, then add the type for it as well,
			// for example, in `ObjectMerge<{a: number}, {[x: string]: string}>`,
			// the resulting type is `{[x: string]: number | string; a: number | string}`.
			// But, exclude keys from `First` that would surely get overwritten,
			// for example, in `ObjectMerge<{a: number}, {[x: string]: string; a: string}>`,
			// `a` from `First` would get overwritten by `a` from `Second`, so don't add type for it.
		| (NormalizedKeys<P> & Exclude<keyof First, NormalizedKeys<RequiredKeysOf<OmitIndexSignature<Second>>>> extends infer NonOverwrittenKeysOfFirst
			? If<IsNever<NonOverwrittenKeysOfFirst>, // This check is required because indexing with `never` doesn't always yield `never`, for example, `{[x: string]: number}[never]` results in `number`.
				never,
				NormalizedFirst[NonOverwrittenKeysOfFirst & keyof NormalizedFirst]>
			: never); // Should never happen
} & {
	// Map over non-literal keys of `First`.
	-readonly [P in keyof First as P extends NormalizedFirstLiteralKeys ? never : P]:
		| First[P]
		| If<IsNever<NormalizedKeys<P> & keyof Second>, // This check is required because indexing with `never` doesn't always yield `never`, for example, `{[x: string]: number}[never]` results in `number`.
			never,
			NormalizedSecond[NormalizedKeys<P> & keyof NormalizedSecond]>;
} & {
	// Handle optional keys of `Second` that are also present in `First`.
	// Map over `First` instead of `Second` because the modifier is in accordance with `First`.
	-readonly [P in keyof First as P extends NormalizedFirstLiteralKeys
		? P extends NormalizedSecondLiteralKeys
			? If<IsOptionalKeyOf<Second, NormalizedKeys<P> & keyof Second>, P, never>
			: never
		: never]:
			| First[P]
			| NormalizedSecond[NormalizedKeys<P> & keyof NormalizedSecond]
}>;

export type NormalizedLiteralKeys<Type> = Type extends unknown // For distributing `Type`
	? NormalizedKeys<keyof OmitIndexSignature<Type>>
	: never;

export type ObjectMerge<First extends object, Second extends object> =
	IfNotAnyOrNever<First, {
		ifNot: IfNotAnyOrNever<Second, {
			ifNot: First extends unknown // For distributing `First`
				? Second extends unknown // For distributing `Second`
					? First extends MapsSetsOrArrays
						? unknown
						: Second extends MapsSetsOrArrays
							? unknown
							: _ObjectMerge<
								First,
								Second,
								NormalizedLiteralKeys<First>,
								NormalizedLiteralKeys<Second>,
								IsExactOptionalPropertyTypesEnabled extends true ? Required<First> : First,
								IsExactOptionalPropertyTypesEnabled extends true ? Required<Second> : Second
							>
					: never // Should never happen
				: never; // Should never happen
		}>;
		ifAny: First & Second;
	}>;
