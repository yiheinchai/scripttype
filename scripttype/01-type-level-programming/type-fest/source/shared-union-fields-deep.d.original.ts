/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/shared-union-fields-deep.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ApplyDefaultOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsArrayReadonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonRecursiveType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlySet<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SetArrayAccess<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StaticPartOfArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TupleLength<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnionMax<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnionMin<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type VariablePartOfArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SharedUnionFieldsDeepOptions = {
	/**
	When set to true, this option impacts each element within arrays or tuples. If all union values are arrays or tuples, it constructs an array of the shortest possible length, ensuring every element exists in the union array.

	@default false
 	*/
	recurseIntoArrays?: boolean;
};

export type DefaultSharedUnionFieldsDeepOptions = {
	recurseIntoArrays: false;
};

export type InternalSharedArrayUnionFieldsDeep<
	Union extends UnknownArray,
	Options extends Required<SharedUnionFieldsDeepOptions>,
	ResultTuple extends UnknownArray = [],
> =
	// We should build a minimum possible length tuple where each element in the tuple exists in the union tuple.
	IsNever<TupleLength<Union>> extends true
		// Rule 1: If all the arrays in the union have non-fixed lengths,
		// like `Array<string> | [number, ...string[]]`
		// we should build a tuple that is [the_fixed_parts_of_union, ...the_rest_of_union[]].
		// For example: `InternalSharedArrayUnionFieldsDeep<Array<string> | [number, ...string[]]>`
		// => `[string | number, ...string[]]`.
		? ResultTuple['length'] extends UnionMax<StaticPartOfArray<Union>['length']>
			? [
				// The fixed-length part of the tuple.
				...ResultTuple,
				// The rest of the union.
				// Due to `ResultTuple` is the maximum possible fixed-length part of the tuple,
				// so we can use `StaticPartOfArray` to get the rest of the union.
				...Array<
					SharedUnionFieldsDeep<VariablePartOfArray<Union>[number], Options>
				>,
			]
			// Build the fixed-length tuple recursively.
			: InternalSharedArrayUnionFieldsDeep<
				Union, Options,
				[...ResultTuple, SharedUnionFieldsDeep<Union[ResultTuple['length']], Options>]
			>
		// Rule 2: If at least one of the arrays in the union have fixed lengths,
		// like `Array<string> | [number, string]`,
		// we should build a tuple of the smallest possible length to ensure any
		// item in the result tuple exists in the union tuple.
		// For example: `InternalSharedArrayUnionFieldsDeep<Array<string> | [number, string]>`
		// => `[string | number, string]`.
		: ResultTuple['length'] extends UnionMin<TupleLength<Union>>
			? ResultTuple
			// As above, build tuple recursively.
			: InternalSharedArrayUnionFieldsDeep<
				Union, Options,
				[...ResultTuple, SharedUnionFieldsDeep<Union[ResultTuple['length']], Options>]
			>;

export type SharedArrayUnionFieldsDeep<Union extends UnknownArray, Options extends Required<SharedUnionFieldsDeepOptions>> =
	// Restore the readonly modifier of the array.
	SetArrayAccess<
		InternalSharedArrayUnionFieldsDeep<Union, Options>,
		IsArrayReadonly<Union>
	>;

export type SharedObjectUnionFieldsDeep<Union, Options extends Required<SharedUnionFieldsDeepOptions>> =
	// `keyof Union` can extract the same key in union type, if there is no same key, return never.
	keyof Union extends infer Keys
		? IsNever<Keys> extends false
			? {
				[Key in keyof Union]:
				Union[Key] extends NonRecursiveType
					? Union[Key]
					// Remove `undefined` from the union to support optional
					// fields, then recover `undefined` if union was already undefined.
					: SharedUnionFieldsDeep<Exclude<Union[Key], undefined>, Options> | (
						undefined extends Required<Union>[Key] ? undefined : never
					)
			}
			: {}
		: Union;

export type SharedUnionFieldsDeep<Union, Options extends SharedUnionFieldsDeepOptions = {}> =
	ApplyDefaultOptions<SharedUnionFieldsDeepOptions, DefaultSharedUnionFieldsDeepOptions, Options> extends infer OptionsWithDefaults extends Required<SharedUnionFieldsDeepOptions>
	// `Union extends` will convert `Union`
	// to a [distributive conditional type](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types).
	// But this is not what we want, so we need to wrap `Union` with `[]` to prevent it.
		? [Union] extends [NonRecursiveType | ReadonlyMap<unknown, unknown> | ReadonlySet<unknown>]
			? Union
			: [Union] extends [UnknownArray]
				? OptionsWithDefaults['recurseIntoArrays'] extends true
					? SetArrayAccess<SharedArrayUnionFieldsDeep<Union, OptionsWithDefaults>, IsArrayReadonly<Union>>
					: Union
				: [Union] extends [object]
					? SharedObjectUnionFieldsDeep<Union, OptionsWithDefaults>
					: Union
		: never;
