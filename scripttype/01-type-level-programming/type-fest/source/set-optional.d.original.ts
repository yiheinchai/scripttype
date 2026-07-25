/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/set-optional.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Except<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HomomorphicPick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Parameters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Simplify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _SetOptional<BaseType, Keys extends keyof BaseType> =
	BaseType extends unknown // To distribute `BaseType` when it's a union type.
		? Simplify<
			// Pick just the keys that are readonly from the base type.
			Except<BaseType, Keys>
			// Pick the keys that should be mutable from the base type and make them mutable.
			& Partial<HomomorphicPick<BaseType, Keys>>
		>
		: never;

export type SetOptional<BaseType, Keys extends keyof BaseType> =
	(BaseType extends (...arguments_: never) => any
		? (...arguments_: Parameters<BaseType>) => ReturnType<BaseType>
		: unknown)
	& _SetOptional<BaseType, Keys>;
