/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/exclude-exactly.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type If<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IfNotAnyOrNever<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsAny<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsEqual<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsNever<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type _ExcludeExactly<Union, Delete> =
	IfNotAnyOrNever<Delete, {
		ifNot: Union extends unknown // For distributing `Union`
			? [Delete extends unknown // For distributing `Delete`
				? If<IsEqual<Union, Delete>, true, never>
				: never] extends [never] ? Union : never
			: never;
		// If `Delete` is `any` or `never`, then return `Union`,
		// because `Union` cannot be `any` or `never` here.
		ifAny: Union;
		ifNever: Union;
	}>;

export type ExcludeExactly<Union, Delete> =
	IfNotAnyOrNever<Union, {
		ifNot: _ExcludeExactly<Union, Delete>;
		// If `Union` is `any`, then if `Delete` is `any`, return `never`, else return `Union`.
		ifAny: If<IsAny<Delete>, never, Union>;
		// If `Union` is `never`, then if `Delete` is `never`, return `never`, else return `Union`.
		ifNever: If<IsNever<Delete>, never, Union>;
	}>;
