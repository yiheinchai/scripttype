/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/all-extend.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ApplyDefaultOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CollapseRestElement<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IfNotAnyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Not<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Or<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type AllExtendOptions = {
	/**
	Consider `never` elements to match the target type only if the target type itself is `never` (or `any`).

	- When set to `true` (default), `never` is _not_ treated as a bottom type, instead, it is treated as a type that matches only itself (or `any`).
	- When set to `false`, `never` is treated as a bottom type, and behaves as it normally would.

	@default true

	@example
	```
	import type {AllExtend} from 'type-fest';

	type A = AllExtend<[1, 2, never], number, {strictNever: true}>;
	//=> false

	type B = AllExtend<[1, 2, never], number, {strictNever: false}>;
	//=> true

	type C = AllExtend<[never, never], never, {strictNever: true}>;
	//=> true

	type D = AllExtend<[never, never], never, {strictNever: false}>;
	//=> true

	type E = AllExtend<['a', 'b', never], any, {strictNever: true}>;
	//=> true

	type F = AllExtend<['a', 'b', never], any, {strictNever: false}>;
	//=> true

	type G = AllExtend<[never, 1], never, {strictNever: true}>;
	//=> false

	type H = AllExtend<[never, 1], never, {strictNever: false}>;
	//=> false
	```
	*/
	strictNever?: boolean;
};

export type _AllExtend<TArray extends UnknownArray, Type, Options extends Required<AllExtendOptions>> = IfNotAnyOrNever<TArray, {
	ifNot: TArray extends readonly [infer First, ...infer Rest]
		? IsNever<First> extends true
			? Or<Or<IsNever<Type>, IsAny<Type>>, Not<Options['strictNever']>> extends true
				// If target `Type` is also `never`, or is `any`, or `strictNever` is disabled, recurse further.
				? _AllExtend<Rest, Type, Options>
				: false
			: First extends Type
				? _AllExtend<Rest, Type, Options>
				: false
		: true;
	ifAny: false;
	ifNever: false;
}>;

export type DefaultAllExtendOptions = {
	strictNever: true;
};

export type AllExtend<TArray extends UnknownArray, Type, Options extends AllExtendOptions = {}> =
	_AllExtend<CollapseRestElement<TArray>, Type, ApplyDefaultOptions<AllExtendOptions, DefaultAllExtendOptions, Options>>;
