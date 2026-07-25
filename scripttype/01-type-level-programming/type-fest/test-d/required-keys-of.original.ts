/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/test-d/required-keys-of.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type PropertyKey<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RequiredKeysOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnknownRecord<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type Assignability1<T, _K extends keyof T> = unknown;

export type Test1<T extends object> = Assignability1<T, RequiredKeysOf<T>>;

export type Assignability2<T extends object, _K extends RequiredKeysOf<T>> = unknown;

export type Test2<T extends object> = Assignability2<T, keyof T>;

export type Assignability3<_T, _K extends PropertyKey> = unknown;

export type Test3<T extends object> = Assignability3<T, RequiredKeysOf<T>>;

export type Assignability4<T extends object, _K extends RequiredKeysOf<T>> = unknown;

export type Test4<T extends object> = Assignability4<T, PropertyKey>;

export type Assignability5<T extends Record<string, unknown>, _K extends keyof T> = unknown;

export type Test5<T extends Record<string, unknown>> = Assignability5<T, RequiredKeysOf<T>>;

export type Assignability6<T extends object, _K extends keyof T> = unknown;

export type Test6<T extends object> = Assignability6<T, RequiredKeysOf<T>>;

export type Assignability7<T extends UnknownRecord, _K extends keyof T> = unknown;

export type Test7<T extends UnknownRecord> = Assignability7<T, RequiredKeysOf<T>>;

export type Assignability8<T extends Record<string, unknown>, _K extends RequiredKeysOf<T>> = unknown;

export type Test8<T extends Record<string, unknown>> = Assignability8<T, keyof T>;

export type Assignability9<T extends object, _K extends RequiredKeysOf<T>> = unknown;

export type Test9<T extends object> = Assignability9<T, keyof T>;

export type Assignability10<T extends UnknownRecord, _K extends RequiredKeysOf<T>> = unknown;

export type Test10<T extends UnknownRecord> = Assignability10<T, keyof T>;
