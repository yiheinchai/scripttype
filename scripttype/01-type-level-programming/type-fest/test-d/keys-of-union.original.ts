/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/test-d/keys-of-union.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type KeysOfUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Assignability1<T, _K extends keyof T> = unknown;

export type Test1<T> = Assignability1<T, KeysOfUnion<T>>;

export type Assignability2<T, _K extends KeysOfUnion<T>> = unknown;

export type Test2<T> = Assignability2<T, keyof T>;

export type Assignability3<_T, _K extends PropertyKey> = unknown;

export type Test3<T> = Assignability3<T, KeysOfUnion<T>>;

export type Assignability4<T, _K extends KeysOfUnion<T>> = unknown;

export type Test4<T> = Assignability4<T, PropertyKey>;

export type Assignability5<T extends Record<string, unknown>, _K extends KeysOfUnion<T>> = unknown;

export type Test5<T extends Record<string, unknown>> = Assignability5<T, keyof T>;

export type Assignability6<T extends object, _K extends KeysOfUnion<T>> = unknown;

export type Test6<T extends object> = Assignability6<T, keyof T>;

export type Assignability7<T extends UnknownRecord, _K extends KeysOfUnion<T>> = unknown;

export type Test7<T extends UnknownRecord> = Assignability7<T, keyof T>;

export type Assignability8<T extends Record<string, unknown>, _K extends keyof T> = unknown;

export type Test8<T extends Record<string, unknown>> = Assignability8<T, KeysOfUnion<T>>;

export type Assignability9<T extends object, _K extends keyof T> = unknown;

export type Test9<T extends object> = Assignability9<T, KeysOfUnion<T>>;
