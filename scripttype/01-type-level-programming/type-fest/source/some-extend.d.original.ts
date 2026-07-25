/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/some-extend.d.ts, for comparison with the ScriptType alongside.
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
export type SomeExtendOptions = {
	/**
	Consider `never` elements to match the target type only if the target type itself is `never` (or `any`).

	- When set to `true` (default), `never` is _not_ treated as a bottom type, instead, it is treated as a type that matches only itself (or `any`).
	- When set to `false`, `never` is treated as a bottom type, and behaves as it normally would.

	@default true

	@example
	```
	import type {SomeExtend} from 'type-fest';

	type A = SomeExtend<[1, 2, never], string, {strictNever: true}>;
	//=> false

	type B = SomeExtend<[1, 2, never], string, {strictNever: false}>;
	//=> true

	type C = SomeExtend<[1, never], never, {strictNever: true}>;
	//=> true

	type D = SomeExtend<[1, never], never, {strictNever: false}>;
	//=> true

	type E = SomeExtend<[never], any, {strictNever: true}>;
	//=> true

	type F = SomeExtend<[never], any, {strictNever: false}>;
	//=> true
	```
	*/
	strictNever?: boolean;
};

export type _SomeExtend<TArray extends UnknownArray, Type, Options extends Required<SomeExtendOptions>> = IfNotAnyOrNever<TArray, {
	ifNot: TArray extends readonly [infer First, ...infer Rest]
		? IsNever<First> extends true
			? Or<Or<IsNever<Type>, IsAny<Type>>, Not<Options['strictNever']>> extends true
				// If target `Type` is also `never`, or is `any`, or `strictNever` is disabled, return `true`.
				? true
				: _SomeExtend<Rest, Type, Options>
			: First extends Type
				? true
				: _SomeExtend<Rest, Type, Options>
		: false;
	ifAny: false;
	ifNever: false;
}>;

export type DefaultSomeExtendOptions = {
	strictNever: true;
};

export type SomeExtend<TArray extends UnknownArray, Type, Options extends SomeExtendOptions = {}> =
	_SomeExtend<CollapseRestElement<TArray>, Type, ApplyDefaultOptions<SomeExtendOptions, DefaultSomeExtendOptions, Options>>;
