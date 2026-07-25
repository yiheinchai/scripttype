/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/optional-keys-of.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type IsOptionalKeyOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type OptionalKeysOf<Type extends object> =
	Type extends unknown // For distributing `Type`
		? (keyof {[Key in keyof Type as
			IsOptionalKeyOf<Type, Key> extends false
				? never
				: Key
			]: never
		}) & keyof Type // Intersect with `keyof Type` to ensure result of `OptionalKeysOf<Type>` is always assignable to `keyof Type`
		: never;
