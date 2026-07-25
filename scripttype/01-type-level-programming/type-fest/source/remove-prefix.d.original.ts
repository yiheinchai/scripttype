/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/remove-prefix.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ApplyDefaultOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type If<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IfNotAnyOrNever<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsNever<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsStringLiteral<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Not<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Or<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Required<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type RemovePrefixOptions = {
	/**
	When enabled, instantiations with non-literal prefixes (e.g., `string`, `Uppercase<string>`, `` `on${string}` ``) simply return `string`, since their precise structure cannot be statically determined.

	Note: Disabling this option can produce misleading results that might not reflect the actual runtime behavior.
	For example, ``RemovePrefix<'on-change', `${string}-`, {strict: false}>`` returns `'change'`, but at runtime, prefix could be `'handle-'` (which satisfies `` `${string}-` ``) and removing `'handle-'` from `'on-change'` would not result in `'change'`.

	So, it is recommended to not disable this option unless you are aware of the implications.

	@default true

	@example
	```
	import type {RemovePrefix} from 'type-fest';

	type A = RemovePrefix<'on-change', `${string}-`, {strict: true}>;
	//=> string

	type B = RemovePrefix<'on-change', `${string}-`, {strict: false}>;
	//=> 'change'

	type C = RemovePrefix<'on-change', string, {strict: true}>;
	//=> string

	type D = RemovePrefix<'on-change', string, {strict: false}>;
	//=> 'n-change'

	type E = RemovePrefix<`${string}/${number}`, `${string}/`, {strict: true}>;
	//=> string

	type F = RemovePrefix<`${string}/${number}`, `${string}/`, {strict: false}>;
	//=> `${number}`
	```

	Note: This option has no effect when only the input string type is non-literal. For example, ``RemovePrefix<`on-${string}`, 'on-'>`` will always return `string`.

	@example
	```
	import type {RemovePrefix} from 'type-fest';

	type A = RemovePrefix<`on-${string}`, 'on-', {strict: true}>;
	//=> string

	type B = RemovePrefix<`on-${string}`, 'on-', {strict: false}>;
	//=> string

	type C = RemovePrefix<`id-${number}`, 'id-', {strict: true}>;
	//=> `${number}`

	type D = RemovePrefix<`id-${number}`, 'id-', {strict: false}>;
	//=> `${number}`
	```
	*/
	strict?: boolean;
};

export type _RemovePrefix<S extends string, Prefix extends string, Options extends Required<RemovePrefixOptions>> =
	Prefix extends string // For distributing `Prefix`
		? Or<IsStringLiteral<Prefix>, Not<Options['strict']>> extends true
			? S extends `${Prefix}${infer Rest}`
				? Rest
				: S // Return back `S` when `Prefix` is not present at the start of `S`
			: string // Fallback to `string` when `Prefix` is non-literal and `strict` is enabled
		: never;

export type DefaultRemovePrefixOptions = {
	strict: true;
};

export type RemovePrefix<S extends string, Prefix extends string, Options extends RemovePrefixOptions = {}> =
	IfNotAnyOrNever<S, {
		ifNot: If<
			IsNever<Prefix>,
			S,
			_RemovePrefix<S, Prefix, ApplyDefaultOptions<RemovePrefixOptions, DefaultRemovePrefixOptions, Options>>
		>;
	}>;
