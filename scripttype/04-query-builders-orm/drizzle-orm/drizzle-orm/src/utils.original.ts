/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/utils.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyColumn<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Omit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Partial<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Pick<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Required<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type OneOrMany<T> = T | T[];

export type Update<T, TUpdate> =
	& {
		[K in Exclude<keyof T, keyof TUpdate>]: T[K];
	}
	& TUpdate;

export type Simplify<T> =
	& {
		// @ts-ignore - "Type parameter 'K' has a circular constraint", not sure why
		[K in keyof T]: T[K];
	}
	& {};

export type Not<T extends boolean> = T extends true ? false : true;

export type IsNever<T> = [T] extends [never] ? true : false;

export type IsUnion<T, U extends T = T> = (T extends any ? (U extends T ? false : true) : never) extends false ? false
	: true;

export interface DrizzleTypeError<T extends string> {
	$drizzleTypeError: T;
}

export type SingleKeyObject<T, TError extends string, K = keyof T> = IsNever<K> extends true ? never
	: IsUnion<K> extends true ? DrizzleTypeError<TError>
	: T;

export type FromSingleKeyObject<T, Result, TError extends string, K = keyof T> = IsNever<K> extends true ? never
	: IsUnion<K> extends true ? DrizzleTypeError<TError>
	: Result;

export type SimplifyMappedType<T> = [T] extends [unknown] ? T : never;

export type ShallowRecord<K extends keyof any, T> = SimplifyMappedType<{ [P in K]: T }>;

export type Assume<T, U> = T extends U ? T : U;

export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false;

export type ValueOrArray<T> = T | T[];

export type Or<T1, T2> = T1 extends true ? true : T2 extends true ? true : false;

export type IfThenElse<If, Then, Else> = If extends true ? Then : Else;

export type PromiseOf<T> = T extends Promise<infer U> ? U : T;

export type Writable<T> = {
	-readonly [P in keyof T]: T[P];
};

export type NonArray<T> = T extends any[] ? never : T;

export type ColumnsWithTable<
	TTableName extends string,
	TForeignTableName extends string,
	TColumns extends AnyColumn<{ tableName: TTableName }>[],
> = { [Key in keyof TColumns]: AnyColumn<{ tableName: TForeignTableName }> };

export type ValidateShape<T, ValidShape, TResult = T> = T extends ValidShape
	? Exclude<keyof T, keyof ValidShape> extends never ? TResult
	: DrizzleTypeError<
		`Invalid key(s): ${Exclude<(keyof T) & (string | number | bigint | boolean | null | undefined), keyof ValidShape>}`
	>
	: never;

export type KnownKeysOnly<T, U> = {
	[K in keyof T]: K extends keyof U ? T[K] : never;
};

export type IsAny<T> = 0 extends (1 & T) ? true : false;

export type IfNotImported<T, Y, N> = unknown extends T ? Y : N;

export type ImportTypeError<TPackageName extends string> =
	`Please install \`${TPackageName}\` to allow Drizzle ORM to connect to the database`;

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Keys extends any
	? Required<Pick<T, Keys>> & Partial<Omit<T, Keys>>
	: never;
