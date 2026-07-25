/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/internal/enforce-optional.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Simplify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type RequiredFilter<Type, Key extends keyof Type> = undefined extends Type[Key]
	? Type[Key] extends undefined
		? Key
		: never
	: Key;

export type OptionalFilter<Type, Key extends keyof Type> = undefined extends Type[Key]
	? Type[Key] extends undefined
		? never
		: Key
	: never;

export type EnforceOptional<ObjectType> = Simplify<{
	[Key in keyof ObjectType as RequiredFilter<ObjectType, Key>]: ObjectType[Key]
} & {
	[Key in keyof ObjectType as OptionalFilter<ObjectType, Key>]?: Exclude<ObjectType[Key], undefined>
}>;
