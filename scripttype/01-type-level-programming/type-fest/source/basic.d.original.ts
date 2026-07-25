/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/basic.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Class<T, Arguments extends unknown[] = any[]> = {
	prototype: Pick<T, keyof T>;
	new(...arguments_: Arguments): T;
};

export type Constructor<T, Arguments extends unknown[] = any[]> = new(...arguments_: Arguments) => T;

export type AbstractConstructor<T, Arguments extends unknown[] = any[]> = abstract new(...arguments_: Arguments) => T;
