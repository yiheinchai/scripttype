/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/readonly-keys-of.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type IsReadonlyKeyOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ReadonlyKeysOf<Type extends object> =
	Type extends unknown // For distributing `Type`
		? (keyof {[Key in keyof Type as
			IsReadonlyKeyOf<Type, Key> extends false
				? never
				: Key
			]: never
		}) & keyof Type // Intersect with `keyof Type` to ensure result of `ReadonlyKeysOf<Type>` is always assignable to `keyof Type`
		: never;
