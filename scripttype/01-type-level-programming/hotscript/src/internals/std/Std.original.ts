/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/std/Std.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Capitalize<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Lowercase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Readonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Uncapitalize<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Uppercase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _Pick<a, k extends keyof a> = Pick<a, k>;

export type _Omit<a, k extends PropertyKey> = Omit<a, k>;

export type _Extract<a, b> = Extract<a, b>;

export type _Exclude<a, b> = Exclude<a, b>;

export type _Uppercase<a extends string> = Uppercase<a>;

export type _Lowercase<a extends string> = Lowercase<a>;

export type _Capitalize<a extends string> = Capitalize<a>;

export type _Uncapitalize<a extends string> = Uncapitalize<a>;

export type _Record<k extends PropertyKey, v> = Record<k, v>;

export type _Readonly<a> = Readonly<a>;

export type _Required<a> = Required<a>;

export type _Partial<a> = Partial<a>;

export type _NonNullable<a> = NonNullable<a>;
