/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/extends-strict.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type And<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ApplyDefaultOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsAny<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsNever<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsUnknown<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Or<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type OrAll<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Required<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type ExtendsStrictOptions = {
	/**
	Whether to distribute over unions.

	@default false

	@example
	```
	import type {ExtendsStrict} from 'type-fest';

	type T1 = ExtendsStrict<string | number, string, {distributiveUnions: true}>;
	//=> boolean

	type T2 = ExtendsStrict<string | number, string, {distributiveUnions: false}>;
	//=> false
	```
	*/
	distributiveUnions?: boolean;

	/**
	Whether `never` extends every other type.

	When enabled, `never` is not treated as a bottom type and only extends itself (or `any` / `unknown`).

	@default true

	@example
	```
	import type {ExtendsStrict} from 'type-fest';

	type T1 = ExtendsStrict<never, number, {strictNever: true}>;
	//=> false

	type T2 = ExtendsStrict<never, number, {strictNever: false}>;
	//=> true

	type T3 = ExtendsStrict<never, never, {strictNever: true}>;
	//=> true

	type T4 = ExtendsStrict<never, any, {strictNever: true}>;
	//=> true

	type T5 = ExtendsStrict<never, unknown, {strictNever: true}>;
	//=> true
	```

	Note: This option only has an effect when checking assignability from `never` (`ExtendsStrict<never, ...>`), and not when checking assignability to `never` (`ExtendsStrict<..., never>`).
	*/
	strictNever?: boolean;

	/**
	Whether `any` extends every other type.

	When enabled, `any` does not extend every other type, it only extends itself (or `unknown`).

	@default false

	@example
	```
	import type {ExtendsStrict} from 'type-fest';

	type T1 = ExtendsStrict<any, number, {strictAny: true}>;
	//=> false

	type T2 = ExtendsStrict<any, number, {strictAny: false; distributiveUnions: false}>;
	//=> true

	type T3 = ExtendsStrict<any, any, {strictAny: true}>;
	//=> true

	type T4 = ExtendsStrict<any, unknown, {strictAny: true}>;
	//=> true
	```

	Note: If `strictAny` is `false` and `distributiveUnions` is `true`, then `any` would distribute and the result would be the `boolean` type, except when checking assignability to `any` or `unknown`.

	@example
	```
	import type {ExtendsStrict} from 'type-fest';

	type T1 = ExtendsStrict<any, number, {strictAny: false; distributiveUnions: true}>;
	//=> boolean

	type T2 = ExtendsStrict<any, any, {strictAny: false; distributiveUnions: true}>;
	//=> true

	type T3 = ExtendsStrict<any, unknown, {strictAny: false; distributiveUnions: true}>;
	//=> true
	```

	Note: This option only has an effect when checking assignability from `any` (`ExtendsStrict<any, ...>`), and not when checking assignability to `any` (`ExtendsStrict<..., any>`).
	*/
	strictAny?: boolean;
};

export type _ExtendsStrict<Left, Right, Options extends Required<ExtendsStrictOptions>> =
	And<IsAny<Left>, Options['strictAny']> extends true
		? Or<IsAny<Right>, IsUnknown<Right>>
		: IsNever<Left> extends true
			? Options['strictNever'] extends true
				? OrAll<[IsNever<Right>, IsAny<Right>, IsUnknown<Right>]>
				: true
			: Options['distributiveUnions'] extends true
				? Left extends Right
					? true
					: false
				: [Left] extends [Right]
					? true
					: false;

export type DefaultExtendsStrictOptions = {
	distributiveUnions: false;
	strictNever: true;
	strictAny: false;
};

export type ExtendsStrict<Left, Right, Options extends ExtendsStrictOptions = {}> =
	_ExtendsStrict<Left, Right, ApplyDefaultOptions<ExtendsStrictOptions, DefaultExtendsStrictOptions, Options>>;
