/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/readonly-keys-of.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type IsReadonlyKeyOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type ReadonlyKeysOf<Type extends object> =
	Type extends unknown // For distributing `Type`
		? (keyof {[Key in keyof Type as
			IsReadonlyKeyOf<Type, Key> extends false
				? never
				: Key
			]: never
		}) & keyof Type // Intersect with `keyof Type` to ensure result of `ReadonlyKeysOf<Type>` is always assignable to `keyof Type`
		: never;
