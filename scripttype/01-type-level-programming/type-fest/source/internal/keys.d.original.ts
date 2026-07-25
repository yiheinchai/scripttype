/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/internal/keys.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsAny<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsLiteral<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsUnknown<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Partial<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PropertyKey<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ToString<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type BaseKeyFilter<Type, Key extends keyof Type> = Key extends symbol
	? never
	: Type[Key] extends symbol
		? never
		/*
		To prevent a problem where an object with only a `name` property is incorrectly treated as assignable to a function, we first check if the property is a record.
		This check is necessary, because without it, if we don't verify whether the property is a record, an object with a type of `{name: any}` would return `never` due to its potential assignability to a function.
		See: https://github.com/sindresorhus/type-fest/issues/657
		*/
		: Type[Key] extends Record<string, unknown>
			? Key
			: [(...arguments_: any[]) => any] extends [Type[Key]]
				? never
				: Key;

export type FilterDefinedKeys<T extends object> = Exclude<
	{
		[Key in keyof T]: IsAny<T[Key]> extends true
			? Key
			: IsUnknown<T[Key]> extends true ? Key : undefined extends T[Key]
				? never
				: T[Key] extends undefined
					? never
					: BaseKeyFilter<T, Key>;
	}[keyof T],
	undefined
>;

export type FilterOptionalKeys<T extends object> = Exclude<
	{
		[Key in keyof T]: IsAny<T[Key]> extends true
			? never
			: undefined extends T[Key]
				? T[Key] extends undefined
					? never
					: BaseKeyFilter<T, Key>
				: never;
	}[keyof T],
	undefined
>;

export type RequireNone<KeysType extends PropertyKey> = Partial<Record<KeysType, never>>;

export type LiteralKeyOf<T> = keyof {[K in keyof T as IsLiteral<K> extends true ? K : never]-?: never};

export type ExactKey<T extends object, Key extends PropertyKey> =
	Key extends keyof T
		? Key
		: ToString<Key> extends keyof T
			? ToString<Key>
			: Key extends `${infer NumberKey extends number}`
				? NumberKey extends keyof T
					? NumberKey
					: never
				: never;
