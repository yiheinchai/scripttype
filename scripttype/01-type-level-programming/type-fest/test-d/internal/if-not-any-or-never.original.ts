/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/test-d/internal/if-not-any-or-never.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type IfNotAnyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type CrashIfAny<T, Acc extends unknown[] = []> = 0 extends 1 & T // Check if `T` is `any`
	? CrashIfAny<T, [...Acc, unknown]>
	: never;

export type CrashIfAnyWrapper<T> = IfNotAnyOrNever<T, {ifNot: CrashIfAny<T>}>;

export type CrashIfNever<T, Acc extends unknown[] = []> = [T] extends [never] // Check if `T` is `never`
	? CrashIfNever<T, [...Acc, unknown]>
	: never;

export type CrashIfNeverWrapper<T> = IfNotAnyOrNever<T, {ifNot: CrashIfNever<T>}>;

export type CrashIfNotAny<T, Acc extends unknown[] = []> = 0 extends 1 & T // Check if `T` is `any`
	? never
	: CrashIfNotAny<T, [...Acc, unknown]>;

export type CrashIfNotAnyWrapper<T> = IfNotAnyOrNever<T, {ifNot: never; ifAny: CrashIfNotAny<T>}>;

export type CrashIfNotNever<T, Acc extends unknown[] = []> = [T] extends [never] // Check if `T` is `never`
	? never
	: CrashIfNotNever<T, [...Acc, unknown]>;

export type CrashIfNotNeverWrapper<T> = IfNotAnyOrNever<T, {ifNot: never; ifNever: CrashIfNotNever<T>}>;
