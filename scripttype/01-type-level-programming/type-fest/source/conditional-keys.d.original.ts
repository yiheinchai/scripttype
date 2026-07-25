/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/conditional-keys.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ExtendsStrict<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IfNotAnyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TupleToObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _ConditionalKeys<Base, Condition> = keyof {
	[
	Key in (keyof Base & {}) as // `& {}` prevents homomorphism
	ExtendsStrict<Base[Key], Condition> extends true ? Key : never
	]: never
};

export type ConditionalKeys<Base, Condition> = (Base extends UnknownArray ? TupleToObject<Base> : Base) extends infer _Base // Remove non-numeric keys from arrays
	? IfNotAnyOrNever<_Base, {ifNot: _ConditionalKeys<_Base, Condition>; ifAny: keyof _Base}>
	: never;
