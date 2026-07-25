/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/join.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type JoinableItem = string | number | bigint | boolean | undefined | null;

export type NullishCoalesce<
	Value extends JoinableItem,
	Fallback extends string,
> = Value extends undefined | null ? NonNullable<Value> | Fallback : Value;

export type Join<
	Items extends readonly JoinableItem[],
	Delimiter extends string,
> = Items extends readonly []
	? ''
	: Items extends readonly [JoinableItem?]
		? `${NullishCoalesce<Items[0], ''>}`
		: Items extends readonly [
			infer First extends JoinableItem,
			...infer Tail extends readonly JoinableItem[],
		]
			? `${NullishCoalesce<First, ''>}${Delimiter}${Join<Tail, Delimiter>}`
			: Items extends readonly [
				...infer Head extends readonly JoinableItem[],
				infer Last extends JoinableItem,
			]
				? `${Join<Head, Delimiter>}${Delimiter}${NullishCoalesce<Last, ''>}`
				: string;
