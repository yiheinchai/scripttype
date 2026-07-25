/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/is-tuple.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ApplyDefaultOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type If<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type IsTupleOptions = {
	/**
	Consider only fixed length arrays as tuples.

	- When set to `true` (default), arrays with rest elements (e.g., `[1, ...number[]]`) are _not_ considered as tuples.
	- When set to `false`, arrays with at least one non-rest element (e.g., `[1, ...number[]]`) are considered as tuples.

	@default true

	@example
	```ts
	import type {IsTuple} from 'type-fest';

	type Example1 = IsTuple<[number, ...number[]], {fixedLengthOnly: true}>;
	//=> false

	type Example2 = IsTuple<[number, ...number[]], {fixedLengthOnly: false}>;
	//=> true
	```
	*/
	fixedLengthOnly?: boolean;
};

export type _IsTuple<
	TArray extends UnknownArray,
	Options extends Required<IsTupleOptions>,
> =
	If<IsAny<TArray>, boolean, If<IsNever<TArray>, false,
		TArray extends unknown // For distributing `TArray`
			? number extends TArray['length']
				? Options['fixedLengthOnly'] extends false
					? If<IsNever<keyof TArray & `${number}`>,
						TArray extends readonly [...any, any] ? true : false, // To handle cases where a non-rest element follows a rest element, e.g., `[...number[], number]`
						true>
					: false
				: true
			: false
	>>;

export type DefaultIsTupleOptions = {
	fixedLengthOnly: true;
};

export type IsTuple<
	TArray extends UnknownArray,
	Options extends IsTupleOptions = {},
> =
	_IsTuple<TArray, ApplyDefaultOptions<IsTupleOptions, DefaultIsTupleOptions, Options>>;
