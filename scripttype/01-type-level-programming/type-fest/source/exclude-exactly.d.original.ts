/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/exclude-exactly.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type If<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IfNotAnyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsEqual<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
