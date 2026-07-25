/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/extract-exactly.d.ts, for comparison with the ScriptType alongside.
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
export type _ExtractExactly<Union, Match> =
	IfNotAnyOrNever<Match, {
		ifNot: Union extends unknown // For distributing `Union`
			? [Match extends unknown // For distributing `Match`
				? If<IsEqual<Union, Match>, true, never>
				: never] extends [never] ? never : Union
			: never;
		// If `Match` is `any` or `never`, then return `never`,
		// because `Union` cannot be `any` or `never` here.
		ifAny: never;
		ifNever: never;
	}>;

export type ExtractExactly<Union, Match> =
	IfNotAnyOrNever<Union, {
		ifNot: _ExtractExactly<Union, Match>;
		// If `Union` is `any`, then if `Match` is `any`, return `any`, else return `never`.
		ifAny: If<IsAny<Match>, Union, never>;
		// If `Union` is `never`, return `never`, doesn't matter what `Match` is.
		ifNever: never;
	}>;
